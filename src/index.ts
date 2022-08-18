import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import ejs from 'ejs';
import path from 'path';
import conf from './settings/app.settings';
import session from 'express-session';

dotenv.config({path: path.join(conf.BASE_DIR, '.env')});

import sectionRouter from './controllers/section.controller';
import offerRouter from './controllers/offer.controller';
import socialRouter from './controllers/social.controller';
import authRouter from './controllers/auth.controller';
import {bounceUnathenticated, protectPOST} from './middlewares/auth.middleware';

const app = express();

const DEV_MODE = process.env.DEVELOPMENT_MODE;

if (DEV_MODE) {
  const whitelist: string[] = process.env.BASE_URLs
    ? process.env.BASE_URLs.split(',')
    : [];

  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions)); // This enables CORS on API
}

app.use(
  session({
    store: new (require('connect-pg-simple')(session))({
      conObject: {
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DEVELOPMENT_MODE
          ? false
          : {
              rejectUnauthorized: false,
            },
      },
      createTableIfMissing: true,
    }),
    secret: [process.env.COOKIE_SECRET as string],
    saveUninitialized: false,
    resave: false,
    cookie: {
      // secure: false,
      // httpOnly: false,
      // sameSite: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.set('view engine', ejs);
app.use(express.static(path.join(conf.BASE_DIR, 'client', 'build')));
// app.use(express.static(path.join(conf.BASE_DIR, 'static')));
app.use(bodyParser.json());
app.use(fileUpload()); // This enables file-uploads through forms
app.use(express.urlencoded({extended: false}));

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join('client', 'build', 'index.html'));
});

app.use(conf.SECTIONS_BASE_ENDPOINT, protectPOST, sectionRouter); // For performing CRUD operations on sections

app.use(conf.OFFERS_BASE_ENDPOINT, protectPOST, offerRouter); // For performing CRUD operations on offers

app.use(conf.SECTIONS_BASE_ENDPOINT, socialRouter); // For linking up social links

app.use(conf.API_BASE_ENDPOINT, bounceUnathenticated, authRouter); // For performing authentication

app.listen(process.env.PORT || 12080, () => {
  console.log(`App started on port ${process.env.port || 12080}`);
});

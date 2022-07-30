import express, {Request, Response} from 'express';
import {IAuthDetails} from '../helpers/general.interface';
import User from '../models/auth.model';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  let error = '';
  try {
    const authDetails = req.body as IAuthDetails;
    if (!authDetails.email) {
      throw Error('Email field cannot be left empty');
    }
    if (!authDetails.password) {
      throw Error('Password field cannot be left empty');
    }
    const verified = await User.verify(authDetails.email, authDetails.password);
    if (!verified) {
      throw Error('Invalid login details.');
    }
    req.session.authenticated = true;
    res.sendStatus(200);
  } catch (err: any) {
    error = err.message;
    res.status(406).send(error);
  }
});

router.get('/signup', (req: Request, res: Response) => {
  return res.render('auth/signup.ejs');
});

router.post('/signup', async (req: Request, res: Response) => {
  const email: string = req.body['email'];
  const password: string = req.body['password'];
  const user = await User.create(email, password);
  if (user) {
    console.log(user);
  }
  return res.render('auth/signup.ejs');
});

router.get('/state', (req: Request, res: Response) => {
  try {
    if (!req.session.authenticated) {
      throw new Error('Session not found');
    }
    res.sendStatus(200);
  } catch {
    res.sendStatus(403);
  }
});

router.post('/logout', async (req: Request, res: Response) => {
  try {
    req.session.destroy(() => res.sendStatus(200));
  } catch (e: any) {
    console.error(e.stack);
    res.sendStatus(500);
  }
});

export default router;

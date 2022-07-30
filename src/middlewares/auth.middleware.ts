import {NextFunction, Request, Response} from 'express';
import conf from '../settings/app.settings';

export const bounceUnathenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Bounce all request for unauthorized sessions, excluding endpoints in whitelist
   */
  let targetURL = req.originalUrl.split('?')[0]; // The first value is the main part of the url i.e without get parameters
  targetURL = targetURL.replace(conf.API_BASE_ENDPOINT, ''); // Strip off API_BASE_ENDPOINT, we only need the specific endpoint
  const whitelist = ['/login', '/state']; // Endpoints that do not need authentication
  if (whitelist.indexOf(targetURL) !== -1 || req.session.authenticated) {
    return next();
  }
  res.status(401).send('Access denied');
  return res.end();
};

export const protectPOST = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Bounce all POST request for unauthorized sessions, excluding endpoints in whitelist.
   * Check bounceUnauthenticated() for endpoints in whitelist
   */

  if (req.method !== 'GET') {
    bounceUnathenticated(req, res, next);
  } else {
    next();
  }
};

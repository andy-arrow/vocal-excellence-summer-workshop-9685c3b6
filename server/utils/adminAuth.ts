import basicAuth from 'express-basic-auth';
import type { Request, Response, NextFunction } from 'express';

// Fail-closed: evaluate ADMIN_PASSWORD at request time so a missing env var
// always rejects rather than accepting any empty-string password.
export const adminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    res.status(503).send('Admin authentication not configured. Set the ADMIN_PASSWORD environment variable.');
    return;
  }

  basicAuth({
    users: { admin: adminPassword },
    challenge: true,
    realm: 'Vocal Excellence Admin',
    unauthorizedResponse: (_r: Request) => 'Access denied. Please provide valid admin credentials.',
  })(req, res, next);
};

export default adminAuth;

import basicAuth from 'express-basic-auth';
import { Request } from 'express';

const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminPassword) {
  console.warn('Warning: ADMIN_PASSWORD environment variable is not set. Admin routes will be inaccessible.');
}

export const adminAuth = basicAuth({
  users: { 'admin': adminPassword || '' },
  challenge: true,
  realm: 'Vocal Excellence Admin',
  unauthorizedResponse: (_req: Request) => {
    return 'Access denied. Please provide valid admin credentials.';
  }
});

export default adminAuth;

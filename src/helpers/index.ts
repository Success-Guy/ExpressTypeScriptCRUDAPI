import crypto from 'crypto';

const SECRET = "asciufebsdvkvnsheig";

export const random = ()=> crypto.randomBytes(128).toString('base64');
export const passwordHash = (salt: string, password: string) => {
  return crypto.createHmac('sha256', [salt, password].join("/")).update(SECRET).digest('hex');
}

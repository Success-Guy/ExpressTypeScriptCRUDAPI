import express from 'express';
import { login, register } from "../controllers/authentication";
import { logAccess } from '../middlewares';
import { readFile } from 'fs/promises';

export default (router: express.Router) => {
  router.post("/auth/register", logAccess, register);
  router.post("/auth/login", logAccess, login);
  router.get('/login', async (req: express.Request, res: express.Response) => {
    try {
      // const filePath = new URL('./package.json', import.meta.url);
      const contents = await readFile('./form.html', { encoding: 'utf8' });
      return res.status(200).send(contents).end();
    } catch (err) {
      console.error(err);
    }
    return res.status(200).send("Hello world!").end();
  })
}
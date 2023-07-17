import express from 'express';
import authentication from './authenticationRouter';
import users from './usersRouter';

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);

  router.get('/', async (req: express.Request, res: express.Response) => {
    res.status(200).send("You're welcome!").end();
  })

  return router
};
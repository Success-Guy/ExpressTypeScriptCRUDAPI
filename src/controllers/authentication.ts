import express from 'express';
import { random, passwordHash } from '../helpers';
import { createUser, getUserByEmail } from '../db/users';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.query);
    

    if (!email || !password) {
      return res.status(400).json("Missing values").end();
    }
    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      return res.status(400).json("Email or password does not exist").end();
    }

    const expectedHash = (user.authentication!.salt != undefined) && passwordHash(user.authentication!.salt, password);

    if (user.authentication?.password != expectedHash) {
      return res.status(401).json("Email and password does not match").end();
    }
    const salt = random();
    user.authentication!.sessionToken = passwordHash(salt, user._id.toString());

    await user.save();
    res.cookie('NODE-BACKEND', user.authentication?.sessionToken, { domain: "localhost", path: "/" })
    return res.status(200).json(user).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400)

  }
}
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json("Missing values").end();
    }
    const existUser = await getUserByEmail(email);
    if (existUser) {
      return res.status(400).json("Email already exist").end();
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: passwordHash(salt, password)
      }
    })
    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error)
    return res.sendStatus(400)

  }
}
import { getUserBySessionToken } from "../db/users";
import express from "express";
import { get, merge } from 'lodash'
import { writeFile } from 'fs/promises';

export const logAccess = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.originalUrl);
  // write
  writeFile('./file.txt', new Date().toUTCString() + " " + req.originalUrl + " " + JSON.stringify(req.body) + "\n", {
    encoding: "utf8",
    flag: "a"
  },);
  next();
}
export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id');// as string;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId != id) {
      return res.status(403).send("Not allowed: you're not the owner");
    }
    next()
  } catch (error) {
    console.log(error);
    res.sendStatus(400);

  }
}
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['NODE-BACKEND'];
    if (!sessionToken) {
      return res.status(403).json("login please!");
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403)
    }
    merge(req, { identity: existingUser });
    next();
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}
import express from 'express';
import { deleteUserById, getUserById, getUsers, updateUserById } from '../db/users';

export const getAllUser = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers()
    return res.status(200).json(users).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400)
  }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id)
    return res.status(200).json(deletedUser).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400)
  }
}

export const updateUsername = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
     return res.status(400).send("Missing value");
    }
    const user = await getUserById(id);
    user!.username = username;
    await user!.save()
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400)

  }
}
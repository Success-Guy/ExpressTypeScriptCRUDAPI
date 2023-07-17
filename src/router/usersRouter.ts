import { isAuthenticated, isOwner, logAccess } from '../middlewares';
import { deleteUser, getAllUser, updateUsername } from '../controllers/users';
import expres from 'express';

export default (router: expres.Router) => {
  router.get('/users', isAuthenticated, getAllUser);
  router.delete('/users/:id', logAccess, isAuthenticated, isOwner, deleteUser);
  router.patch('/users/:id', logAccess, isAuthenticated, isOwner, updateUsername);
}
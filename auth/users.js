import bcrypt from 'bcrypt-nodejs';
import { ObjectID } from 'mongodb';

const Users = (db) => {
  function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  function validPassword(password, user) {
    return bcrypt.compareSync(password, user.password);
  }
  async function findUser(userName) {
    const user = await db.collection('users').findOne({ username: userName });
    return user;
  }
  async function findById(id) {
    const user = await db.collection('users').findOne({ _id: ObjectID(id) });
    return user;
  }
  async function registerUser(userName, password) {
    const result = await db.collection('users').insertOne({ username: userName, password: generateHash(password) });
    return result.ops[0];
  }

  return { validPassword, findUser, registerUser, findById };
};

export default Users;

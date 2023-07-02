import mongoose from 'mongoose';

import User from '../../models/User.js';
import userSeeds from './users.json' assert { type: "json" };

const seedProjects = async () =>
{
  await User.deleteMany({});
  await User.insertMany(userSeeds);
};

mongoose.connect('mongodb+srv://marcola88:egdb1122@urotasks.wwkpbcj.mongodb.net/');
seedProjects().then(() => {mongoose.connection.close();});
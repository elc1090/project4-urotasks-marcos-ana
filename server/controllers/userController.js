import User from '../models/User.js'
const userController = {};

/*****************************************************************************************************************/
userController.login = async (userEmail, userPassword) => 
{
  const user = await User.findOne({ email: userEmail });

  if (user.password !== userPassword)
    return null;

  return user;
}

/*****************************************************************************************************************/
userController.create = async (userData) => 
{
  const user = new User(userData);
  user.save();

  console.log(`${new Date()}: successfully created user ${user.name}`);
}

/*****************************************************************************************************************/
userController.updateActiveProject = async (userID, projectID) => 
{
  await User.updateOne({ id: userID }, { activeProject: projectID }); 
  console.log(`${new Date()}: successfully updated user's active project to |${projectID}|`);
}

/*****************************************************************************************************************/
userController.updateProjectList = async (userID, projectID, method) => 
{
  const updatedUser = {};

  if (method === 'add') 
  {
    updatedUser.$push = { projects: projectID };
    updatedUser.$set = { activeProject: projectID };
    console.log(`${new Date()}: Successfully added project to list`);
  } 

  else if (method === 'delete') 
  {
    updatedUser.$pull = { projects: projectID };
    updatedUser.$set = { activeProject: '0' };
    console.log(`${new Date()}: Successfully removed project from list`);
  } 
  
  else 
    throw new Error('Invalid method');

  await User.updateOne({ id: userID }, updatedUser);
};

export default userController;
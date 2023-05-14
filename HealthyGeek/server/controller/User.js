// Create a new user
const {User}= require('../db');
const CreateUser = async (req, res) => {
    try {
    //   const existingUser = await User.findOne({ name: req.body.name, email: req.body.email });
    //   if (existingUser) {
    //     // User with the same name and email already exists
    //     return res.status(200).json({ message: 'User already exists' ,existingUser});
    //   }
  
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get all users
  const GetALlUsers=async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get a specific user
  const GetUser= async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a user
  const UpdateUser= async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a user
  const DeleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports={CreateUser,GetALlUsers,GetUser,DeleteUser,UpdateUser}
  
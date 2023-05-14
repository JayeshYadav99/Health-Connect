const { Router } = require('express');
const express = require('express');

const {CreateUser,GetALlUsers,GetUser,DeleteUser,UpdateUser}= require('../controller/User');
const Userrouter = express.Router();

Userrouter.get('/',GetALlUsers);
Userrouter.get('/:id',GetUser);
Userrouter.post('/',CreateUser);
Userrouter.put('/:id',UpdateUser);
Userrouter.delete('/:id',DeleteUser);


module.exports={Userrouter}
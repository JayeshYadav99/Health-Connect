import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

const UserComponent = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [users, setUsers] = useState([]);
  const { globalVariable, updateGlobalVariable } = useContext(GlobalContext);
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
        const { name, email } = user;
        const userId = generateRandomUserId(); // Replace this with your logic to generate a random userId
        const globalVariable = { name, email, userId };
    
        updateGlobalVariable(globalVariable);
    
        // Save the globalVariable in the database using a POST request
        axios.post('http://localhost:3000/users', globalVariable)
          .then(response => {
            console.log('Global variable saved:', response.data);
          })
          .catch(error => {
            console.error('Error saving global variable:', error);
          });
    }
  }, [isAuthenticated]);
  function generateRandomUserId() {
    const uniqueId = Math.random().toString(36).substring(2, 15); // Generate a random alphanumeric string
    const timestamp = Date.now(); // Get the current timestamp
    return `${uniqueId}_${timestamp}_4`; // Combine the uniqueId and timestamp
  }

  const fetchUsers = async() => {
    try {
      const {name,email,userId}=globalVariable;
      console.log(name,email,userId);
        const response =  await axios.post('http://localhost:3000/users',{
            name,email,userId  
        } );
        // if(response.data.message)
        // {
        //     console.log("hioi");
        //     updateGlobalVariable(response.data.existingUser);
              
         
        //     setUsers([...users, response.existingUser]);
        // }
        // else
        // {
        //     console.log("hiofffi");
        //     updateGlobalVariable(response.data);
        //     console.log(globalVariable._id);
        //     console.log(globalVariable);  
        //     setUsers([...users, response.data]);
        // }

        // console.log(globalVariable);
        // console.log(globalVariable._id);
      } catch (error) {
        console.error('Error creating user:', error);
      }
  };

  return (
    <div className="bg-yellow-200 p-4 rounded-lg">
      <ul className="list-none pl-0">
        {isAuthenticated && (
          <li className="mb-4">
            <h1 className="text-2xl font-bold text-blue-800">{user.name}</h1>
            <br />
            <div className="flex justify-center">
              <img className="w-20 h-20 rounded-full mb-2" src={user.picture} alt={user.name} />
            </div>
            <br />
            <h1 className="text-lg text-gray-800">Email: {user.email}</h1>
            <br />
            <h1 className="text-lg text-gray-800">Nickname: {user.nickname}</h1>
            <br />
            <p className="text-gray-800">You can:</p>
            <div className="flex justify-center mt-4 space-x-4">
              <Link
                to="/upload-report"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Upload Report
              </Link>
              <Link
                to="/Health"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Fill Manually
              </Link>
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserComponent;

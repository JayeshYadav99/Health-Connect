import { useState, useContext, useEffect } from 'react';
import { FaEdit, FaUser, FaClock, FaThermometerHalf, FaHeartbeat, FaNotesMedical, FaDumbbell, FaUtensils } from 'react-icons/fa';
import { GlobalContext } from './GlobalContext';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';



const HealthDashboard = ({ healthData, onEdit }) => {
  // const { vitalSigns, medicalHistory, lifestyleFactors } = healthData[0];
  let health;
  const [isEditing, setIsEditing] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [data, setData] = useState([]);
  const { globalVariable, updateGlobalVariable } = useContext(GlobalContext);
  const { userId } = globalVariable;
  const [isDis, setIsDis] = useState(false);
  const ErrorFallback = ({ error }) => {
    return (
      <div>
        <h2>Something went wrong:</h2>
        <p>{error.message}</p>
      </div>
    );
  };
  const handleEditClick = () => {
    setIsEditing(true);
    onEdit();
  };

  useEffect(() => {
    getHealthData();
  }, []);

  const getHealthData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/health/${userId}`);
      if (response) {
        console.log(response.data[0]);
        health = response.data[0];
        setData(response.data[0]);
        setIsDis(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    <ErrorBoundary FallbackComponent={ErrorFallback}>
    {isDis && (
<div className="bg-white rounded-lg shadow-lg p-6">
<h2 className="text-2xl font-bold mb-4">Health Data</h2>

<div className="grid grid-cols-2 gap-4 mb-4">
<div className="flex items-center">
 <FaThermometerHalf className="mr-2 text-blue-500" />
 <span className="text-red-300">Temperature:</span>
 <span className="ml-2 text-blue-300">{healthData[0].vitalSigns.temperature}</span>
</div>

<div className="flex items-center">
 <FaHeartbeat className="mr-2 text-red-500" />
 <span className="text-red-300">Blood Pressure:</span>
 <span className="ml-2 text-blue-200">
   {healthData[0].vitalSigns.bloodPressure.systolic}/{healthData[0].vitalSigns.bloodPressure.diastolic}
 </span>
</div>

<div className="flex items-center">
 <FaHeartbeat className="mr-2 text-red-500" />
< span> <FaHeartbeat className="text-red-300"/>Heart Rate:</span>
 <span className="text-blue-200">{healthData[0].vitalSigns.heartrate}</span>
</div>

<div className="flex items-center">
 <FaNotesMedical className="mr-2 text-purple-500" />
 <span className="text-red-300">Medical History:</span>
 <span className="text-blue-200">{healthData[0].medicalHistory}</span>
</div>

<div className="flex items-center">
 <FaDumbbell className="mr-2 text-green-500" />
 <span className="text-red-300">Exercise Frequency:</span>
 <span className="text-blue-200">{healthData[0].lifestyleFactors.exerciseFrequency}</span>
</div>

<div className="flex items-center">
 <FaUtensils className="mr-2 text-yellow-500" />
 <span className="text-red-300">Diet:</span>
 <span className="text-blue-200">{healthData[0].lifestyleFactors.diet}</span>
</div>
</div>

{/* Render other health data properties here */}
</div>
 )}
</ErrorBoundary></>

  );
};

export default HealthDashboard;

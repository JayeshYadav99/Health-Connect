
import { GlobalContext } from './GlobalContext';
import DashBoard from './DashBoard';
import React ,{ useState,useEffect,useContext } from 'react';
import axios from 'axios'
import Navbar from './Navbar';
const HealthDataComponent = () => {
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState({ systolic: '', diastolic: '' });
  const [heartRate, setHeartRate] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [diet, setDiet] = useState('');
  const [healthData, setHealthData] = useState([]);
  const { globalVariable, updateGlobalVariable } = useContext(GlobalContext);
  const { userId } = globalVariable;
  const [isDis, setIsDis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createHealthData = async (e) => {
    e.preventDefault()
    try {
      const newHealthData = {
        userId: globalVariable.userId,
        timestamp: new Date(),
        vitalSigns: {
          temperature: parseFloat(temperature),
          bloodPressure: {
            systolic: parseInt(bloodPressure.systolic),
            diastolic: parseInt(bloodPressure.diastolic),
          },
          heartRate: parseInt(heartRate),
        },
        medicalHistory,
        lifestyleFactors: {
          exerciseFrequency,
          diet,
        },
      };

      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/health', newHealthData);
      setIsLoading(false);

      if (response) {
        setIsDis(true);
        getHealthData();
      }

      // Reset the form fields
      setTemperature('');
      setBloodPressure({ systolic: '', diastolic: '' });
      setHeartRate('');
      setMedicalHistory('');
      setExerciseFrequency('');
      setDiet('');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getHealthData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:3000/health/${userId}`);
      setIsLoading(false);

      if (response) {
        setHealthData(response.data);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHealthData();
  }, []);

  return (
    <>{isDis ? (<>
    <Navbar/>
    <DashBoard
    healthData={healthData}
    /></>
    ):(
        <div>

            <div className="bg-yellow-200 text-purple-800 p-6 rounded-lg shadow-md">
           <h2 className="text-2xl font-bold mb-6">Health Data Form</h2>
           <form>
             <div className="grid grid-cols-2 gap-4 mb-4">
               <div>
                 <label className="block text-gray-700 text-sm font-bold mb-2">Temperature:</label>
                 <input
                   className="appearance-none border rounded-lg w-full py-2 px-3 bg-pink-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="number"
                   value={temperature}
                   onChange={(e) => setTemperature(e.target.value)}
                 />
               </div>
         
               <div>
                 <label className="block text-gray-700 text-sm font-bold mb-2">Blood Pressure (Systolic):</label>
                 <input
                   className="appearance-none border rounded-lg w-full py-2 px-3 bg-pink-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="number"
                   value={bloodPressure.systolic}
                   onChange={(e) => setBloodPressure({ ...bloodPressure, systolic: e.target.value })}
                 />
               </div>
         
               <div>
                 <label className="block text-gray-700 text-sm font-bold mb-2">Blood Pressure (Diastolic):</label>
                 <input
                   className="appearance-none border rounded-lg w-full py-2 px-3 bg-pink-100  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="number"
                   value={bloodPressure.diastolic}
                   onChange={(e) => setBloodPressure({ ...bloodPressure, diastolic: e.target.value })}
                 />
               </div>
         
               <div>
                 <label className="block text-gray-700 text-sm font-bold mb-2">Heart Rate:</label>
                 <input
                   className="appearance-none border rounded-lg w-full py-2 px-3  bg-pink-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="number"
                   value={heartRate}
                   onChange={(e) => setHeartRate(e.target.value)}
                 />
               </div>
         
               <div className="col-span-2">
                 <label className="block text-gray-700 text-sm font-bold mb-2">Medical History:</label>
                 <textarea
                   className="appearance-none border rounded-lg w-full py-2 px-3  bg-pink-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   value={medicalHistory}
                   onChange={(e) => setMedicalHistory(e.target.value)}
                 ></textarea>
               </div>
         
               <div className="col-span-2">
                 <label className="block text-gray-700 text-sm font-bold mb-2">Exercise Frequency:</label>
                 <input
                   className="appearance-none border rounded-lg w-full py-2 px-3 bg-pink-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text"
                   value={exerciseFrequency}
                   onChange={(e) => setExerciseFrequency(e.target.value)}
                 />
               </div>
         
               <div className="col-span-2">
                 <label className="block text-gray-700 text-sm font-bold mb-2">Diet:</label>
                 <input
                   className="appearance-none border rounded-lg w-full py-2 px-3 bg-pink-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   type="text"
                   value={diet}
                   onChange={(e) => setDiet(e.target.value)}
                 />
         </div>
         
         <button
           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           onClick={createHealthData }
         >
           Submit
         </button>
         </div>
         </form>
         </div>
         
         </div>)}</>

   

);
}
     {/* <h3>Health Data Entries</h3>
      <ul>
        {healthData.map((data) => (
          <li key={data._id}>
            <div>
              <strong>User ID:</strong> {data.userId}
            </div>
            <div>
              <strong>Timestamp:</strong> {data.timestamp}
            </div>
            <div>
              <strong>Vital Signs:</strong>
              <ul>
                <li>
                  <strong>Temperature:</strong> {data.vitalSigns.temperature}
                </li>
                <li>
                  <strong>Blood Pressure (Systolic):</strong> {data.vitalSigns.bloodPressure.systolic}
                </li>
                <li>
                  <strong>Blood Pressure (Diastolic):</strong> {data.vitalSigns.bloodPressure.diastolic}
                </li>
                <li>
                  <strong>Heart Rate:</strong> {data.vitalSigns.heartRate}
                </li>
              </ul>
            </div>
            <div>
              <strong>Medical History:</strong> {data.medicalHistory}
            </div>
            <div>
              <strong>Lifestyle Factors:</strong>
              <ul>
                <li>
                  <strong>Exercise Frequency:</strong> {data.lifestyleFactors.exerciseFrequency}
                </li>
                <li>
                  <strong>Diet:</strong> {data.lifestyleFactors.diet}
                </li>
              </ul>
            </div>
          </li>
   
      </ul> */}


export default HealthDataComponent;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserComponent from './User';
import HealthDataComponent from './Health';
import ResearchFindingsComponent from './Research';
import EducationalResourceComponent from './Education';
import Navbar from './Navbar'
import Home from './Home'
import Github from './components/Github'
import { Route, Routes } from "react-router-dom";
import CreateRepositoryForm from './components/CreateRepo';
import Search  from './components/Search';
import Intro from './components/Intro';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Main" element={<>
     <Navbar/>
         <UserComponent /></>} />
         <Route path="/Health" element={ <> <HealthDataComponent /></>} />
         <Route path="/Research" element={<ResearchFindingsComponent />} />
         <Route path="/Education" element={<EducationalResourceComponent />} />
         <Route path="/github" element={<><Search/><Github /><CreateRepositoryForm/><Intro/></>} />

    </Routes>
    </>
  
  
  )
}

export default App

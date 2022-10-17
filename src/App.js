import React from 'react';
import {Navigate, Routes, Route} from "react-router-dom";
import Auth from './components/Auth';
import MainLayout from './components/layout/MainLayout';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Navigate to='sign-in'/>}/>
        <Route path='/sign-in' element={<Auth/>}/>
        <Route path='*' element={<MainLayout/>}/>
      </Routes>
  );
}

export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import CreateAccount from './components/auth/CreateAccount';
import Home from './components/home/Home';
import CreateNote from './components/note/CreateNote';
import EditNote from './components/note/EditNote';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/editNote" element={<EditNote />} />
      </Routes>
    </Router>
  );
};

export default App;

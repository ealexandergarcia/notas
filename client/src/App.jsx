import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import CreateAccount from './components/auth/CreateAccount';
import Home from './components/home/Home';
import CreateNote from './components/note/CreateNote';
import EditNote from './components/note/EditNote';
import ProtectedRoute from './components/ProtectedRoute'; // Importa el componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        
        {/* Rutas protegidas */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/createNote" 
          element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/editNote" 
          element={
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;

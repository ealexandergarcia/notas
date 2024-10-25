// src/components/home/Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center text-white">
      <h1 className="font-poppins font-bold mb-10 text-3xl">Home Page</h1>
      <input
        type="text"
        className="border border-slate-0 rounded-lg px-4 py-2 mb-4 bg-color1 text-black"
        placeholder="Search notes..."
      />
      <div className="w-full flex flex-col items-center">
        {/* Aquí irán las notas, por ahora un ejemplo de nota */}
        <div className="bg-gray-800 p-4 rounded-lg mb-4 w-1/2">
          <h2 className="font-semibold">Nota de Ejemplo</h2>
          <p>Descripción de la nota de ejemplo.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

// src/components/note/CreateNote.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chevron_left from '../../assets/img/chevron_left.png';
import save from '../../assets/img/save.png';
import visibility from '../../assets/img/visibility.png';

const CreateNote = () => {
  const [noteData, setNoteData] = useState({ title: '', description: '' });
  const [isReadOnly, setIsReadOnly] = useState(false); // Estado para bloquear edición
  const navigate = useNavigate(); // Hook para redireccionar

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const toggleReadOnly = () => {
    setIsReadOnly((prev) => !prev); // Alterna entre lectura y edición
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
          'Authorization': `Bearer ${token}`, // Aquí es donde añades el token
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Nota creada:', result);

        // Redirigir a /home después de crear la nota
        navigate('/home');
      } else {
        console.error('Error al crear la nota:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <header className="flex justify-between items-center p-4 pt-12">
        <button
          onClick={() => navigate('/home')} // Botón para volver
          className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
        >
          <img src={chevron_left} className="w-3 h-5" alt="Volver" />
        </button>
        <div className="flex gap-5">
          <button
            onClick={toggleReadOnly} // Alterna entre edición y solo lectura
            className={`w-[50px] h-[50px] flex items-center justify-center rounded-2xl transition-colors duration-200 ${
              isReadOnly ? 'bg-blue-500' : 'bg-[#3B3B3B]'
            } hover:bg-blue-700`}
          >
            <img src={visibility} className="w-5 h-4" alt="Ver" />
          </button>
          <button
            onClick={handleSave} // Ejecuta el guardado
            className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
          >
            <img src={save} className="w-5 h-5" alt="Guardar" />
          </button>
        </div>
      </header>
      <form className="mt-6">
        <textarea
          className="w-full border border-transparent rounded-lg px-4 py-2 bg-transparent text-4xl text-white resize-none overflow-hidden focus:outline-none"
          name="title"
          value={noteData.title}
          onChange={handleInputChange}
          placeholder="Title"
          rows="1"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          readOnly={isReadOnly} // Aplica solo lectura
          required
        />
        <textarea
          className="w-full h-[65vh] overflow-auto border border-transparent rounded-lg px-4 py-2 mb-4 bg-color1 text-2xl text-white bg-transparent focus:outline-none"
          name="description"
          value={noteData.description}
          onChange={handleInputChange}
          placeholder="Type something..."
          readOnly={isReadOnly} // Aplica solo lectura
          required
        />
      </form>
    </div>
  );
};

export default CreateNote;

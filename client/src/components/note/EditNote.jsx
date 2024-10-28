// src/components/note/EditNote.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import chevron_left from '../../assets/img/chevron_left.png';
import save from '../../assets/img/save.png';
import mode from '../../assets/img/mode.png';

const MySwal = withReactContent(Swal);

const EditNote = () => {
  const [noteData, setNoteData] = useState({ title: '', description: '' });
  const [isReadOnly, setIsReadOnly] = useState(true); // Inicialmente solo vista de lectura
  const titleRef = useRef(null); // Referencia para el textarea del título
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const noteId = queryParams.get('id'); // Obtén el ID de la nota de la URL

  useEffect(() => {
    if (noteId) {
      fetchNoteData(noteId);
    }
  }, [noteId]);

  // Cargar datos de la nota
  const fetchNoteData = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:5000/api/notes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials:  'include'

      });
      if (response.ok) {
        const data = await response.json();
        setNoteData({ title: data.note.title, description: data.note.description });
        adjustTitleHeight(data.note.title); // Ajustar la altura del título
      } else {
        console.error('Error al cargar la nota');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Ajustar la altura del textarea del título
  const adjustTitleHeight = (text) => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto'; // Reseteamos la altura
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`; // Ajustamos a la altura correcta
    }
  };

  // Guardar cambios en la nota
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:5000/api/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials:  'include',
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        await MySwal.fire('¡Guardado!', 'La nota se ha actualizado correctamente', 'success');
        setIsReadOnly(true); // Regresar a modo solo lectura después de guardar
        navigate('/home');
      } else {
        console.error('Error al guardar la nota:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Alternar entre modo de edición y solo lectura
  const toggleEdit = () => {
    setIsReadOnly(!isReadOnly);
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <header className="flex justify-between items-center p-4 pt-12">
        <button
          onClick={() => navigate('/home')}
          className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
        >
          <img src={chevron_left} className="w-3 h-5" alt="Volver" />
        </button>
        {isReadOnly ? (
          <button
            onClick={toggleEdit}
            className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
          >
            <img src={mode} alt="Editar" />
          </button>
        ) : (
          <button
            onClick={handleSave} // Al hacer clic, guarda los cambios
            className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
          >
            <img src={save} alt="Guardar" />
          </button>
        )}
      </header>
      <form className="mt-6">
        <textarea
          ref={titleRef} // Asignamos la referencia aquí
          name="title"
          value={noteData.title}
          onChange={(e) => {
            setNoteData({ ...noteData, title: e.target.value });
            adjustTitleHeight(e.target.value); // Ajustamos la altura al cambiar el contenido
          }}
          placeholder="Title"
          className="w-full border border-transparent rounded-lg px-4 py-2 bg-transparent text-4xl text-white resize-none overflow-hidden focus:outline-none"
          readOnly={isReadOnly}
          rows="1"
        />
        <textarea
          name="description"
          value={noteData.description}
          onChange={(e) => setNoteData({ ...noteData, description: e.target.value })}
          placeholder="Description"
          className="w-full h-[65vh] overflow-auto border border-transparent rounded-lg px-4 py-2 mb-4 bg-color1 text-2xl text-white bg-transparent focus:outline-none"
          rows="10"
          readOnly={isReadOnly}
        />
      </form>
    </div>
  );
};

export default EditNote;

// src/components/note/NotesScreen.jsx

import React, { useState, useEffect } from 'react';
import rafiki from '../../assets/img/rafiki.png';
import searchIcon from '../../assets/img/search.png';
import infoOutlineIcon from '../../assets/img/info_outline.png';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2'; // Asegúrate de tener sweetalert2 instalado
import { useNavigate } from 'react-router-dom';

const colors = ['bg-[#FFAB91]', 'bg-[#D3D0CB]', 'bg-[#F8BBD0]', 'bg-[#E6EE9C]', 'bg-[#80DEEA]'];

export default function NotesScreen() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [infoButtonClicked, setInfoButtonClicked] = useState(false); // Estado para el botón de info

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:5000/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const visibleNotes = data.notes.filter(note => note.status === 'visible');
          setNotes(visibleNotes);
        } else {
          console.error("Error al obtener notas:", data);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchNotes();
  }, []);

  const openNote = (id) => {
    // Lógica para editar la nota
    navigate(`/editNote?id=${id}`);
  };

  const deleteNote = async (noteId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter(note => note._id !== noteId));
        Swal.fire('¡Eliminado!', 'La nota ha sido eliminada.', 'success');
      } else {
        console.error("Error al eliminar la nota:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleNoteClick = (noteId) => {
    // Solo mostrar el popup si el botón de información está activado
    if (infoButtonClicked) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Quieres eliminar esta nota?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteNote(noteId);
        }
      });
    } else {
      // Si el botón de información no está activado, abrir para editar
      openNote(noteId);
    }
  };

  const toggleInfoButton = () => {
    setInfoButtonClicked(!infoButtonClicked); // Cambia el estado del botón de información
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <header className="flex justify-between items-center p-4 pt-12">
        <h1 className="text-5xl font-semibold">Notes</h1>
        <div className="flex space-x-2">
          <button className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200">
            <img src={searchIcon} className="w-5 h-5" alt="Buscar" />
          </button>
          <button
            className={`w-[50px] h-[50px] flex items-center justify-center rounded-2xl transition-colors duration-200 ${infoButtonClicked ? 'bg-red-600' : 'bg-[#3B3B3B]'} hover:bg-red-700`}
            onClick={toggleInfoButton}
          >
            <img src={infoOutlineIcon} className="w-5 h-5" alt="Información" />
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center pt-8 p-6 max-h-[85vh]">
        {notes.length === 0 ? (
          <div className="text-center">
            <div className="w-48 h-48 mb-6">
              <img src={rafiki} alt="Imagen de ejemplo" />
            </div>
            <p className="text-lg mb-6">Create your first note!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className={`${colors[index % colors.length]} rounded-lg p-4 text-black cursor-pointer`}
                onClick={() => handleNoteClick(note._id)} // Llama a la función para manejar el clic
              >
                <h2 className="text-xl font-bold mb-2">{note.title}</h2>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="p-4 absolute right-5 bottom-5">
        <button onClick={() => navigate('/createNote')} className="w-16 h-16 bg-[#252525] float-right text-black hover:bg-gray-200 rounded-full font-medium flex items-center justify-center transition-colors duration-200 shadow-[-5px_0px_15px_rgba(0,0,0,0.5)]">
          <Plus className="text-white h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}

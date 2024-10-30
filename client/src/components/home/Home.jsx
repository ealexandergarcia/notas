// src/components/note/NotesScreen.jsx

import React, { useState, useEffect } from 'react';
import rafiki from '../../assets/img/rafiki.png';
import searchIcon from '../../assets/img/search.png';
import infoOutlineIcon from '../../assets/img/info_outline.png';
import cuate from '../../assets/img/cuate.png';
import close from '../../assets/img/close.png';
import { Plus } from 'lucide-react';
import Swal from 'sweetalert2'; // Asegúrate de tener sweetalert2 instalado
import { useNavigate } from 'react-router-dom';

const colors = ['bg-[#FFAB91]', 'bg-[#D3D0CB]', 'bg-[#F8BBD0]', 'bg-[#E6EE9C]', 'bg-[#80DEEA]'];

export default function NotesScreen() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]); // Todas las notas
  const [filteredNotes, setFilteredNotes] = useState([]); // Notas que se muestran al buscar
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [infoButtonClicked, setInfoButtonClicked] = useState(false); // Estado para el botón de info
  const [searchActive, setSearchActive] = useState(false); // Estado para controlar si la búsqueda está activa

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:5000/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0',
          },
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          const visibleNotes = data.notes.filter(note => note.status === 'visible');
          setNotes(visibleNotes);
          setFilteredNotes([]); // Inicialmente, las notas filtradas están vacías
        } else {
          console.error("Error al obtener notas:", data);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleSearch = async (term) => {
    if (term.trim() === '') {
      // Si el término de búsqueda está vacío, vaciar las notas filtradas
      setFilteredNotes([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://localhost:5000/api/notes/search?query=${encodeURIComponent(term)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        // Actualiza las notas filtradas con los resultados de búsqueda
        setFilteredNotes(data.notes);
      } else {
        console.error("Error al buscar notas:", data);
        setFilteredNotes([]); // En caso de error, vacía las notas filtradas
      }
    } catch (error) {
      console.error("Error de red:", error);
      setFilteredNotes([]); // En caso de error, vacía las notas filtradas
    }
  };

  const handleInputChange = (e) => {
    const term = e.target.value; // Capturar el valor del input
    setSearchTerm(term); // Actualiza el estado del término de búsqueda
    handleSearch(term); // Ejecutar búsqueda en tiempo real
  };

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
        },
        credentials: 'include'
      });

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter(note => note._id !== noteId));
        setFilteredNotes((prevFilteredNotes) => prevFilteredNotes.filter(note => note._id !== noteId)); // Actualiza las notas filtradas
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

  const toggleSearch = () => {
    setSearchActive(!searchActive); // Cambiar el estado de búsqueda
    setSearchTerm(''); // Resetear el término de búsqueda
    setFilteredNotes([]); // Reiniciar las notas filtradas
  };

  return (
    <div className="flex flex-col h-screen text-white">
      <header className="flex justify-between items-center p-4 pt-12">
        {!searchActive && <h1 className="text-5xl font-semibold">Notes</h1>} {/* Muestra el título solo si no está en modo de búsqueda */}
        <div className={`flex ${searchActive ? 'w-full' : ''} space-x-2`}>
          {!searchActive ? (
            <>
              <button
                className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
                onClick={toggleSearch} // Activa el modo de búsqueda
              >
                <img src={searchIcon} className="w-5 h-5" alt="Buscar" />
              </button>
              <button
                className={`w-[50px] h-[50px] flex items-center justify-center rounded-2xl transition-colors duration-200 ${infoButtonClicked ? 'bg-red-600' : 'bg-[#3B3B3B]'} hover:bg-red-700`}
                onClick={toggleInfoButton}
              >
                <img src={infoOutlineIcon} className="w-5 h-5" alt="Información" />
              </button>
            </>
          ) : (
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange} // Actualiza el estado del término de búsqueda y busca
                className="p-2 rounded-lg bg-[#3B3B3B] text-white w-full pr-10" // Añade padding a la derecha para que no se superponga
                placeholder="Buscar..."
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500"
                onClick={toggleSearch} // Cierra el modo de búsqueda
              >
              <img src={close} alt="Imagen de ejemplo" />
              </button>
            </div>

          )}
        </div>
      </header>
      <main className={`flex-grow flex flex-col items-center pt-8 p-6 max-h-[85vh] ${(!notes.length && !searchActive) || (searchActive && filteredNotes.length === 0) ? 'justify-center' : ''}`}>
        {!searchActive ? ( // Muestra el contenido solo si no está en modo de búsqueda
          notes.length === 0 ? (
            <div className="text-center">
              <div className="w-50 h-50 mb-6">
                <img src={rafiki} alt="Imagen de ejemplo" />
              </div>
              <p className="text-lg mb-6">Create your first note!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto">
              {notes.map((note, index) => ( // Renderiza todas las notas
                <div
                  key={note._id}
                  className={`${colors[index % colors.length]} rounded-lg p-4 text-black cursor-pointer`}
                  onClick={() => handleNoteClick(note._id)} // Llama a la función para manejar el clic
                >
                  <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                </div>
              ))}
            </div>
          )
        ) : filteredNotes.length === 0 ? ( // Muestra contenido solo si hay una búsqueda activa
          <div className="flex flex-col items-center">
            <div className="w-50 h-50">
              <img src={cuate} alt="Imagen de ejemplo" />
            </div>
            <p className="text-lg mb-6">File not found. Try searching again.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full overflow-auto">
            {filteredNotes.map((note, index) => ( // Renderiza las notas filtradas
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

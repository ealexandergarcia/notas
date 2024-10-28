import React, { useState, useEffect } from 'react';
import rafiki from '../../assets/img/rafiki.png';
import searchIcon from '../../assets/img/search.png';
import infoOutlineIcon from '../../assets/img/info_outline.png';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const colors = ['bg-[#FFAB91]', 'bg-[#D3D0CB]', 'bg-[#F8BBD0]', 'bg-[#E6EE9C]', 'bg-[#80DEEA]'];

export default function NotesScreen() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);

        const response = await fetch('https://localhost:5000/api/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0',
            'Authorization': `Bearer ${token}`, // Aquí es donde añades el token
          },
        });


        const data = await response.json();

        if (response.ok) {
          // Filtrar notas con status "visible"
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

  return (
    <div className="flex flex-col h-screen text-white">
      <header className="flex justify-between items-center p-4 pt-12">
        <h1 className="text-5xl font-semibold">Notes</h1>
        <div className="flex space-x-2">
          <button className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200">
            <img src={searchIcon} className="w-5 h-5" alt="Buscar" />
          </button>
          <button className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200">
            <img src={infoOutlineIcon} className="w-5 h-5" alt="Información" />
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center pt-8 p-6  max-h-[85vh]">
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
                key={note._id} // Asegúrate de usar el id correcto aquí
                className={`${colors[index % colors.length]} rounded-lg p-4 text-black`}
              >
                <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                <p>{note.description}</p>
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

// src/components/note/CreateNote.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import chevron_left from '../../assets/img/chevron_left.png';
import save from '../../assets/img/save.png';
import visibility from '../../assets/img/visibility.png';

const MySwal = withReactContent(Swal);

const CreateNote = () => {
  const [noteData, setNoteData] = useState({ title: '', description: '' });
  const [isReadOnly, setIsReadOnly] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const toggleReadOnly = () => {
    setIsReadOnly((prev) => !prev);
  };

  const confirmSavePopup = () => {
    MySwal.fire({
      title: 'Save changes?',
      icon: 'warning',
      background: '#252525', // Fondo oscuro del popup
      color: '#FFFFFF', // Color de texto en el popup
      backdrop: `#454545cc`, // Fondo gris con opacidad detrás del popup
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Discard',
      confirmButtonColor: '#28a745', // Color verde para Save
      cancelButtonColor: '#dc3545', // Color rojo para Discard
      customClass: {
        popup: 'rounded-lg shadow-lg', // Clases de personalización opcionales
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSave(); // Ejecuta handleSave si se confirma
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        showDiscardConfirmation(); // Muestra popup para descartar cambios
      }
    });
  };

  const showDiscardConfirmation = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "Your changes won't be saved.",
      icon: 'warning',
      background: '#252525',
      color: '#FFFFFF',
      backdrop: `rgba(196, 196, 196, 0.8)`,
      showCancelButton: true,
      confirmButtonText: 'Yes, discard',
      cancelButtonText: 'No, keep editing',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      customClass: {
        popup: 'rounded-lg shadow-lg',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/#/home'); // Navega a /home si se confirma
      }
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials:  'include',

        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Nota creada:', result);
        navigate('/#/home');
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
          onClick={() => navigate('/#/home')}
          className="w-[50px] h-[50px] flex items-center justify-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200"
        >
          <img src={chevron_left} className="w-3 h-5" alt="Volver" />
        </button>
        <div className="flex gap-5">
          <button
            onClick={toggleReadOnly}
            className={`w-[50px] h-[50px] flex items-center justify-center rounded-2xl transition-colors duration-200 ${
              isReadOnly ? 'bg-blue-500' : 'bg-[#3B3B3B]'
            } hover:bg-blue-700`}
          >
            <img src={visibility} className="w-5 h-4" alt="Ver" />
          </button>
          <button
            onClick={confirmSavePopup}
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
          readOnly={isReadOnly}
          required
        />
        <textarea
          className="w-full h-[65vh] overflow-auto border border-transparent rounded-lg px-4 py-2 mb-4 bg-color1 text-2xl text-white bg-transparent focus:outline-none"
          name="description"
          value={noteData.description}
          onChange={handleInputChange}
          placeholder="Type something..."
          readOnly={isReadOnly}
          required
        />
      </form>
    </div>
  );
};

export default CreateNote;

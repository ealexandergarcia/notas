// src/components/note/CreateNote.jsx
import React, { useState } from 'react';

const CreateNote = () => {
  const [noteData, setNoteData] = useState({ title: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar la creación de la nota
    console.log('Note created:', noteData);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-white">
      <h1 className="font-poppins font-bold mb-10 text-3xl">Create New Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-slate-0 rounded-lg px-4 py-2 w-80 mb-4 bg-color1 text-black"
          type="text"
          name="title"
          value={noteData.title}
          onChange={handleInputChange}
          placeholder="Note Title"
          required
        />
        <textarea
          className="border border-slate-0 rounded-lg px-4 py-2 w-80 mb-4 bg-color1 text-black"
          name="description"
          value={noteData.description}
          onChange={handleInputChange}
          placeholder="Note Description"
          required
        />
        <button className="bg-[#FE0000] font-inter font-semibold text-slate-50 px-36 py-4 rounded-lg mb-9">
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;

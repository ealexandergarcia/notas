import React from 'react'
import rafiki from '../../assets/img/rafiki.png';
import search from '../../assets/img/search.png';
import info_outline from '../../assets/img/info_outline.png';

import { Plus } from 'lucide-react'

export default function EmptyHomeScreen() {
  return (
    <div className="flex flex-col h-screen text-white">
      <header className="flex justify-between items-center p-4 pt-12">
        <h1 className="text-5xl font-semibold">Notes</h1>
        <div className="flex space-x-2">
          <button className="w-12 h-12 justify-items-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200">
          <img src={search} className='w-4 h-4' alt="Imagen de busqueda" />
          </button>
          <button className="w-12 h-12 justify-items-center rounded-2xl bg-[#3B3B3B] hover:bg-gray-800 transition-colors duration-200">
          <img src={info_outline} className='w-4 h-4' alt="Imagen de busqueda" />
          </button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center p-8 justify-center">
        <div className="w-full mb-6 justify-items-center">
        <img src={rafiki} alt="Imagen de ejemplo" />
        </div>
        <p className="text-lg mb-6">Create your first note !</p>
      </main>
      <footer className="p-4">
  <button className="w-16 h-16 bg-[#252525] float-right text-black hover:bg-gray-200 rounded-full font-medium flex items-center justify-center transition-colors duration-200 shadow-[8px_0px_15px_rgba(0,0,0,0.5)]">
    <Plus className="text-white h-5 w-5" />
  </button>
</footer>

    </div>
  )
}
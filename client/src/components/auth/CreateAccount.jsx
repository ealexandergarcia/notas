import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ableImg from '../../assets/img/able.svg';
import occultImg from '../../assets/img/occult.svg';

const CreateAccount = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset previous errors

    try {
      const response = await fetch('https://notas-jea3xnvnr-ealexandergarcias-projects.vercel.app/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al crear la cuenta');
      }
    } catch (error) {
      setError('Error de conexión, intenta nuevamente.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-white p-4">
      <h1 className="font-poppins font-bold mb-10 text-3xl text-center">Create Account</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="relative mb-6 w-full">
          <p className="font-inter font-regular text-left mb-1.5 text-sm">Username</p>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border border-slate-0 rounded-lg px-4 py-2 w-full bg-color1 text-black"
            type="text"
            placeholder="Your username"
            required
          />
        </div>
        <div className="relative mb-6 w-full">
          <p className="font-inter font-regular text-left mb-1.5 text-sm">Email</p>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-slate-0 rounded-lg px-4 py-2 w-full bg-color1 text-black"
            type="email"
            placeholder="Your email"
            required
          />
        </div>
        <div className="relative mb-6 w-full">
          <p className="text-left font-inter font-regular mb-1.5 text-sm">Password</p>
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-slate-0 rounded-lg px-4 py-2 w-full bg-color1 text-black"
            type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
            placeholder="Your password"
            required
          />
          <img
            className="absolute right-3 transform -translate-y-7 cursor-pointer"
            src={passwordVisible ? ableImg : occultImg} // Change icon based on visibility
            alt="Toggle Password Visibility"
            onClick={togglePasswordVisibility} // Handle click to toggle
          />
        </div>
        <button
          type="submit"
          className="bg-[#FE0000] font-inter font-semibold text-slate-50 px-4 py-3 rounded-lg text-base mb-10 w-full"
        >
          Create Account
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      <div className="flex flex-row gap-x-2">
        <p className="font-inter font-regular text-sm">Already have an account?</p>
        <a
          className="font-inter font-semibold text-white border-b-2 border-slate-950 cursor-pointer"
          onClick={() => navigate('/')}
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default CreateAccount;

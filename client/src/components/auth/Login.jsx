import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agreeImg from '../../assets/img/agree.svg';
import disagreeImg from '../../assets/img/disagree.svg';
import occultImg from '../../assets/img/occult.svg';
import LineImg from '../../assets/img/Line.svg';
import facebookImg from '../../assets/img/facebook.svg';
import googleImg from '../../assets/img/google.svg';
import appleImg from '../../assets/img/apple.svg';
import ableImg from '../../assets/img/able.svg';

// Importar imágenes como en tu código original

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://notas-phi.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.data.token);
        navigate('/home'); // Redirect to home on successful login
      } else {
        const data = await response.json();
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error de conexión, intenta nuevamente.');
    }
  };

  const handleSignUp = () => {
    navigate('/createAccount'); // Redirige a la página de registro
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-white p-4">
      <h1 className="font-poppins font-bold mb-10 text-3xl">Log in</h1>
      <form className="w-full max-w-xs" onSubmit={handleSubmit}>
        <div className="relative mb-4 w-full text-sm">
          <p className="font-inter font-regular mb-1.5 text-left">Email address</p>
          <input
            className="border border-slate-0 rounded-lg px-4 py-2 w-full bg-color1 text-black"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            id="email"
            placeholder="helloworld@gmail.com"
            required
          />
          <img
            className="absolute right-3 transform -translate-y-7"
            src={formData.email ? agreeImg : disagreeImg}
            alt="Validation"
          />
        </div>
        <div className="relative mb-3.5 w-full text-sm">
          <p className="font-inter font-regular mb-1.5 text-left">Password</p>
          <input
            className="border border-slate-0 rounded-lg px-4 py-2 w-full bg-color1 text-black"
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            id="password"
            placeholder="Your password"
            required
          />
          <img
            className="absolute right-3 transform -translate-y-7 cursor-pointer"
            src={passwordVisible ? ableImg : occultImg}
            alt="Toggle visibility"
            onClick={togglePasswordVisibility}
          />
        </div>
        <p className="mb-4 text-sm text-right">Forgot password?</p>
        <button className="bg-[#FE0000] font-inter font-semibold text-slate-50 px-6 py-3 rounded-lg mb-5 w-full">
          Log in
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
      <div className="flex flex-row mb-5 gap-x-2 items-center">
        <img src={LineImg} alt="Line" />
        <p className="text-sm">Or Login with</p>
        <img src={LineImg} alt="Line" />
      </div>
      <div className="flex flex-row mb-32 gap-x-4">
        <button className="border border-slate-0 rounded-lg px-4 py-2 w-14 bg-color1 bg-white flex justify-center items-center">
          <img className="w-6" src={facebookImg} alt="Facebook" />
        </button>
        <button className="border border-slate-0 rounded-lg px-4 py-2 w-14 bg-color1 bg-white flex justify-center items-center">
          <img className="w-6" src={googleImg} alt="Google" />
        </button>
        <button className="border border-slate-0 rounded-lg px-4 py-2 w-14 bg-color1 bg-white flex justify-center items-center">
          <img className="w-6" src={appleImg} alt="Apple" />
        </button>
      </div>
      <div className="flex flex-row gap-x-2">
        <p className="font-inter font-regular text-sm">Don’t have an account?</p>
        <button
          className="font-inter font-semibold text-white border-b-2 border-slate-950 text-sm"
          onClick={handleSignUp} // Cambiado a usar navigate
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;

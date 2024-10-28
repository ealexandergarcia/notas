// src/components/auth/Login.jsx
import React, { useState } from 'react';
import smallStarImg from '../../assets/img/smallStar.svg';
import agreeImg from '../../assets/img/agree.svg';
import disagreeImg from '../../assets/img/disagree.svg';
import ableImg from '../../assets/img/able.svg';
import occultImg from '../../assets/img/occult.svg';
import googleImg from '../../assets/img/google.svg';
import facebookImg from '../../assets/img/facebook.svg';
import appleImg from '../../assets/img/apple.svg';
import LineImg from '../../assets/img/Line.svg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-white p-4">
      <h1 className="font-poppins font-bold mb-10 text-3xl">Log in</h1>
      <form className="w-full max-w-xs">
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
        <a
          className="font-inter font-semibold text-white border-b-2 border-slate-950 text-sm"
          href="/createAccount"
        >
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;

// src/components/auth/CreateAccount.jsx
import React from 'react';
import agreeImg from '../../assets/img/agree.svg';
import disagreeImg from '../../assets/img/disagree.svg';
import smallStarImg from '../../assets/img/smallStar.svg';
import ableImg from '../../assets/img/able.svg';
import occultImg from '../../assets/img/occult.svg';

const CreateAccount = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-white">
      <button>
        <img className="flex mb-14 ml-72" src={smallStarImg} alt="Small Star" />
      </button>
      <h1 className="font-poppins font-bold mb-10 text-3xl mr-32">Create account</h1>
      <form>
        <div className="relative w-full">
          <p className="font-inter font-regular text-left mb-1.5 text-sm">Username</p>
          <input
            className="border border-slate-0 rounded-lg mb-6 px-4 py-2 w-full bg-color1 text-black"
            type="text"
            placeholder="Your username"
            required
          />
        </div>
        <div className="relative w-full">
          <p className="font-inter font-regular text-left mb-1.5 text-sm">Email</p>
          <input
            className="border border-slate-0 rounded-lg mb-6 px-4 py-2 w-full bg-color1 text-black"
            type="email"
            placeholder="Your email"
            required
          />
        </div>
        <div className="relative mb-6 w-full">
          <p className="text-left font-inter font-regular mb-1.5 text-sm">Password</p>
          <input
            className="border border-slate-0 rounded-lg px-4 py-2 w-full bg-color1 text-black"
            type="password"
            placeholder="Your password"
            required
          />
          <img
            className="absolute right-3 transform -translate-y-7 cursor-pointer"
            src={ableImg}
            alt="Toggle Password Visibility"
          />
        </div>
        <button
          type="submit"
          className="bg-[#FE0000] font-inter font-semibold text-slate-50 px-36 py-4 rounded-lg text-base mb-32"
        >
          Create Account
        </button>
      </form>
      <div className="flex flex-row gap-x-2">
        <p className="font-inter font-regular text-sm">Already have an account?</p>
        <a
          className="font-inter font-semibold text-white border-b-2 border-slate-950 cursor-pointer"
        >
          Log in
        </a>
      </div>
    </div>
  );
};

export default CreateAccount;

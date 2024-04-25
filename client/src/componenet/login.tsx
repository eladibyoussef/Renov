import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../features/login/loginSlice'; 
import { useAppDispatch } from '../store/hooks';

const LoginContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="max-w-md col-span-2 md:col-span-1 bg-neutral-50 rounded-tl-3xl overflow-auto flex flex-col gap-2 h-screen">
      <div className="rounded-tl-3xl rounded-tr-3xl pl-8 pr-8 pt-8 ">
        <div className="text-center">
          <div className="text-black text-sm font-normal">WELCOME BACK</div>
          <div className="text-black text-lg font-normal mt-2 mb-8">Log In to your Account</div>
        </div>
        <div className="w-96 h-40 flex-col justify-start items-start gap-4 inline-flex ">
          <div className="w-96 h-5 relative border ">
            <div className="w-96 h-16 left-0 top-0 absolute">
              <input
                type="text"
                className="w-96 h-14 left-0 top-[11px] absolute rounded-lg border border-stone-300"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="w-20 h-6 left-[11.18px] top-0 absolute">
                <div className="w-20 h-6 left-0 top-0 absolute bg-neutral-50" />
                <div className="w-16 left-[5.54px] top-0 absolute text-center text-neutral-500 text-xs font-normal font-['Zen Kaku Gothic Antique'] leading-snug">Email</div>
              </div>
            </div>
            <div className="InputCopy w-96 h-16 left-0 top-[76px] absolute ">
              <input
                type="password"
                className="w-96 h-14 left-0 top-[11px] absolute rounded-lg border border-stone-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="w-14 h-6 left-[11.17px] top-0 absolute ">
                <div className="w-14 h-6 left-0 top-0 absolute bg-neutral-50" />
                <div className="w-11 left-[5.55px] top-0 absolute text-center text-neutral-500 text-xs font-normal font-['Zen Kaku Gothic Antique'] leading-snug">Password</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-1">
            <input type="checkbox" className="h-4 w-4 text-black" />
            <label className="text-sm text-black font-normal">Remember me</label>
          </div>
          <a href="#" className="text-sm text-black font-normal">Forgot Password?</a>
        </div>
        <button className="w-full mt-4 bg-neutral-800 text-white py-3 rounded-lg font-bold " onClick={handleLogin}>CONTINUE</button>
      </div>
      <div className="text-center ">Or</div>
      <div className="bg-neutral-50 pl-32 rounded-b-xl ">
        <button className="w-full bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg mb-2 flex items-center gap-2">
          <img src="http://pluspng.com/img-png/google-logo-png-google-logo-icon-png-transparent-background-1000.png" alt="Google Icon" className="w-6 h-6" />
          <span>Log In with Google</span>
        </button>
        <button className="w-full bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg mb-2 flex items-center gap-2">
          <img src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png" alt="Facebook Icon" className="w-6 h-6" />
          <span>Log In with Facebook</span>
        </button>
        <button className="w-full bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg flex items-center gap-2">
          <img src="http://purepng.com/public/uploads/large/purepng.com-apple-logologobrand-logoiconslogos-251519938788qhgdl.png" alt="Apple Icon" className="w-6 h-6" />
          <span>Log In with Apple</span>
        </button>
      </div>
      <div className="text-center mt-4">
        <span className="text-sm text-black font-normal">New User?</span>
        <Link to="signup" className="text-sm text-black font-bold ml-1 underline">SIGN UP HERE</Link>
      </div>
    </div>
  );
}

export default LoginContainer;

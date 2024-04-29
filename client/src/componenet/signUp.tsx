import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../features/SignupLogin/authSlice';
import { useAppDispatch } from '../store/hooks';

const SignupContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignup = () => {
    if (acceptTerms) {
      dispatch(registerUser({ username, email, password }));
    } else {
      // Handle terms acceptance error
      console.error('Please accept the terms and conditions.');
    }
  };

  return (
    <div className="max-w-md md:col-span-1 bg-neutral-50 rounded-tl-3xl h-screen ">
      <div className=" rounded-tl-3xl rounded-tr-3xl p-8 "> 
        <div className="text-center">
          <div className="text-black text-sm font-normal">WELCOME TO RENOVO</div>
          <div className="text-black text-lg font-normal mt-2 mb-8">Create an Account to Join</div>
        </div>
        <div className=" w-96 h-56 flex-col justify-start items-start gap-4 inline-flex">
          <div className=" w-96 h-56 relative">
            {/* Input for Name */}
            <div className="Input w-96 h-16 left-0 top-0 absolute">
              <input
                type="text"
                className=" w-96 h-14 left-0 top-[11px] absolute rounded-lg border border-stone-300"
                placeholder="Your Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className=" w-20 h-6 left-[11.18px] top-0 absolute">
                <div className=" w-20 h-6 left-0 top-0 absolute bg-neutral-50" />
                <div className=" w-16 left-[5.54px] top-0 absolute text-center text-neutral-500 text-xs font-normal font-['Zen Kaku Gothic Antique'] leading-snug">Name</div>
              </div>
            </div>
            {/* Input for Email */}
            <div className="w-96 h-16 left-0 top-[76px] absolute">
              <input
                type="email"
                className="w-96 h-14 left-0 top-[11px] absolute rounded-lg border border-stone-300"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="w-14 h-6 left-[11.17px] top-0 absolute">
                <div className="w-14 h-6 left-0 top-0 absolute bg-neutral-50" />
                <div className="w-11 left-[5.55px] top-0 absolute text-center text-neutral-500 text-xs font-normal font-['Zen Kaku Gothic Antique'] leading-snug">Email</div>
              </div>
            </div>
            {/* Input for Password */}
            <div className="w-96 h-16 left-0 top-[152px] absolute">
              <input
                type="password"
                className="w-96 h-14 left-0 top-[11px] absolute rounded-lg border border-stone-300"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className=" w-16 h-6 left-[11.17px] top-0 absolute">
                <div className=" w-16 h-6 left-0 top-0 absolute bg-neutral-50" />
                <div className="w-14 left-[5.55px] top-0 absolute text-center text-neutral-500 text-xs font-normal font-['Zen Kaku Gothic Antique'] leading-snug">Password</div>
              </div>
            </div>
          </div>
        </div>

        <div className="FlexCol w-96 h-14 justify-start items-center gap-16 inline-flex">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              className="h-4 w-4 text-black"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label className="text-sm text-black font-normal">I Accept Terms & Conditions</label>
          </div>
          <button className=" w-40 h-14 relative bg-cyan-800 rounded-3xl shadow text-white font-bold text-xs leading-snug" onClick={handleSignup}>SIGN UP</button>
        </div>
      
        <div className="bg-neutral-50 p-8 rounded-b-xl">
          <div className="text-center mb-4">Or</div>
          <button className="w-full bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg mb-2 flex items-center gap-2">
            <img src="http://pluspng.com/img-png/google-logo-png-google-logo-icon-png-transparent-background-1000.png" alt="Google Icon" className="w-6 h-6" />
            <span>Sign In with Google</span>
          </button>
          <button className="w-full bg-neutral-50 border border-zinc-100 text-zinc-600 py-3 rounded-lg mb-2 flex items-center gap-2">
            <img src="http://pngimg.com/uploads/facebook_logos/facebook_logos_PNG19748.png" alt="Facebook Icon" className="w-6 h-6" />
            <span>Sign In with Facebook</span>
          </button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm text-black font-normal">Already Have An Account?</span>
          <Link to="/" className="text-sm text-black font-bold ml-1 underline">LOG IN</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupContainer;

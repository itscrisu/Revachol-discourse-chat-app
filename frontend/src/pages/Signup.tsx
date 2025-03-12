import { useState } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../components/AppLogo";
import AvatarPreview from "../components/AvatarPreview";
import useSignup from "../hooks/useSignUp";

function Signup() {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(inputs);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const showAvatarPreview = inputs.username && inputs.gender;

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto h-screen bg-amber-50 bg-opacity-5">
      <div className="w-full p-8 rounded-sm shadow-xl bg-stone-800 bg-opacity-90 border-l-4 border-amber-700 font-serif">
        <div className="flex justify-center mb-6">
          <AppLogo size="lg" />
        </div>
        <h1 className="text-3xl font-bold text-center text-amber-200 mb-8 tracking-wide">
          <span className="text-red-400 italic">FORGE</span> NEW IDENTITY
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-l-2 border-amber-900 pl-4">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              FULL DESIGNATION
            </label>
            <input
              type="text"
              placeholder="Enter your full name..."
              className="w-full py-2 px-3 bg-stone-900 border border-amber-900 text-amber-100 placeholder-amber-700 font-mono focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
              name="fullName"
              value={inputs.fullName}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs italic text-amber-700">What others shall refer to you as in totality.</p>
          </div>

          <div className="border-l-2 border-amber-900 pl-4">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              PSYCHE IDENTIFIER
            </label>
            <input
              type="text"
              placeholder="Choose a username..."
              className="w-full py-2 px-3 bg-stone-900 border border-amber-900 text-amber-100 placeholder-amber-700 font-mono focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
              name="username"
              value={inputs.username}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs italic text-amber-700">A simple marker for your existence in this realm.</p>
          </div>

          <div className="border-l-2 border-amber-900 pl-4">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              SECRET PHRASE
            </label>
            <input
              type="password"
              placeholder="Create a password..."
              className="w-full py-2 px-3 bg-stone-900 border border-amber-700 text-amber-100 placeholder-amber-700 font-mono focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
              name="password"
              value={inputs.password}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs italic text-amber-700">Choose wisely. A weak phrase leaves your mind vulnerable.</p>
          </div>

          <div className="border-l-2 border-amber-900 pl-4">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              CONFIRM SECRET PHRASE
            </label>
            <input
              type="password"
              placeholder="Confirm your password..."
              className="w-full py-2 px-3 bg-stone-900 border border-amber-700 text-amber-100 placeholder-amber-700 font-mono focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
            />
            <p className="mt-1 text-xs italic text-amber-700">Verify that your mind remembers what it just created.</p>
          </div>

          <div className="border-l-2 border-amber-900 pl-4 py-3">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              CORPOREAL FORM
            </label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="hidden"
                  onChange={handleChange}
                  checked={inputs.gender === "male"}
                />
                <span className={`w-4 h-4 border ${inputs.gender === "male" ? "bg-red-700 border-amber-500" : "bg-stone-900 border-amber-700 group-hover:border-amber-500"} inline-block transition-colors`}></span>
                <span className={`${inputs.gender === "male" ? "text-amber-200" : "text-amber-400"} group-hover:text-amber-200 transition-colors`}>MALE FORM</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="hidden"
                  onChange={handleChange}
                  checked={inputs.gender === "female"}
                />
                <span className={`w-4 h-4 border ${inputs.gender === "female" ? "bg-red-700 border-amber-500" : "bg-stone-900 border-amber-700 group-hover:border-amber-500"} inline-block transition-colors`}></span>
                <span className={`${inputs.gender === "female" ? "text-amber-200" : "text-amber-400"} group-hover:text-amber-200 transition-colors`}>FEMALE FORM</span>
              </label>
            </div>
            <p className="mt-3 text-xs italic text-amber-700">How do you perceive your vessel in this existence?</p>
          </div>

          {showAvatarPreview && (
            <div className="border-l-2 border-amber-900 pl-4 py-3">
              <AvatarPreview username={inputs.username} gender={inputs.gender} />
            </div>
          )}

          <div className="mt-4 bg-stone-900 bg-opacity-60 p-3 border-l-2 border-red-800">
            <p className="text-amber-200 text-sm italic leading-relaxed">
              Creating a new identity is a significant step. Perhaps you already have one, waiting to be remembered?
            </p>
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 mt-2 inline-block uppercase tracking-wide text-xs font-bold transition-colors"
            >
              RECALL EXISTING CONSCIOUSNESS
            </Link>
          </div>

          <div className="pt-2">
            <button
              className="w-full py-3 bg-red-900 hover:bg-red-800 text-amber-100 uppercase tracking-wider font-bold text-sm border border-amber-800 transform transition hover:-translate-y-0.5 shadow-md"
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-amber-100 rounded-full animate-spin"></span>
              ) : (
                "INSTANTIATE NEW BEING"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
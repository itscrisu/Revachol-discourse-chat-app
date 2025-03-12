import { useState } from "react";
import { Link } from "react-router-dom";
import AppLogo from "../components/AppLogo";
import useLogin from "../hooks/useLogin";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto h-screen bg-amber-50 bg-opacity-5">
      <div className="w-full p-8 rounded-sm shadow-xl bg-stone-800 bg-opacity-90 border-l-4 border-amber-700 font-serif">
        <div className="flex justify-center mb-6">
          <AppLogo size="lg" />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-amber-200 mb-8 tracking-wide">
          <span className="text-red-400 italic">RECALL</span> YOUR IDENTITY
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-l-2 border-amber-900 pl-4">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              PSYCHE
            </label>
            <input
              type="text"
              placeholder="Enter your username..."
              className="w-full py-2 px-3 bg-stone-900 border border-amber-900 text-amber-100 placeholder-amber-700 font-mono focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="mt-1 text-xs italic text-amber-700">The identity by which others know you in this realm.</p>
          </div>

          <div className="border-l-2 border-amber-900 pl-4">
            <label className="block mb-2 text-amber-100 uppercase tracking-wide text-sm font-bold">
              SECRET PHRASE
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              className="w-full py-2 px-3 bg-stone-900 border border-amber-700 text-amber-100 placeholder-amber-700 font-mono focus:outline-none focus:ring-1 focus:ring-red-700 focus:border-red-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-1 text-xs italic text-amber-700">A code known only to you. Guard it well.</p>
          </div>

          <div className="mt-4 bg-stone-900 bg-opacity-60 p-3 border-l-2 border-red-800">
            <p className="text-amber-200 text-sm italic leading-relaxed">
              Your thoughts are scattered. You need to gather them. Remember who you are.
              Or perhaps... create a new identity?
            </p>
            <Link
              to="/signup"
              className="text-red-400 hover:text-red-300 mt-2 inline-block uppercase tracking-wide text-xs font-bold transition-colors"
            >
              FORGE NEW CONSCIOUSNESS
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
                "COMMENCE RECOLLECTION"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

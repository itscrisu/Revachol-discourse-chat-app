import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/Signup";

function App() {
	const { authUser, isLoading } = useAuthContext();

	if (isLoading) return null;

	return (
		<div className='p-4 h-screen flex items-center justify-center min-w-[1024px]'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
				<Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
				<Route path='/profile' element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
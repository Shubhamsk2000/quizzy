import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/')
    }
    return (
        <nav className="fixed top-0 w-full h-16 px-20 bg-white border border-[#979897] shadow-lg flex justify-center items-center">
            <div className="container flex items-center justify-between mx-auto">
                <Link to={'/'}>
                    <h1 className="text-2xl font-bold">Quizzy</h1>
                </Link>

                <div className="space-x-4">
                    {token ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-medium text-[#55d87a]">Role: {userRole}</span>
                                <button onClick={handleLogOut} className="bg-[#55d87a] px-4 py-2 rounded-md font-medium hover:bg-[#45c76c] transition">
                                    Log Out
                                </button>

                                <Link className="bg-[#55d87a] px-4 py-2 rounded-md font-medium hover:bg-[#45c76c] transition" to={'/dashboard'}>Dashboard</Link>
                        </div>
                    ) : (
                        <>
                            <Link to={'/login'}>
                                <button className="bg-[#55d87a] px-4 py-2 rounded-md font-medium hover:bg-[#45c76c] transition">
                                    Log In
                                </button>
                            </Link>

                            <Link to={'/register'}>
                                <button className="bg-[#55d87a] px-4 py-2 rounded-md font-medium hover:bg-[#45c76c] transition border-2 border-[#142b0a]">
                                    Sign In
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

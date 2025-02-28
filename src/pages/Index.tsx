import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#080c16] text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Kolabz</h1>
      <p className="text-lg mb-8">Your AI-powered prompt management tool.</p>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Login
        </Link>
        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Sign Up
        </Link>
        <Link to="/user-dashboard" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Index;


import { Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link to="/" className="mb-8 inline-block">
          <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            Kolabz
          </span>
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="relative z-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <AuthForm mode="login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

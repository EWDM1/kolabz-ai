
import { Link } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/components/LanguageContext";

const Signup = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link to="/" className="mb-8 inline-block">
          <img 
            src="/lovable-uploads/69364710-57d5-42d2-b6ca-740993198589.png" 
            alt="Kolabz Icon" 
            className="h-16" 
          />
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="relative z-10 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <AuthForm mode="signup" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

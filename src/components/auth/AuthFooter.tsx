
import React from "react";

interface AuthFooterProps {
  mode: "login" | "signup";
}

export const AuthFooter = ({ mode }: AuthFooterProps) => {
  return (
    <div className="text-center text-sm">
      {mode === "login" ? (
        <p>
          Don't have an account?{" "}
          <a href="/signup" className="text-primary hover:text-primary/90">
            Sign up
          </a>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:text-primary/90">
            Sign in
          </a>
        </p>
      )}
    </div>
  );
};

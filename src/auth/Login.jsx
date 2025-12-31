import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { WebData } from "../contextApi/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { setUser } = useContext(WebData);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const data = await API({
        url: "/auth/login",
        method: "POST",
        data: values,
      });

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#083b4a] overflow-hidden relative font-sans">
      
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="absolute inset-0 z-0 hidden md:block"
        style={{
          backgroundImage: "url('https://accentra.co.uk/wp-content/uploads/2015/08/accentra-business-software-solutions1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#083b4a] via-[#083b4a]/70 to-transparent z-1" />

      {/* LOGIN CONTENT AREA */}
      <div className="w-full md:w-[50%] flex items-center justify-center p-6 z-10">
        <motion.div
          // ANIMATION: Starts from left (-100px) and fades in
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl"
        >
          {/* Logo Section */}
          <div className="p-6 flex justify-center border-b border-white/10">
            <img
              src="https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/logo-slogan.svg"
              alt="Accentra Logo"
              className="h-12 brightness-0 invert" 
            />
          </div>

          {/* Form Section */}
          <div className="p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
              <p className="text-white/80 font-medium mt-2">Sign in to your dashboard</p>
            </div>

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="relative group">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email .company.com"
                      className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                    />
                  </div>

                  <div className="relative group">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-4 text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative min-w-[140px] border-2 border-white text-white font-bold py-2.5 px-8 rounded-lg hover:bg-white hover:text-[#083b4a] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3 text-current" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-12 text-center border-t border-white/10 pt-6">
              <p className="text-sm text-white/50">
                Don't have an account?{" "}
                <Link to="/register" className="text-white hover:underline font-bold underline-offset-4">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
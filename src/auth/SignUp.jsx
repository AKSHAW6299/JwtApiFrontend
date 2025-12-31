import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { API } from "../utils/Apis";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await API({
        url: "/auth/register",
        method: "POST",
        data: values,
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#083b4a] overflow-hidden relative font-sans">
      
      {/* BACKGROUND IMAGE LAYER - Same as Login */}
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

      {/* SIGNUP CONTENT AREA */}
      <div className="w-full md:w-[50%] flex items-center justify-center p-6 z-10">
        <motion.div
          // Slide in from left to right on render
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl"
        >
          {/* Logo Section - Fully Transparent */}
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
              <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
              <p className="text-white/80 font-medium mt-2">Start managing your dashboard</p>
            </div>

            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  {/* Name Field */}
                  <div className="relative group">
                    <Field
                      name="name"
                      placeholder="Full Name"
                      className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="relative group">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                    />
                  </div>

                  {/* Password Field */}
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

                  {/* Submit Button with Spinner */}
                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative min-w-[160px] border-2 border-white text-white font-bold py-2.5 px-8 rounded-lg hover:bg-white hover:text-[#083b4a] transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3 text-current" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Creating...</span>
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            {/* Footer Link */}
            <div className="mt-10 text-center border-t border-white/10 pt-6">
              <p className="text-sm text-white/50">
                Already have an account?{" "}
                <Link to="/login" className="text-white hover:underline font-bold underline-offset-4">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
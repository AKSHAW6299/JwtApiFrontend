import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Accentra Technologies?",
    answer: "Accentra Technologies is an enterprise software powerhouse specializing in financial, payroll, and business process solutions. Since 1979, we've helped businesses navigate complex regulatory landscapes with ease.",
  },
  {
    question: "When was Accentra founded?",
    answer: "Founded in 1979, Accentra stands as a pioneer in the industry, boasting over four decades of stability and expertise in enterprise accounting and payroll systems.",
  },
  {
    question: "What industries does Accentra serve?",
    answer: "Our ecosystem supports a diverse range of sectors, including general trading, payroll bureaus, accountants, umbrella companies, and large-scale enterprises across the UK and beyond.",
  },
  {
    question: "When did Accentra move to cloud-based solutions?",
    answer: "We embraced the future in 2015, launching our flagship cloud-native platform, Primo Payroll, to provide real-time accessibility and automated HMRC compliance.",
  },
  {
    question: "Where are Accentra’s offices located?",
    answer: "We maintain a global footprint with four strategic hubs—two in the United Kingdom and two in India—providing 24/7 delivery capabilities and expert support.",
  },
];

const FaqItem = ({ faq, isOpen, toggle }) => {
  return (
    <div className={`transition-all duration-300 rounded-2xl mb-4 ${isOpen ? 'bg-white shadow-xl shadow-blue-900/5 ring-1 ring-blue-500/10' : 'bg-transparent border border-gray-100'}`}>
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
      >
        <span className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-blue-600' : 'text-gray-700'}`}>
          {faq.question}
        </span>
        
        {/* Modern Animated Chevron */}
        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-400 rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-500 leading-relaxed text-sm md:text-base border-t border-gray-50 pt-4 mx-2">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-slate-50/50 py-20 px-4 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Modern Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-600 font-bold tracking-[0.2em] text-[10px] uppercase block mb-3"
          >
            Help Center
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h1>
          <div className="h-1.5 w-12 bg-blue-600 mx-auto rounded-full mt-6 mb-4"></div>
        </div>

        {/* FAQ List */}
        <div className="relative">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FaqItem 
                faq={faq} 
                isOpen={activeIndex === index} 
                toggle={() => setActiveIndex(activeIndex === index ? null : index)} 
              />
            </motion.div>
          ))}
        </div>

        {/* Subtle Footer Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm">
            Still have questions? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Contact our support team</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Faq;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Accentra Technologies?",
    answer:
      "Accentra Technologies is an enterprise software company specializing in financial, payroll, and business process solutions since 1979.",
  },
  {
    question: "When was Accentra founded?",
    answer:
      "Accentra was founded in 1979 and is one of the pioneers in enterprise accounting and payroll software.",
  },
  {
    question: "What industries does Accentra serve?",
    answer:
      "Accentra serves general trading businesses, payroll bureaus, accountants, umbrella companies, and large enterprises.",
  },
  {
    question: "When did Accentra move to cloud-based solutions?",
    answer:
      "Accentra introduced cloud-based payroll and enterprise solutions in 2015 with the launch of Primo Payroll.",
  },
  {
    question: "Where are Accentra’s offices located?",
    answer:
      "Accentra operates from two offices in the UK and two offices in India, ensuring global delivery and support.",
  },
  {
    question: "What makes Accentra different?",
    answer:
      "Accentra combines decades of industry expertise, compliance-driven design, and continuous innovation in enterprise software.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) =>
    setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-2">
          Learn more about Accentra Technologies
        </p>
      </motion.div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-gray-200 rounded-lg bg-white shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none"
            >
              <span className="font-medium text-gray-900">
                {faq.question}
              </span>
              <span className="text-xl font-bold">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

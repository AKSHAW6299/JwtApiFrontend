import React, { useState } from "react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Primo PSC",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primopsc.svg",
    tagline: "Personal Services Company solution for accountants",
    description:
      "A simple, elegant PSC platform powered by enterprise-grade payroll and financial engines.",
    benefits: [
      "Accountant-focused design",
      "Enterprise-ready core",
      "Compliance driven",
    ],
    link: "https://accentra.co.uk/products/personal-service-company-software/",
  },
  {
    name: "Primo Payroll",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primopayroll.svg",
    tagline: "The UK’s first fully automated Auto-Enrolment Payroll Software",
    description:
      "A powerful online payroll system offering total control, HMRC compliance, RTI, P6/P9 notifications and a unique auto-enrolment solution.",
    benefits: [
      "Fully automated payroll",
      "Instant setup with flexibility",
      "Online support & compliance",
    ],
    link: "https://primopayroll.co.uk/pricing",
  },
  {
    name: "Solus PSC",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/soluspsc.svg",
    tagline: "A Personal Services Company platform with a different perspective",
    description:
      "An intelligent platform enabling Umbrella Companies to switch to PSC models without compromising compliance or control.",
    benefits: [
      "Powerful accountant interface",
      "Run thousands of PSCs with small teams",
      "Integrated contractor messaging",
    ],
    link: "https://soluspsc.co.uk/pricing",
  },
  {
    name: "Primo Books",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primobooks.svg",
    tagline: "A modern suite of financial ledgers",
    description:
      "An online accounting and invoicing suite built on decades of financial and technology expertise.",
    benefits: ["Flexible accounting", "Powerful invoicing", "Modern UI"],
    link: "https://accentra.co.uk/products/accounting-and-invoicing-software/",
  },
  {
    name: "Primo Business",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primobusiness.svg",
    tagline: "Modern technology at its best",
    description:
      "A comprehensive suite of business modules designed to transform operational efficiency.",
    benefits: [
      "Business automation",
      "Modern modular architecture",
      "Scalable enterprise controls",
    ],
    link: "https://accentra.co.uk/products/business-software/",
  },
  {
    name: "Primo Time",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primotime.svg",
    tagline: "Secure online Pay & Bill solution for recruitment businesses",
    description:
      "A workflow-driven solution ensuring contractors are paid and clients billed accurately every week.",
    benefits: [
      "Timesheet & PAYE modules",
      "Candidate & client portals",
      "Front-office integrations",
    ],
    link: "https://primotime.co.uk/",
  },
  {
    name: "Primo Umbrella",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primoumbrella.svg",
    tagline: "Online Umbrella Payroll Solution",
    description:
      "A complete umbrella payroll & financial system from timesheets to balance sheets.",
    benefits: [
      "Timesheet to balance sheet flow",
      "Quick setup & pay-as-you-go",
      "Integrated financial module",
    ],
    link: "https://primoumbrella.co.uk/pricing/",
  },
];

const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          Our Products
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded mb-4"></div>
        <p className="text-gray-600 text-lg">
          Software that gives your business a competitive edge
        </p>
      </motion.div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 80 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 hover:scale-105 p-6 flex flex-col"
          >
            {/* Logo */}
            <div className="h-16 mb-4 flex justify-center items-center">
              <img
                src={product.logo}
                alt={product.name}
                className="h-full w-auto object-contain"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-2">
              {product.name}
            </h2>

            {product.tagline && (
              <p className="text-blue-600 font-medium mt-1">{product.tagline}</p>
            )}

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Expandable Benefits */}
            <div className="mt-4 flex-1">
              <button
                onClick={() => toggleExpand(index)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 flex items-center gap-1 focus:outline-none"
              >
                Business Benefits
                <span
                  className={`transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {expandedIndex === index && (
                <ul className="text-sm text-gray-700 list-disc list-inside mt-2">
                  {product.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Visit Website Button */}
            {product.link && (
              <a
                href={product.link}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-block text-center py-2 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Visit Website
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;

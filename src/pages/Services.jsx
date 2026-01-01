import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    name: "Primo Books",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primobooks.svg",
    tagline: "Modern financial ledgers",
    description: "An online accounting and invoicing suite built on financial expertise.",
    link: "https://accentra.co.uk/products/accounting-and-invoicing-software/",
  },
  {
    name: "Primo Payroll",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primopayroll.svg",
    tagline: "Automated Payroll",
    description: "The UK’s first fully automated Auto-Enrolment Payroll Software.",
    link: "https://primopayroll.co.uk/pricing",
  },
  {
    name: "Primo Business",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primobusiness.svg",
    tagline: "Modern Technology",
    description: "Comprehensive modules designed to transform operational efficiency.",
    link: "https://accentra.co.uk/products/business-software/",
  },
  {
    name: "Primo PSC",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primopsc.svg",
    tagline: "Accountant Solution",
    description: "An elegant PSC platform powered by enterprise-grade payroll engines.",
    link: "https://accentra.co.uk/products/personal-service-company-software/",
  },
  {
    name: "Primo Umbrella",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primoumbrella.svg",
    tagline: "Umbrella Payroll",
    description: "A complete umbrella payroll system from timesheets to balance sheets.",
    link: "https://primoumbrella.co.uk/pricing/",
  },
  {
    name: "Primo Time",
    logo: "https://accentra.co.uk/wp-content/themes/accentra-2015/accentra/assets/img/logos/primotime.svg",
    tagline: "Secure Pay & Bill",
    description: "Workflow solution ensuring contractors are paid accurately.",
    link: "https://primotime.co.uk/",
  }
];

const ProductCircle = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative aspect-square w-full max-w-[340px] md:max-w-[380px] mx-auto group"
    >
      {/* Glow Aura */}
      <div className={`absolute inset-0 rounded-full transition-all duration-700 blur-3xl opacity-30 ${isHovered ? 'bg-blue-400' : 'bg-transparent'}`} />

      {/* Main Circle Container */}
      <div className={`relative h-full w-full rounded-full bg-white border border-gray-100 shadow-xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 p-12 text-center ${isHovered ? 'border-blue-400 scale-105 ring-8 ring-blue-50' : ''}`}>
        
        {/* Animated Inner Ring */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-4 border border-blue-100 rounded-full border-dashed"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Logo with increased bottom margin for spacing */}
          <motion.div 
            animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -10 : 0 }}
            className="h-14 mb-8"
          >
            <img src={product.logo} alt={product.name} className="h-full w-auto object-contain" />
          </motion.div>

          <h3 className="text-xl font-extrabold text-gray-900 mb-2 leading-tight">
            {product.name}
          </h3>

          {/* Reserved space for content to ensure the circle doesn't "jitter" */}
          <div className="min-h-[100px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isHovered ? (
                <motion.p
                  key="tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-blue-600 text-xs font-bold uppercase tracking-[0.15em]"
                >
                  {product.tagline}
                </motion.p>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-4"
                >
                  <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                    {product.description}
                  </p>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-600 text-white text-[10px] font-bold px-6 py-2 rounded-full shadow-lg shadow-blue-200 uppercase tracking-widest"
                  >
                    Details
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section className="bg-slate-50 py-24 px-8">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
          Our Products
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Hover over our circular ecosystem to learn about our specialized software solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-12">
        {products.map((product, index) => (
          <ProductCircle key={product.name} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Services;
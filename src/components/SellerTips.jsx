import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tips = [
  "Update your inventory daily to maintain accurate stock levels",
  "Respond to customer queries promptly to improve satisfaction",
  "Highlight seasonal products to boost sales",
  "Offer discounts to attract new customers",
  "Use high-quality images for your product listings"
];

export default function SellerTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-agri-green text-white p-3">
      <h2 className="font-bold text-base mb-1">Seller Tips</h2>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentTipIndex}
          className="text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {tips[currentTipIndex]}
        </motion.p>
      </AnimatePresence>
      <div className="flex justify-center mt-1">
        {tips.map((_, index) => (
          <motion.span
            key={index}
            className={`block h-1.5 w-1.5 bg-white rounded-full mx-1 ${index === currentTipIndex ? 'opacity-100' : 'opacity-25'}`}
            whileHover={{ scale: 1.2 }}
          ></motion.span>
        ))}
      </div>
    </div>
  );
}

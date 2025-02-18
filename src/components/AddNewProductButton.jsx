import React from 'react'
import { FiPlusCircle } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function AddNewProductButton() {
  return (
    <motion.button
      className="bg-agri-green text-white py-1.5 rounded-lg shadow-md flex items-center justify-center space-x-1 hover:bg-green-700 transition-colors w-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <FiPlusCircle className="text-base" />
      <span className="font-bold text-sm">Add New Product</span>
    </motion.button>
  );
}

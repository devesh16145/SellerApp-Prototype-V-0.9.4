import React from 'react'
import { motion } from 'framer-motion'

export default function DashboardMetrics() {
  return (
    <motion.div
      className="bg-white p-2 rounded-lg shadow-md grid grid-cols-3 gap-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="text-center">
        <h3 className="text-lg font-bold text-agri-green">12</h3>
        <p className="text-xxs text-gray-600">Today's Orders</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-agri-green">45</h3>
        <p className="text-xxs text-gray-600">Active Products</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-agri-green">₹25K</h3>
        <p className="text-xxs text-gray-600">Revenue</p>
      </div>
    </motion.div>
  );
}

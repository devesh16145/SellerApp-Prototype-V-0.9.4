import React from 'react';
import { motion } from 'framer-motion';
import { FiHome, FiList, FiPackage } from 'react-icons/fi';

export default function BottomNav({ setActivePage, activePage }) {
  return (
    <motion.nav
      className="fixed bottom-0 left-0 w-full bg-white shadow-top p-2 flex justify-around items-center z-50"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <NavItem
        icon={<FiHome />}
        text="Home"
        onClick={() => setActivePage('home')}
        isActive={activePage === 'home'}
      />
      <NavItem
        icon={<FiList />}
        text="Orders"
        onClick={() => setActivePage('orders')}
        isActive={activePage === 'orders'}
      />
      <NavItem
        icon={<FiPackage />}
        text="Products"
        onClick={() => setActivePage('products')}
        isActive={activePage === 'products'}
      />
    </motion.nav>
  );
}

const NavItem = ({ icon, text, onClick, isActive }) => (
  <motion.button
    className={`flex flex-col items-center justify-center space-y-1 p-2 rounded-lg hover:bg-agri-gray ${
      isActive ? 'text-agri-green' : 'text-gray-500'
    }`}
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-xs font-medium">{text}</span>
  </motion.button>
);

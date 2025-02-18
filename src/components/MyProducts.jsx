import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { myProducts } from '../data/myProducts';
import { FiSearch, FiX } from 'react-icons/fi';

export default function MyProducts() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All'); // You can decide if tabs are needed for products
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10); // Default items per page

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = myProducts.filter(product => {
    const query = searchQuery.toLowerCase();
    return product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query); // Example search criteria
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setProductsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-lg">My Products</h2>
        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-l-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-agri-green"
              />
              <button onClick={toggleSearch} className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-r-lg px-3 py-1">
                <FiX className="text-sm" />
              </button>
            </div>
          ) : (
            <button onClick={toggleSearch} className="bg-agri-green hover:bg-green-700 text-white rounded-full p-2">
              <FiSearch className="text-sm" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs - decide if you need tabs for products, if not, remove this section */}
      {/* <div className="flex border-b border-gray-100">
        {['All', 'Category 1', 'Category 2', 'Category 3'].map(tab => ( // Example tabs
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab ? 'text-agri-green border-b-2 border-agri-green' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div> */}

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> {/* Grid layout for products */}
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-3 border-t border-gray-100">
        <div>
          <span className="text-sm text-gray-700">
            Items per page:
          </span>
          <select
            className="ml-2 p-1 border border-gray-300 rounded-md text-sm focus:ring-agri-green focus:border-agri-green"
            value={productsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l disabled:opacity-50 text-sm"
          >
            Previous
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r disabled:opacity-50 text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

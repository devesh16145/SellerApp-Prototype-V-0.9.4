import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { products } from '../data/products';
import { myProducts } from '../data/myProducts';
import { orders } from '../data/myOrders';

const appSections = [
  { name: 'Home', path: 'home' },
  { name: 'My Orders', path: 'orders' },
  { name: 'My Products', path: 'products' },
  { name: 'Profile', path: 'profile' },
  { name: 'Account Details', path: 'accountDetails', parent: 'Profile' },
  { name: 'Address Details', path: 'addressDetails', parent: 'Profile' },
  { name: 'My Bills', path: 'myBills', parent: 'Profile' },
  { name: 'Order Summary Stats', path: 'orderSummaryStats', parent: 'Profile' },
  { name: 'Seller Support', path: 'sellerSupport', parent: 'Profile' },
  { name: 'Privacy Policy', path: 'privacyPolicy', parent: 'Profile' },
  { name: 'Terms & Conditions', path: 'termsCondition', parent: 'Profile' },
  { name: 'Preferences', path: 'preferences', parent: 'Profile' },
  { name: 'Refer App', path: 'referApp', parent: 'Profile' },
  { name: 'My Statements', path: 'myStatements', parent: 'Profile' },
  { name: 'Seller Score', path: 'sellerScore', parent: 'Profile' },
];

export default function GlobalSearchPanel({ onSearch, setActivePage }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (query) {
      setIsPanelOpen(true);
    } else {
      setIsPanelOpen(false);
      setSearchResults([]);
    }
  }, [query]);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      performSearch(searchQuery.toLowerCase());
    } else {
      setSearchResults([]);
    }
  };

  const performSearch = (searchQuery) => {
    let results = [];

    // Search in Orders
    orders.forEach(order => {
      if (order.orderId.toLowerCase().includes(searchQuery)) {
        results.push({
          type: 'Order',
          title: order.orderId,
          path: 'orders',
          description: `Order ID: ${order.orderId}`,
        });
      }
      order.items.forEach(item => {
        if (item.name.toLowerCase().includes(searchQuery)) {
          results.push({
            type: 'Product in Order',
            title: item.name,
            path: 'orders',
            description: `Product "${item.name}" in Order ID: ${order.orderId}`,
          });
        }
      });
    });

    // Search in My Products
    myProducts.forEach(product => {
      if (product.name.toLowerCase().includes(searchQuery)) {
        results.push({
          type: 'My Product',
          title: product.name,
          path: 'products',
          description: `Product Name: ${product.name}`,
        });
      }
    });

    // Search in Top Selling Products (products data)
    products.forEach(product => {
      if (product.name.toLowerCase().includes(searchQuery)) {
        results.push({
          type: 'Product',
          title: product.name,
          path: 'home', // Assuming 'home' is where top selling products are listed
          description: `Top Selling Product: ${product.name}`,
        });
      }
    });

    // Search in App Sections and Pages
    appSections.forEach(section => {
      if (section.name.toLowerCase().includes(searchQuery)) {
        results.push({
          type: 'Section/Page',
          title: section.name,
          path: section.path,
          description: section.parent ? `Page in ${section.parent} section` : `Main Section`,
        });
      }
    });

    setSearchResults(results);
  };


  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    setIsPanelOpen(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleNavigation = (path) => {
    setActivePage(path);
    clearSearch();
  };


  return (
    <div className="bg-white p-3 border-b border-gray-100 relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products, orders, sections, pages..."
            value={query}
            onChange={handleSearchChange}
            onFocus={() => setQuery(query)} // Keep panel open on focus if there's a query
            className="w-full pl-10 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-agri-green focus:ring-1 focus:ring-agri-green"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX className="text-sm" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Panel */}
      {isPanelOpen && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-10 max-h-96 overflow-y-auto">
          <ul>
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleNavigation(result.path)}
              >
                <div className="font-semibold text-sm">{result.title}</div>
                <div className="text-gray-500 text-xs">{result.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isPanelOpen && searchResults.length === 0 && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-10">
          <div className="p-3 text-center text-gray-500">
            No results found for "{query}"
          </div>
        </div>
      )}
    </div>
  );
}

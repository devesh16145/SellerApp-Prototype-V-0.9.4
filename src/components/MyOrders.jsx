import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const orders = [
  {
    id: 1,
    orderId: "#ORD-2024-001",
    customer: "Rajesh Kumar",
    status: "New",
    items: [
      { name: "Organic Fertilizer 5kg", quantity: 2 },
      { name: "Hybrid Wheat Seeds", quantity: 1 }
    ],
    totalAmount: 2497,
    timeLeft: 1800, // 30 minutes in seconds
    orderDate: "2024-03-15"
  },
  {
    id: 2,
    orderId: "#ORD-2024-002",
    customer: "Priya Sharma",
    status: "Pending",
    items: [
      { name: "Pesticide Sprayer", quantity: 1 },
      { name: "Soil Testing Kit", quantity: 1 }
    ],
    totalAmount: 2398,
    timeLeft: 900, // 15 minutes
    orderDate: "2024-03-14"
  },
  {
    id: 3,
    orderId: "#ORD-2024-003",
    customer: "Amit Patel",
    status: "Shipped",
    items: [
      { name: "Gardening Gloves", quantity: 3 },
      { name: "Water Sprinkler", quantity: 2 }
    ],
    totalAmount: 2595,
    timeLeft: 0, // No timer
    orderDate: "2024-03-13"
  },
  {
    id: 4,
    orderId: "#ORD-2024-004",
    customer: "Sneha Reddy",
    status: "Delivered",
    items: [
      { name: "Organic Fertilizer 5kg", quantity: 1 },
      { name: "Hybrid Wheat Seeds", quantity: 2 }
    ],
    totalAmount: 3197,
    timeLeft: 0, // No timer
    orderDate: "2024-03-12"
  },
  {
    id: 5,
    orderId: "#ORD-2024-005",
    customer: "Lakshmi Menon",
    status: "New",
    items: [
      { name: "Neem Oil", quantity: 1 },
      { name: "Coco Peat", quantity: 2 }
    ],
    totalAmount: 1950,
    timeLeft: 1200, // 20 minutes
    orderDate: "2024-03-16"
  },
  {
    id: 6,
    orderId: "#ORD-2024-006",
    customer: "Vikram Singh",
    status: "Pending",
    items: [
      { name: "Pruning Shears", quantity: 1 },
      { name: "Seed Tray", quantity: 3 }
    ],
    totalAmount: 1475,
    timeLeft: 600, // 10 minutes
    orderDate: "2024-03-15"
  },
  {
    id: 7,
    orderId: "#ORD-2024-007",
    customer: "Anjali Nair",
    status: "Shipped",
    items: [
      { name: "Watering Can", quantity: 1 },
      { name: "Planting Pots", quantity: 5 }
    ],
    totalAmount: 2250,
    timeLeft: 0,
    orderDate: "2024-03-14"
  },
  {
    id: 8,
    orderId: "#ORD-2024-008",
    customer: "Rohan Verma",
    status: "Delivered",
    items: [
      { name: "Grow Bags", quantity: 2 },
      { name: "Vermicompost", quantity: 1 }
    ],
    totalAmount: 2800,
    timeLeft: 0,
    orderDate: "2024-03-13"
  },
  {
    id: 9,
    orderId: "#ORD-2024-009",
    customer: "Deepika Rao",
    status: "New",
    items: [
      { name: "Bone Meal Fertilizer", quantity: 2 },
      { name: "Rock Phosphate", quantity: 1 }
    ],
    totalAmount: 2620,
    timeLeft: 2100, // 35 minutes
    orderDate: "2024-03-17"
  },
  {
    id: 10,
    orderId: "#ORD-2024-010",
    customer: "Manish Gupta",
    status: "Pending",
    items: [
      { name: "Hand Trowel", quantity: 1 },
      { name: "Hand Fork", quantity: 1 }
    ],
    totalAmount: 980,
    timeLeft: 300, // 5 minutes
    orderDate: "2024-03-16"
  },
  {
    id: 11,
    orderId: "#ORD-2024-011",
    customer: "Shweta Iyer",
    status: "Shipped",
    items: [
      { name: "Hose Pipe", quantity: 1 },
      { name: "Spray Nozzle", quantity: 1 }
    ],
    totalAmount: 1750,
    timeLeft: 0,
    orderDate: "2024-03-15"
  },
  {
    id: 12,
    orderId: "#ORD-2024-012",
    customer: "Vivek Joshi",
    status: "Delivered",
    items: [
      { name: "Garden Shovel", quantity: 1 },
      { name: "Rake", quantity: 1 }
    ],
    totalAmount: 3300,
    timeLeft: 0,
    orderDate: "2024-03-14"
  },
];


const Timer = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  if (timeLeft <= 0) {
    return <span className="text-white text-xs font-bold">Time's up!</span>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return (
    <span className="text-white text-xs font-bold">{formattedTime}</span>
  );
};

export default function MyOrders() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const handleAccept = (orderId) => {
    console.log(`Accepting order: ${orderId}`);
  };

  const handlePack = (orderId) => {
    console.log(`Packing order: ${orderId}`);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) {
      setSearchQuery('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter(order => {
    const query = searchQuery.toLowerCase();
    const itemMatch = order.items.some(item => item.name.toLowerCase().includes(query));
    const orderIdMatch = order.orderId.toLowerCase().includes(query);
    const statusMatch = activeTab === 'All' || order.status === activeTab;
    return statusMatch && (itemMatch || orderIdMatch);
  });

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

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

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-3 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-bold text-lg">My Orders</h2>
        <div className="flex items-center space-x-2">
          {searchOpen ? (
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search orders..."
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

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {['All', 'New', 'Pending', 'Shipped', 'Delivered'].map(tab => (
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
      </div>

      <div className="p-3 space-y-3"> {/* Vertical list container */}
        {paginatedOrders.map(order => (
          <div key={order.id} className="bg-agri-gray rounded-lg relative">
            {(order.status === "New" || order.status === "Pending") && (
              <div className="absolute top-0 left-0 w-full h-8 bg-red-600 flex items-center justify-between px-3 rounded-t-lg">
                <span className="text-[0.7rem] text-white">Time Left to Pack Order:</span>
                <div className='flex items-center gap-2'>
                  <Timer seconds={order.timeLeft} />
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="2"/>
                    <line x1="10" y1="10" x2="10" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="10" y1="10" x2="4" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" className="animate-clock-minute"/>
                  </svg>
                </div>
              </div>
            )}

            <div className="p-3 pt-10 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm">{order.orderId}</div>
                  <div className="text-xs text-gray-500">{order.orderDate}</div>
                </div>
                <span className={`inline-block ${getStatusBgColor(order.status)} text-white text-[0.6rem] px-2 py-0.5 rounded-full font-semibold`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium text-xs">{item.name}</span>
                    <span className="text-[0.65rem] text-gray-500 ml-2">x {item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Total:</span>
                  <span className="text-xs font-semibold">₹{order.totalAmount}</span>
                </div>
                {order.status !== "Shipped" && (
                  <>
                    {order.status === "New" && (
                      <button
                        onClick={() => handleAccept(order.orderId)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Accept
                      </button>
                    )}
                    {order.status !== "New" && order.status !== "Delivered" && (
                      <button
                        onClick={() => handlePack(order.orderId)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded text-xs"
                      >
                        Pack
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center p-3 border-t border-gray-100">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

const getStatusBgColor = (status) => {
  switch (status) {
    case "New":
      return "bg-green-500";
    case "Pending":
      return "bg-orange-500";
    case "Shipped":
      return "bg-blue-500";
    case "Delivered":
      return "bg-gray-500";
    default:
      return "bg-gray-400";
  }
};

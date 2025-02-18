import React, { useState, useEffect } from 'react';

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

export default function RecentOrders() {
  const handleAccept = (orderId) => {
    console.log(`Accepting order: ${orderId}`);
  };

  const handlePack = (orderId) => {
    console.log(`Packing order: ${orderId}`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <h2 className="font-bold text-lg p-3 border-b border-gray-100">Recent Orders</h2>
      <div className="flex overflow-x-auto p-3 space-x-3">
        {orders.map(order => (
          <div key={order.id} className="min-w-[280px] bg-agri-gray rounded-lg relative">

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

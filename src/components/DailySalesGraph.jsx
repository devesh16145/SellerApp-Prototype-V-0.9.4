import React from 'react';

const DailySalesGraph = () => {
  // 15 days of dummy sales data
  const salesData = [5, 12, 8, 15, 10, 18, 22, 14, 9, 11, 16, 20, 7, 13, 19];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Not used for display, but kept for potential future use

  console.log("Sales Data:", salesData);

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#366532' }}>Daily Sales (Last 15 Days)</h2>
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '100px' }}>
        {salesData.map((sales, index) => {
          const barHeight = sales * 5; // Simple scaling
          console.log(`Bar ${index}: Height = ${barHeight}`);

          return (
            <div
              key={index}
              style={{
                width: '20px',
                height: `${barHeight}px`,
                backgroundColor: '#366532',
                marginRight: '5px',
              }}
            >
              {/* No text labels for now */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailySalesGraph;

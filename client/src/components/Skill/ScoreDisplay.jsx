import React from 'react';
function Speaking({ scores }) {
  console.log("Scores passed to Speaking component:", scores);
  return (
    <div className="App flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Overall Band Score</h3>
        <div className="space-y-3">
          {Object.entries(scores).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-2 border-b border-gray-200 last:border-b-0">
              <span className="font-semibold text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
              <span className={`font-bold text-lg ${value === 'N/A' ? 'text-gray-400' : 'text-gray-900'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Speaking;
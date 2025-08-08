
import React from "react";

const Loader = () => {
  return (
     
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <span className="absolute inline-block w-full h-full rounded-full border-4 border-gray-300 border-t-gray-900 animate-spin"></span>
        <span className="absolute inline-block w-10 h-10 rounded-full border-2 border-gray-400 border-t-gray-700 animate-spin-slow"></span>
        <span className="absolute w-4 h-4 bg-gray-900 rounded-full shadow-lg animate-pulse"></span>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.6s ease; }
        .animate-spin-slow { animation: spin 2.2s linear infinite; }
      `}</style>
    </div>
  );


};

export default Loader;

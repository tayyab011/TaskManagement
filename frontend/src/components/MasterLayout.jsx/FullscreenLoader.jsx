import React from 'react';


const FullscreenLoader = () => {

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-300 bg-opacity-50 `}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-700"></div>
      </div>
    );
};

export default FullscreenLoader;
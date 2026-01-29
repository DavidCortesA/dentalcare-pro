
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full border-t-dental-blue animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-dental-blue">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingPage;

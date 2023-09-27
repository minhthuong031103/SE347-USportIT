import React from 'react';

function layout({ children }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
}

export default layout;

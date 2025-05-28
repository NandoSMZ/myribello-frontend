import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 px-4 border-t border-amber-900/30 mt-auto">
      <p className="text-amber-500 mb-1">
        <span className="font-bold text-amber-400">#ribello</span>
      </p>
      <p className="text-amber-400 text-sm">
        Contáctanos: <span className="font-semibold">+123 456 7890</span>
      </p>
    </footer>
  );
};

export default Footer;
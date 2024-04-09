import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-primary p-4 drop-shadow-lg">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <div className="text-accent text-lg font-bold"><Link href="/">Expense Calculator</Link></div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-primary-foreground hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/calculate" className="text-primary-foreground hover:text-gray-300">
              Calculate
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-primary-foreground hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
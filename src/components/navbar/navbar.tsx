import React from 'react';
import Link from 'next/link';
import { NavbarAuth } from './navbarAuth';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-600 p-4 drop-shadow-lg">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <div className="text-slate-50 text-lg font-bold"><Link href="/">Expense Calculator</Link></div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/" className="text-slate-50 hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-slate-50 hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <NavbarAuth/>
          </li>
        </ul>
      </div>
    </nav>
  );
};
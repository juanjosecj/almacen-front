"use client"; // porque usaremos eventos y navegación en cliente

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">OnClick</h1>
      
      <ul className="flex gap-6">
        <li>
          <Link href="/" className="hover:text-blue-400 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/general/login" className="hover:text-blue-400 transition">
            Login
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-blue-400 transition">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="flex-shrink-0">
              <Image
                src="/logo.svg"
                alt="ImageBlur Pro Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ImageBlur Pro</h1>
              <p className="text-sm text-gray-500">
                Advanced Image Editing Tool
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

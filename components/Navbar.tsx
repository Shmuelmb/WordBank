"use client";
import SignOutGoogle from "./SignOutGoogle";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex flex-wrap  items-center justify-between  bg-teal-500 p-6 ">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link href="/">WordBank</Link>
        </span>
      </div>
      <div className="w-full lg:flex lg:items-center md:w-auto lg:w-auto">
        <div className="flex flex-wrap flex-col lg:flex-row md:flex-row text-sm lg:flex-grow gap-3 ">
          <Link
            href="/word-bank"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            My Word Bank
          </Link>
          <Link
            href="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            About
          </Link>
          <SignOutGoogle />
        </div>
      </div>
    </nav>
  );
}

"use client";
import SignOutGoogle from "./SignOutGoogle";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          <Link href="/">WordBank</Link>
        </span>
      </div>
      <div className="block lg:hidden"></div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow gap-5 flex">
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
        </div>
        <div>
          <SignOutGoogle />
        </div>
      </div>
    </nav>
  );
}

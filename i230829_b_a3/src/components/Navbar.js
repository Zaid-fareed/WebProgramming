"use client";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between items-center py-2 px-4 bg-blue-500 shadow-lg rounded-lg mb-4">
      <div>
        <h1 className="text-xl font-bold text-white">PropertyCRM</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right text-black">
          <p className="text-sm font-medium">{session?.user?.name}</p>
          <p className="text-xs italic">{session?.user?.role}</p>
        </div>
        
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="text-sm border border-red-500 bg-red-500 text-white px-3 py-1 hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
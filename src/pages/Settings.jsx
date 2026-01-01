import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { WebData } from "../contextApi/AuthContext";
import { 
  FiEdit2, 
  FiTrash2, 
  FiLock, 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight 
} from "react-icons/fi";

// --- Sample Data ---
const initialUsers = [
  { id: 1, name: "Arjun Mehta", email: "arjun@accentra.io", role: "Manager", status: "Active", initial: "A", color: "bg-indigo-100 text-indigo-600" },
  { id: 2, name: "Sana Khan", email: "sana@accentra.io", role: "Developer", status: "Active", initial: "S", color: "bg-emerald-100 text-emerald-600" },
  { id: 3, name: "Leo Das", email: "leo@accentra.io", role: "Editor", status: "Inactive", initial: "L", color: "bg-amber-100 text-amber-600" },
  { id: 4, name: "Mina Sun", email: "mina@accentra.io", role: "Admin", status: "Active", initial: "M", color: "bg-rose-100 text-rose-600" },
];

const UserManagement = () => {
  // const { user } = useContext(WebData);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="p-6 lg:p-10 bg-[#FAFBFF] min-h-screen font-sans text-slate-900"
    >
      {/* 1. Top Header & Breadcrumbs */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 gap-2">
            <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
            <span>/</span>
            <span className="text-slate-900">User Management</span>
          </nav>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            System Users
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition active:scale-95">
            <FiLock className="text-blue-600" strokeWidth={2.5} />
            <span>Change Password</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition active:scale-95">
            <FiPlus strokeWidth={3} />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* 2. Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by name, email or role..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-slate-600 font-semibold border border-slate-100 rounded-xl hover:bg-slate-50 transition">
            <FiFilter />
            <span>Filters</span>
          </button>
          <button className="p-2.5 text-slate-400 border border-slate-100 rounded-xl hover:bg-slate-50 transition">
            <FiMoreVertical />
          </button>
        </div>
      </div>

      {/* 3. Main Table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">User Profile</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Role & Access</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Status</th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {initialUsers.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center font-black text-lg shadow-sm`}>
                        {item.initial}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-base">{item.name}</p>
                        <p className="text-xs font-medium text-slate-400">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{item.role}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Full Access</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.status === "Active" 
                        ? "bg-emerald-100 text-emerald-600" 
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === "Active" ? "bg-emerald-500" : "bg-slate-400"}`}></span>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end gap-3">
                      <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                        <FiEdit2 size={16} />
                      </button>
                      <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination Footer */}
        <div className="px-8 py-5 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-900 font-black">4</span> of <span className="text-slate-900 font-black">12</span> users
          </p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-blue-600 transition">
              <FiChevronLeft size={20} />
            </button>
            <button className="p-2 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-blue-600 transition">
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserManagement;
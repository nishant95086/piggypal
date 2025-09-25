import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import WishList from "../comp/wish-list";
import UdharList from "../comp/Udhar";
import ToDoList from "../comp/Todo";
import IncomeList from "../comp/income";
import ExpensesList from "../comp/ExpensesList";
import SavingList from "../comp/saving";
import { AuthContext } from "../context/AuthContext";
import { getDashboardSummary } from "../api/dashboardApi";
import { useNavigate } from "react-router-dom";
import { LogOut, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { logout, auth, setAuth } = useContext(AuthContext);
  const [summary, setSummary] = useState(null);
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  // Load auth from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth && !auth) setAuth(JSON.parse(savedAuth));
  }, [auth, setAuth]);

  // Fetch dashboard data
  const fetchDashboard = async () => {
    try {
      const res = await getDashboardSummary();
      if (res.data.success) {
        setSummary(res.data.summary);
        setDetails(res.data.details);
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const summaryCards = [
    {
      label: "Total Saving",
      value: summary?.totalSaving || 0,
      icon: "💰",
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-orange-700",
    },
    {
      label: "Total Udhar",
      value: summary?.totalUdhar || 0,
      icon: "🤝",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-red-700",
    },
    {
      label: "Wish's Price",
      value: summary?.totalWishAmount || 0,
      icon: "🎁",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      label: "Total Income",
      value: summary?.totalIncome || 0,
      icon: "💳",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
    {
      label: "Total Investment",
      value: summary?.totalInvestment || 0,
      icon: "📈",
      color: "bg-pink-50 border-pink-200",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center px-[10%] p-4 bg-white shadow-md sticky top-0 z-10">
        <div className="text-sm text-gray-600 mb-2 md:mb-0">
          Hello, <b className="font-bold">{auth?.user?.name || "User"}</b>!
          Here’s Your Dashboard
        </div>
        <h1 className="text-xl font-bold text-blue-600">
          Track Your Life & Money
        </h1>
        <p
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="text-red-500 cursor-pointer font-semibold mt-2 md:mt-0"
        >
          Log out
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col px-[10%] gap-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {summaryCards.map((card, i) => (
            <div
              key={i}
              className={`${card.color} border-2 rounded-xl p-4 transition-transform hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{card.icon}</span>
                <TrendingUp className={`w-5 h-5 ${card.textColor}`} />
              </div>
              <p className="text-sm text-gray-600 mb-1">{card.label}</p>
              <p className={`text-xl font-bold ${card.textColor}`}>
                ₹{card.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Wish & Saving Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <WishList
              data={details?.wishes || []}
              onDelete={async (id) => {
                setDetails((prev) => ({
                  ...prev,
                  wishes: prev.wishes.filter(w => w._id !== id)
                }));
                await fetchDashboard();
              }}
              onEdit={async (update) => {
                setDetails((prev) => ({
                  ...prev,
                  wishes: prev.wishes.map(w => w._id === update._id ? update : w)
                }));
                await fetchDashboard();
              }}
              onAdd={fetchDashboard}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SavingList
              data={details?.savings || []}
              onDelete={async (id) => {
                setDetails((prev) => ({
                  ...prev,
                  savings: prev.savings.filter(s => s._id !== id)
                }));
                await fetchDashboard();
              }}
              onEdit={async (update) => {
                setDetails((prev) => ({
                  ...prev,
                  savings: prev.savings.map(s => s._id === update._id ? update : s)
                }));
                await fetchDashboard();
              }}
              onAdd={fetchDashboard}
            />
          </motion.div>
        </div>

        {/* Udhar & ToDo Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <UdharList
              data={details?.udhars || []}
              onDelete={async (id) => {
                setDetails(prev => ({
                  ...prev,
                  udhars: prev.udhars.filter(u => u._id !== id)
                }));
                await fetchDashboard();
              }}
              onEdit={async (update) => {
                setDetails(prev => ({
                  ...prev,
                  udhars: prev.udhars.map(u => u._id === update._id ? update : u)
                }));
                await fetchDashboard();
              }}
              onAdd={fetchDashboard}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <ToDoList
              data={details?.todos || []}
              onDelete={fetchDashboard}
              onEdit={fetchDashboard}
              onAdd={fetchDashboard}
            />
          </motion.div>
        </div>

        {/* Income & Expenses Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <IncomeList
              data={details?.incomes || []}
              onDelete={async (id) => {
                setDetails(prev => ({
                  ...prev,
                  incomes: prev.incomes.filter(exp => exp._id !== id)
                }));
                await fetchDashboard();
              }}
              onEdit={async (update) => {
                setDetails(prev => ({
                  ...prev,
                  incomes: prev.incomes.map(exp => exp._id === update._id ? update : exp)
                }));
                await fetchDashboard();
              }}
              onAdd={fetchDashboard}
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <ExpensesList
              data={details?.investments || []}
              onDelete={async (id) => {
                setDetails(prev => ({
                  ...prev,
                  investments: prev.investments.filter(exp => exp._id !== id)
                }));
                await fetchDashboard();
              }}
              onEdit={async (update) => {
                setDetails(prev => ({
                  ...prev,
                  investments: prev.investments.map(exp => exp._id === update._id ? update : exp)
                }));
                await fetchDashboard();
              }}
              onAdd={fetchDashboard}
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 text-center md:text-left">
        
        {/* Quick Links */}
        <div className="flex flex-col gap-2 mb-6 md:mb-0">
          <span className="text-white font-semibold">Quick Links</span>
          <a
            href="javascript:void(0)"
            className="hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <p
            onClick={() => navigate("/change-password")}
            className="hover:text-white cursor-pointer transition-colors duration-200"
          >
            Change Password
          </p>
        </div>

        {/* Center Text */}
        <div className="mb-6 md:mb-0">
          <span className="text-white font-semibold">Welcome to PiggyPal 🐷</span>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <span className="text-white font-semibold">Contact</span>
          <a
            href="mailto:support@piggypal.com"
            className="hover:text-white transition-colors duration-200"
          >
            support@piggypal.com
          </a>
          <a
            href="tel:+919876543210"
            className="hover:text-white transition-colors duration-200"
          >
            +91 98765 43210
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Dashboard;

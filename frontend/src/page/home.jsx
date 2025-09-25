import React from "react";
import { ArrowRight, TrendingUp, PieChart, Heart, Shield, CheckCircle, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate= useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Savings",
      description: "Track your savings goals and monitor your progress with easy-to-use tools.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: PieChart,
      title: "Expense Tracking",
      description: "Keep tabs on your spending with detailed expense categories and insights.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Heart,
      title: "Wishlist Manager",
      description: "Save for the things you want with organized wishlists and target amounts.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    }
  ];

  const benefits = [
    "Easy expense tracking",
    "Savings goal management",
    "Wishlist organization",
    "Income monitoring"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10  flex items-center justify-center mr-3">
                <img src="https://i.ibb.co/yc73XPwm/Pink-Illustrated-Piggy-Bank-Logo.png" className=" rounded-2xl"></img>
              </div>
              <span className="text-xl font-bold text-gray-900">PiggyPal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Smart Way to Manage Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Money & Dreams</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Take control of your finances with PiggyPal. Track expenses, save for goals, 
              and manage your wishlist all in one simple dashboard.
            </p>

            {/* Benefits */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Right Visual - Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:rotate-1 transition-transform duration-500">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">₹</span>
                  </div>
                  <span className="font-semibold text-gray-800">Your Dashboard</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              {/* Mock Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="text-green-700 text-sm font-medium mb-1">Total Savings</div>
                  <div className="text-green-900 font-bold text-lg">₹25,000</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="text-blue-700 text-sm font-medium mb-1">Monthly Income</div>
                  <div className="text-blue-900 font-bold text-lg">₹45,000</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <div className="text-purple-700 text-sm font-medium mb-1">Expenses</div>
                  <div className="text-purple-900 font-bold text-lg">₹18,500</div>
                </div>
                <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                  <div className="text-pink-700 text-sm font-medium mb-1">Wishlist</div>
                  <div className="text-pink-900 font-bold text-lg">₹12,000</div>
                </div>
              </div>
              
              {/* Mock Chart Area */}
              <div className="h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-around px-4 pb-4">
                {[30, 50, 35, 70, 45, 80, 60].map((height, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t w-3"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 transform hover:scale-105 transition-transform">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <div className="text-sm font-semibold text-gray-800">+12%</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 transform hover:scale-105 transition-transform">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-blue-500 mr-2" />
                <div className="text-sm font-semibold text-gray-800">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need for
              <span className="text-blue-600"> smart money management</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple tools to help you save more, spend wisely, and achieve your financial goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
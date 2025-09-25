import React, { useState, useContext } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Home,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // clear error on typing
  };

  const validateForm = () => {
    if (!formData.email.trim()) return setError("Email is required"), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setError("Please enter a valid email address"), false;
    if (!formData.password) return setError("Password is required"), false;
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setError("");
    setSuccess("");

    const result = await login(formData.email, formData.password);

    if (result?.success) {
      setSuccess("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setError(result?.message || "Login failed. Please check your credentials.");
    }
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                   <img src="https://i.ibb.co/yc73XPwm/Pink-Illustrated-Piggy-Bank-Logo.png" className=" rounded-2xl"></img>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your PiggyPal account</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error/Success */}
              {error && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <p className="text-green-700 text-sm">{success}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center text-white transition-all ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign In
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>

              {/* Links */}
              <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
                <p className="text-center text-gray-600">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Create one now
                  </button>
                </p>
                <p className="text-center">
                  <button
                    onClick={() => navigate("/")}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <Home className="w-4 h-4 mr-1" />
                    Back to Home
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
                 
                   <img src="https://i.ibb.co/yc73XPwm/Pink-Illustrated-Piggy-Bank-Logo.png" className=" rounded-2xl"></img>
                
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h3>
                <p className="text-gray-600 max-w-xs">
                  Continue your journey to financial freedom with PiggyPal
                </p>
              </div>
              <div className="absolute top-8 left-8 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-500" />
              </div>
              <div className="absolute top-20 right-12 w-8 h-8 bg-green-400 rounded-full opacity-80"></div>
              <div className="absolute bottom-20 left-12 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Secure & <span className="text-blue-600">Trusted</span>
            </h2>
            <p className="text-gray-600 max-w-md">
              Your financial data is protected with bank-level security. Sign in
              safely and manage your money with confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

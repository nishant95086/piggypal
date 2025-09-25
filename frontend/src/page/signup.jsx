import React, { useState, useContext } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); 
  };

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    if (!formData.name.trim()) return setError("Name is required");
    if (!formData.email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setError("Enter a valid email");
    if (formData.password.length < 6)
      return setError("Password must be at least 6 characters");

    setIsLoading(true);
    const result = await signup(formData.name, formData.email, formData.password);

    if (result?.success) {
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1000);
    } else {
      setError(result?.message || "Signup failed");
    }
    setIsLoading(false);
  };

  // ✅ Password strength
  const passwordStrength = () => {
    const { password } = formData;
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const getStrengthColor = () => {
    const s = passwordStrength();
    if (s <= 1) return "bg-red-400";
    if (s === 2) return "bg-yellow-400";
    if (s === 3) return "bg-blue-400";
    return "bg-green-400";
  };

  const getStrengthText = () => {
    const s = passwordStrength();
    if (s <= 1) return "Weak";
    if (s === 2) return "Fair";
    if (s === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="relative">
            <div className="w-96 h-96 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <img src="https://i.ibb.co/yc73XPwm/Pink-Illustrated-Piggy-Bank-Logo.png" className=" rounded-2xl"></img>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Join PiggyPal
                </h3>
                <p className="text-gray-600 max-w-xs">
                  Start your journey to better financial management today
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">PiggyPal</span>
            </h2>
            <p className="text-gray-600 max-w-md">
              Join thousands of users already taking control of their finances.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                   <img src="https://i.ibb.co/yc73XPwm/Pink-Illustrated-Piggy-Bank-Logo.png" className=" rounded-2xl"></img>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Start managing your money smarter</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

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
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                    placeholder="Create a password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password strength bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Password strength:</span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength() <= 1
                            ? "text-red-500"
                            : passwordStrength() === 2
                            ? "text-yellow-500"
                            : passwordStrength() === 3
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getStrengthColor()} transition-all`}
                        style={{ width: `${(passwordStrength() / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Alerts */}
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

              {/* Button */}
              <button
                onClick={handleSignup}
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
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Create Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>

              {/* Link to login */}
              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

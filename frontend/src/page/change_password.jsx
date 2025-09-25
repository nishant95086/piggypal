import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { changePassword } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // Password strength functions
  const passwordStrength = () => {
    const { newPassword: password } = formData;
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

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");

    if (!formData.oldPassword) return setError("Old password is required");
    if (formData.newPassword.length < 6)
      return setError("New password must be at least 6 characters");
    if (formData.newPassword !== formData.confirmPassword)
      return setError("Passwords do not match");

    try {
      setIsLoading(true);

      // Map formData to backend expected keys
      const payload = {
        oldpassword: formData.oldPassword,
        newpassword: formData.newPassword,
      };

      const res = await changePassword(payload);

      // Backend returns { status: true, message: "..." }
      if (res?.status || res?.success) {
        setSuccess(res.message || "Password changed successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(res?.message || "Failed to change password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError(err?.message || "Error changing password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h1>
          <p className="text-gray-600">Update your account password</p>
        </div>

        <div className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Old Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showOld ? "text" : "password"}
                value={formData.oldPassword}
                onChange={(e) => handleInputChange("oldPassword", e.target.value)}
                placeholder="Enter old password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showOld ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showNew ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
                placeholder="Enter new password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Strength */}
            {formData.newPassword && (
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
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

          {/* Submit */}
          <button
            onClick={handleChangePassword}
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
                Changing Password...
              </div>
            ) : (
              <div className="flex items-center">
                Change Password
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

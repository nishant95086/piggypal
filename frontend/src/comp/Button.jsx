import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Utility: darken hex color for hover effect
function darkenColor(hex, percent = 15) {
  let num = parseInt(hex.replace("#", ""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

const CustomButton = ({
  label = "+ Add New", // Button text
  color = "#3B82F6", // Default Tailwind blue
  FormComponent, // Custom form component
  onAdd, // Callback after form submit
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hoverColor = darkenColor(color, 15);

  return (
    <div>
      {/* Add Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="px-6 py-2 mx-[5%] mt-2 cursor-pointer rounded-full w-[90%] text-white font-medium shadow-md transition-colors"
        style={{ backgroundColor: color }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = color)}
      >
        {label}
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0  flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
              >
                ✕
              </button>

              {/* Dynamic Form */}
              {FormComponent && (
                <FormComponent
                  onAdd={(data) => {
                    if (onAdd) onAdd(data);
                    setIsOpen(false);
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomButton;

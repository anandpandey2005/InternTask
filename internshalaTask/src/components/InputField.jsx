import React, { useState } from "react";

export default function InputField({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton,
  showPasswordToggle = false,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleClear = () => {
    setInputValue("");
    if (onChange) onChange({ target: { value: "" } });
  };

  const baseStyles =
    "rounded-lg shadow-sm focus:outline-none transition-all duration-300 ease-in-out w-full";

  const variantStyles =
    variant === "filled"
      ? "bg-gray-100 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-400"
      : variant === "outlined"
      ? "border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-500 dark:focus:border-blue-400"
      : "bg-transparent border-b border-gray-400 focus:border-blue-500 focus:ring-0 dark:border-gray-500 dark:focus:border-blue-400";

  const sizeStyles =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-4 py-3 text-lg"
      : "px-3 py-2 text-base";

  const disabledStyles = disabled
    ? "bg-gray-200 cursor-not-allowed opacity-70 dark:bg-gray-800"
    : "";
  const invalidStyles = invalid
    ? "border-red-500 focus:border-red-500 focus:ring-red-200 dark:border-red-400 dark:focus:border-red-400"
    : "";

  return (
    <div className="flex flex-col gap-1 w-80">
      {label && (
        <label className="text-sm font-semibold text-black">{label}</label>
      )}

      <div className="relative w-full">
        <input
          type={showPassword && type === "password" ? "text" : type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${invalidStyles} pr-12`}
        />

        {loading && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {showClearButton && !loading && inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute text-lg top-1/2 -translate-y-1/2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            ✕
          </button>
        )}

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`absolute text-lg top-1/2 -translate-y-1/2 ${
              showClearButton && inputValue ? "right-8" : "right-2"
            } text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white`}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {helperText && !invalid && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {helperText}
        </span>
      )}
      {invalid && errorMessage && (
        <span className="text-xs text-red-500 dark:text-red-400">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

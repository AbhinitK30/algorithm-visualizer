import LoadingSpinner from "./LoadingSpinner"

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-semibold rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60"

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-400",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-700 focus:ring-gray-400",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-400",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-400",
  }

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" color="white" />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default Button

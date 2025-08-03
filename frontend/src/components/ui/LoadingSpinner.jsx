const LoadingSpinner = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  const colorClasses = {
    blue: "text-blue-500",
    white: "text-white",
    gray: "text-gray-500",
  }

  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]} border-current`}
    />
  )
}

export default LoadingSpinner

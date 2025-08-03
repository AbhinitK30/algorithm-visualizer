const Card = ({ children, className = "", gradient = false, ...props }) => {
  const baseClasses = "rounded-xl shadow border p-6"
  const gradientClasses = gradient
    ? "bg-gradient-to-br from-blue-100 via-white to-blue-50 border-blue-200"
    : "bg-white border-blue-100"

  return (
    <div className={`${baseClasses} ${gradientClasses} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card

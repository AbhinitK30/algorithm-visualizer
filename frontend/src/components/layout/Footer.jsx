const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-3 text-sm shadow-inner mt-auto">
      <span className="text-blue-400 font-bold">Algorithm Visualizer</span> &copy; {new Date().getFullYear()} &mdash;
      Built with <span className="text-pink-400">&#129504;</span>
    </footer>
  )
}

export default Footer

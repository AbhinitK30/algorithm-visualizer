import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    // This establishes the main flex column for the entire page.
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 to-slate-300 font-sans">
      <Navbar />
      {/* This main element will grow to fill available space and act as a flex container for its children. */}
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout

import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaUser, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
  const location = useLocation()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const handleScrollToSection = (sectionId) => {
    // If on home page, scroll directly
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // If on another page, navigate to home first
      window.location.href = `/#${sectionId}`
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-white hover:text-gray-300 transition-colors">
              <span className="text-3xl">🌱</span>
              <span>WasteWise</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary-400 border-b-2 border-primary-400 pb-1' 
                  : 'text-white hover:text-primary-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className={`font-medium transition-colors ${
                location.pathname === '/courses' 
                  ? 'text-primary-400 border-b-2 border-primary-400 pb-1' 
                  : 'text-white hover:text-primary-400'
              }`}
            >
              Courses
            </Link>
            {location.pathname === '/' && (
              <>
                <button 
                  onClick={() => handleScrollToSection('track')}
                  className="font-medium text-white hover:text-primary-400 transition-colors"
                >
                  Track
                </button>
                <button 
                  onClick={() => handleScrollToSection('request')}
                  className="font-medium text-white hover:text-primary-400 transition-colors"
                >
                  Request
                </button>
              </>
            )}
            <Link 
              to="/my-reports" 
              className="font-medium text-white hover:text-primary-400 transition-colors"
            >
              My Reports
            </Link>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 text-white hover:text-primary-400 transition-colors"
              >
                <FaUser />
                <span className="font-medium">{user.name || 'User'}</span>
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-white font-semibold">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
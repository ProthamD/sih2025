import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ onRoleSwitch }) => {
  const location = useLocation()

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
            <a 
              href="#track" 
              className="font-medium text-white hover:text-primary-400 transition-colors"
            >
              Track
            </a>
            <a 
              href="#request" 
              className="font-medium text-white hover:text-primary-400 transition-colors"
            >
              Request
            </a>
            {onRoleSwitch && (
              <button
                onClick={onRoleSwitch}
                className="bg-secondary-600 hover:bg-secondary-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
              >
                Switch to Admin
              </button>
            )}
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
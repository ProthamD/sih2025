import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { RequestProvider } from './context/RequestContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import MyReports from './pages/MyReports'
import AdminDashboard from './pages/AdminDashboard'
import AdminCourses from './pages/AdminCourses'
import RoleSelection from './components/RoleSelection'
import './App.css'

function App() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        // Set role based on user's role property
        setSelectedRole(userData.role === 'admin' ? 'admin' : 'user')
      } catch (error) {
        console.error('Error parsing user data:', error)
        // Clear invalid data
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
  }

  const handleGoBack = () => {
    setSelectedRole(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!selectedRole) {
    return (
      <RequestProvider>
        <RoleSelection onRoleSelect={handleRoleSelection} />
      </RequestProvider>
    )
  }

  return (
    <RequestProvider>
      <Router>
        <div className="App">
          {selectedRole === 'user' && <Navbar />}
          {selectedRole === 'admin' && (
            <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-8">
                    <h2 className="text-xl font-bold text-white">Admin Portal</h2>
                    <div className="hidden md:flex space-x-6">
                      <Link 
                        to="/admin" 
                        className="text-gray-300 hover:text-white transition-colors font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/admin/courses" 
                        className="text-gray-300 hover:text-white transition-colors font-medium"
                      >
                        Courses
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          )}
          
          <Routes>
            {selectedRole === 'user' && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/my-reports" element={<MyReports />} />
                {/* Redirect any other routes to home for users */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
            {selectedRole === 'admin' && (
              <>
                <Route path="/" element={<Navigate to="/admin" replace />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
                {/* Redirect any other routes to admin dashboard */}
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </RequestProvider>
  )
}

export default App

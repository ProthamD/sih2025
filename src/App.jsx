import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RequestProvider } from './context/RequestContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Courses from './pages/Courses'
import AdminDashboard from './pages/AdminDashboard'
import AdminCourses from './pages/AdminCourses'
import RoleSelection from './components/RoleSelection'
import './App.css'

function App() {
  const [selectedRole, setSelectedRole] = useState(null)

  const handleRoleSelection = (role) => {
    setSelectedRole(role)
  }

  const handleGoBack = () => {
    setSelectedRole(null)
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
          {selectedRole === 'user' && <Navbar onRoleSwitch={handleGoBack} />}
          {selectedRole === 'admin' && (
            <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-8">
                    <h2 className="text-xl font-bold text-white">Admin Portal</h2>
                    <div className="hidden md:flex space-x-6">
                      <a 
                        href="/admin" 
                        className="text-gray-300 hover:text-white transition-colors font-medium"
                      >
                        Dashboard
                      </a>
                      <a 
                        href="/admin/courses" 
                        className="text-gray-300 hover:text-white transition-colors font-medium"
                      >
                        Courses
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    Switch Role
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
              </>
            )}
            {selectedRole === 'admin' && (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </RequestProvider>
  )
}

export default App

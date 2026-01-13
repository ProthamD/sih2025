import { useState } from 'react'
import { FaUser, FaUserShield, FaArrowRight } from 'react-icons/fa'

const RoleSelection = ({ onRoleSelect }) => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const handleRoleClick = (role) => {
    setSelectedRole(role)
    setShowAuthModal(true)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const endpoint = isLogin 
      ? `http://localhost:5000/api/auth/${selectedRole}/login`
      : `http://localhost:5000/api/auth/${selectedRole}/signup`

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(isLogin ? {
          email: formData.email,
          password: formData.password
        } : formData)
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user info
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data))
        
        // Close modal and proceed to the app
        setShowAuthModal(false)
        onRoleSelect(selectedRole)
      } else {
        alert(data.message || 'Authentication failed')
      }
    } catch (error) {
      console.error('Auth error:', error)
      alert('Failed to authenticate. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to 
            <span className="text-primary-400 block">WasteWise</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Choose your role to access the appropriate dashboard and features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* User Role Card */}
          <div 
            className="card p-8 cursor-pointer hover:scale-102 transition-transform duration-200 hover:shadow-xl group"
            onClick={() => handleRoleClick('user')}
          >
            <div className="text-center">
              <div className="text-6xl mb-6 text-primary-400 flex justify-center">
                <FaUser />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">User Portal</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Report waste areas, track requests, access educational courses, and contribute to community cleanliness
              </p>
              
              <div className="space-y-3 text-left mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-secondary-400">•</span>
                  <span>Report waste locations</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-secondary-400">•</span>
                  <span>Track request status</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-secondary-400">•</span>
                  <span>Access learning courses</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-secondary-400">•</span>
                  <span>Upload images & location</span>
                </div>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2 group-hover:bg-primary-400 transition-colors">
                Continue as User
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Admin Role Card */}
          <div 
            className="card p-8 cursor-pointer hover:scale-102 transition-transform duration-200 hover:shadow-xl group"
            onClick={() => handleRoleClick('admin')}
          >
            <div className="text-center">
              <div className="text-6xl mb-6 text-secondary-400 flex justify-center">
                <FaUserShield />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">Admin Portal</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Manage waste reports, assign cleanup crews, approve requests, and oversee educational content
              </p>
              
              <div className="space-y-3 text-left mb-8">
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-primary-400">•</span>
                  <span>Review & approve requests</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-primary-400">•</span>
                  <span>Assign cleanup workers</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-primary-400">•</span>
                  <span>Manage course content</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <span className="text-primary-400">•</span>
                  <span>Monitor system analytics</span>
                </div>
              </div>

              <button className="btn-secondary w-full flex items-center justify-center gap-2 group-hover:bg-secondary-400 transition-colors">
                Continue as Admin
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Not sure which role? Contact your system administrator for access permissions.
          </p>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="card max-w-md w-full p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Sign In' : 'Sign Up'} as {selectedRole === 'user' ? 'User' : 'Admin'}
              </h2>
              <p className="text-gray-300">
                {isLogin ? 'Enter your credentials to continue' : 'Create a new account'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-400 hover:text-primary-300 font-semibold"
              >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </button>
            </div>

            <button
              onClick={() => {
                setShowAuthModal(false)
                setFormData({ name: '', email: '', phone: '', password: '' })
              }}
              className="mt-4 text-gray-400 hover:text-white w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoleSelection
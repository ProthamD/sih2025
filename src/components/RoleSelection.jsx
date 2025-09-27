import { FaUser, FaUserShield, FaArrowRight } from 'react-icons/fa'

const RoleSelection = ({ onRoleSelect }) => {
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
            onClick={() => onRoleSelect('user')}
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
            onClick={() => onRoleSelect('admin')}
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
    </div>
  )
}

export default RoleSelection
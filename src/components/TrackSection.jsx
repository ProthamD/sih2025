import { useState } from 'react'
import { FaSearch, FaTruck, FaMobileAlt, FaChartBar, FaMapMarkerAlt, FaTimes, FaBox, FaClock } from 'react-icons/fa'

const TrackSection = () => {
  const [trackingId, setTrackingId] = useState('')
  const [trackingResult, setTrackingResult] = useState(null)

  const handleTrack = (e) => {
    e.preventDefault()
    if (trackingId.trim()) {
      // Simulate tracking result
      setTrackingResult({
        id: trackingId,
        status: 'In Transit',
        location: 'Collection Center A',
        estimatedTime: '2 hours',
        progress: 75
      })
    }
  }

  const resetTracking = () => {
    setTrackingId('')
    setTrackingResult(null)
  }

  return (
    <section id="track" className="min-h-screen bg-black py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Track Your Waste</h2>
          <p className="section-subtitle">Real-time tracking of waste collection and processing</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Track Your Request</h3>
            <form onSubmit={handleTrack} className="space-y-6">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking ID (e.g., WM123456)"
                  className="form-input flex-1"
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap flex items-center gap-2">
                  <FaSearch />
                  Track
                </button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Sample Tracking IDs:</h4>
              <div className="flex flex-wrap gap-2">
                {['WM123456', 'WM789012', 'WM345678'].map(id => (
                  <button
                    key={id}
                    onClick={() => setTrackingId(id)}
                    className="text-xs px-3 py-1 bg-primary-600 text-white rounded-full hover:bg-primary-500 transition-colors"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {trackingResult && (
              <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Tracking Result</h3>
                  <button 
                    onClick={resetTracking} 
                    className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 bg-gray-800 rounded-lg p-4">
                    <div className="text-4xl text-primary-400">
                      <FaBox />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">ID: {trackingResult.id}</h4>
                      <p className="text-secondary-400 font-medium text-lg mb-2">{trackingResult.status}</p>
                      <p className="text-gray-300 mb-1 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-secondary-400" />
                        {trackingResult.location}
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        <FaClock className="text-primary-400" />
                        ETA: {trackingResult.estimatedTime}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">Progress</span>
                      <span className="text-primary-400 font-semibold">{trackingResult.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${trackingResult.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Tracking Features</h3>
            <div className="space-y-6">
              <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl text-primary-400">
                    <FaTruck />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Real-time Updates</h4>
                    <p className="text-gray-300">Get live updates on collection status and route progress</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl text-secondary-400">
                    <FaMobileAlt />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Mobile Notifications</h4>
                    <p className="text-gray-300">Receive SMS and push notifications for important updates</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl text-primary-400">
                    <FaChartBar />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Analytics Dashboard</h4>
                    <p className="text-gray-300">View detailed waste management analytics and reports</p>
                  </div>
                </div>
              </div>
              
              <div className="card p-6 transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl text-secondary-400">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">GPS Tracking</h4>
                    <p className="text-gray-300">Precise location tracking of waste collection vehicles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrackSection
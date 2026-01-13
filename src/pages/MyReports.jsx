import { useState, useEffect } from 'react'
import { 
  FaCheckCircle, 
  FaClock, 
  FaMapMarkerAlt, 
  FaTrash, 
  FaExclamationTriangle,
  FaTimes,
  FaSpinner,
  FaTruck,
  FaUser
} from 'react-icons/fa'

const MyReports = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(null)

  useEffect(() => {
    fetchMyReports()
  }, [])

  const fetchMyReports = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/reports/user/my-reports', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setReports(data)
      } else {
        console.error('Failed to fetch reports')
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (reportId) => {
    setVerifying(reportId)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}/verify`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verified: true })
      })

      if (response.ok) {
        alert('Report verified successfully!')
        fetchMyReports()
      } else {
        alert('Failed to verify report')
      }
    } catch (error) {
      console.error('Error verifying report:', error)
      alert('Failed to verify report')
    } finally {
      setVerifying(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-900/20'
      case 'approved': return 'text-blue-400 bg-blue-900/20'
      case 'assigned': return 'text-purple-400 bg-purple-900/20'
      case 'completed': return 'text-green-400 bg-green-900/20'
      case 'rejected': return 'text-red-400 bg-red-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock />
      case 'approved': return <FaCheckCircle />
      case 'assigned': return <FaTruck />
      case 'completed': return <FaCheckCircle />
      case 'rejected': return <FaTimes />
      default: return <FaSpinner />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-16 flex items-center justify-center">
        <FaSpinner className="text-4xl text-primary-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">My Reports</h1>
          <p className="text-gray-300">Track your submitted waste reports and their status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-4">
            <p className="text-gray-400 text-sm">Total Reports</p>
            <p className="text-2xl font-bold text-white">{reports.length}</p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">
              {reports.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm">In Progress</p>
            <p className="text-2xl font-bold text-blue-400">
              {reports.filter(r => r.status === 'approved' || r.status === 'assigned').length}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-gray-400 text-sm">Completed</p>
            <p className="text-2xl font-bold text-green-400">
              {reports.filter(r => r.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Reports List */}
        <div className="space-y-6">
          {reports.map(report => (
            <div key={report._id} className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-bold text-white">
                      Report #{report._id.slice(-6).toUpperCase()}
                    </h3>
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-700 text-gray-300">
                      {report.urgency.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaTrash className="text-secondary-400" />
                        <span>{report.wasteType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaMapMarkerAlt className="text-primary-400" />
                        <span className="text-sm">
                          {report.location.latitude.toFixed(4)}, {report.location.longitude.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaClock className="text-secondary-400" />
                        <span>{new Date(report.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    {report.assignedTruck && (
                      <div className="space-y-2">
                        <div className="bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-blue-400 font-semibold mb-1">Assigned</p>
                          <p className="text-gray-300 text-sm">Truck: {report.assignedTruck}</p>
                          <p className="text-gray-300 text-sm">Driver: {report.assignedDriver}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {report.description && (
                    <p className="text-gray-300 mb-4">{report.description}</p>
                  )}

                  {/* Images */}
                  {report.images && report.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-gray-400 text-sm font-semibold mb-2">Photos ({report.images.length})</p>
                      <div className="flex gap-2 overflow-x-auto">
                        {report.images.map((image, index) => (
                          <img 
                            key={index}
                            src={image} 
                            alt={`Report image ${index + 1}`}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {report.adminNotes && (
                    <div className="bg-gray-800 p-3 rounded-lg mb-4">
                      <p className="text-gray-400 text-sm font-semibold mb-1">Admin Notes:</p>
                      <p className="text-gray-300 text-sm">{report.adminNotes}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                  {report.status === 'completed' && !report.verified && (
                    <button
                      onClick={() => handleVerify(report._id)}
                      disabled={verifying === report._id}
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      {verifying === report._id ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle />
                          Verify Completion
                        </>
                      )}
                    </button>
                  )}

                  {report.verified && (
                    <div className="bg-green-900/20 px-4 py-3 rounded-lg text-center">
                      <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
                      <p className="text-green-400 font-semibold text-sm">Verified ✓</p>
                    </div>
                  )}

                  {report.status === 'pending' && (
                    <div className="bg-yellow-900/20 px-4 py-3 rounded-lg text-center">
                      <FaClock className="text-yellow-400 text-2xl mx-auto mb-2" />
                      <p className="text-yellow-400 font-semibold text-sm">Awaiting Review</p>
                    </div>
                  )}

                  {(report.status === 'approved' || report.status === 'assigned') && (
                    <div className="bg-blue-900/20 px-4 py-3 rounded-lg text-center">
                      <FaTruck className="text-blue-400 text-2xl mx-auto mb-2" />
                      <p className="text-blue-400 font-semibold text-sm">In Progress</p>
                    </div>
                  )}

                  {report.status === 'rejected' && (
                    <div className="bg-red-900/20 px-4 py-3 rounded-lg text-center">
                      <FaTimes className="text-red-400 text-2xl mx-auto mb-2" />
                      <p className="text-red-400 font-semibold text-sm">Rejected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-600 mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No reports yet</h3>
            <p className="text-gray-500 mb-6">You haven't submitted any waste reports.</p>
            <a href="/#request" className="btn-primary inline-block">
              Submit Your First Report
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyReports

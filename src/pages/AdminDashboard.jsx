import { useState } from 'react'
import { useRequests } from '../context/RequestContext'
import { 
  FaCheck, 
  FaTimes, 
  FaUser, 
  FaMapMarkerAlt, 
  FaClock, 
  FaPhone, 
  FaEnvelope,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
  FaUsers,
  FaChartBar,
  FaEye,
  FaUserCheck
} from 'react-icons/fa'

const AdminDashboard = () => {
  const { requests, workers, updateRequestStatus, assignWorker, getRequestStats } = useRequests()
  const [selectedTab, setSelectedTab] = useState('pending')
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [assigningWorker, setAssigningWorker] = useState(null)

  const stats = getRequestStats()

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400'
      case 'approved': return 'text-blue-400'
      case 'completed': return 'text-green-400'
      case 'rejected': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock />
      case 'approved': return <FaCheckCircle />
      case 'completed': return <FaCheck />
      case 'rejected': return <FaTimes />
      default: return <FaSpinner />
    }
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-900/20'
      case 'normal': return 'text-yellow-400 bg-yellow-900/20'
      case 'low': return 'text-green-400 bg-green-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const handleApproveRequest = (requestId) => {
    setAssigningWorker(requestId)
  }

  const handleAssignWorker = (requestId, workerId) => {
    assignWorker(requestId, workerId)
    setAssigningWorker(null)
  }

  const handleRejectRequest = (requestId) => {
    updateRequestStatus(requestId, 'rejected', 'Request rejected by admin')
  }

  const handleCompleteRequest = (requestId) => {
    updateRequestStatus(requestId, 'completed', 'Task completed successfully')
  }

  const filteredRequests = selectedTab === 'all' 
    ? requests 
    : requests.filter(request => request.status === selectedTab)

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-gray-300">Manage waste collection requests and assign cleanup crews</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Requests</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="text-2xl text-primary-400">
                <FaChartBar />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              </div>
              <div className="text-2xl text-yellow-400">
                <FaClock />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-400">{stats.approved}</p>
              </div>
              <div className="text-2xl text-blue-400">
                <FaSpinner />
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
              </div>
              <div className="text-2xl text-green-400">
                <FaCheckCircle />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'all', label: 'All Requests', count: stats.total },
            { id: 'pending', label: 'Pending', count: stats.pending },
            { id: 'approved', label: 'In Progress', count: stats.approved },
            { id: 'completed', label: 'Completed', count: stats.completed }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                selectedTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab.label}
              <span className="bg-black/20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.map(request => (
            <div key={request.id} className="card p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Request Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-bold text-white">ID: {request.id}</h3>
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaUser className="text-primary-400" />
                        <span>{request.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaEnvelope className="text-secondary-400" />
                        <span>{request.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaPhone className="text-primary-400" />
                        <span>{request.phone}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaTrash className="text-secondary-400" />
                        <span>{request.wasteType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaMapMarkerAlt className="text-secondary-400" />
                        <span className="truncate">{request.location.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <FaClock className="text-primary-400" />
                        <span>{request.submittedAt.toLocaleDateString()} at {request.submittedAt.toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{request.description}</p>

                  {request.assignedWorker && (
                    <div className="flex items-center gap-2 text-blue-400 bg-blue-900/20 px-3 py-2 rounded-lg">
                      <FaUserCheck />
                      <span>Assigned to: {request.assignedWorker.name} ({request.assignedWorker.contact})</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <button
                    onClick={() => setSelectedRequest(request)}
                    className="btn-outline flex items-center justify-center gap-2"
                  >
                    <FaEye />
                    View Details
                  </button>

                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApproveRequest(request.id)}
                        className="btn-secondary flex items-center justify-center gap-2"
                      >
                        <FaCheck />
                        Approve & Assign
                      </button>
                      <button
                        onClick={() => handleRejectRequest(request.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <FaTimes />
                        Reject
                      </button>
                    </>
                  )}

                  {request.status === 'approved' && (
                    <button
                      onClick={() => handleCompleteRequest(request.id)}
                      className="btn-primary flex items-center justify-center gap-2"
                    >
                      <FaCheckCircle />
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl text-gray-600 mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No requests found</h3>
            <p className="text-gray-500">No requests match the selected filter.</p>
          </div>
        )}
      </div>

      {/* Worker Assignment Modal */}
      {assigningWorker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Assign Worker</h3>
            <p className="text-gray-300 mb-6">Select a worker to assign to request {assigningWorker}</p>
            
            <div className="space-y-3 mb-6">
              {workers.filter(worker => worker.status === 'available').map(worker => (
                <button
                  key={worker.id}
                  onClick={() => handleAssignWorker(assigningWorker, worker.id)}
                  className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{worker.name}</p>
                      <p className="text-sm text-gray-400">{worker.specialization}</p>
                      <p className="text-sm text-gray-400">{worker.contact}</p>
                    </div>
                    <div className="text-green-400">
                      <FaUsers />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setAssigningWorker(null)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Contact Information</h4>
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Name:</strong> {selectedRequest.name}</p>
                    <p><strong>Email:</strong> {selectedRequest.email}</p>
                    <p><strong>Phone:</strong> {selectedRequest.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3">Request Details</h4>
                  <div className="space-y-2 text-gray-300">
                    <p><strong>Type:</strong> {selectedRequest.wasteType}</p>
                    <p><strong>Priority:</strong> {selectedRequest.urgency}</p>
                    <p><strong>Status:</strong> {selectedRequest.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Location</h4>
                <p className="text-gray-300">{selectedRequest.location.address}</p>
                <p className="text-sm text-gray-400">
                  Coordinates: {selectedRequest.location.latitude.toFixed(6)}, {selectedRequest.location.longitude.toFixed(6)}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Description</h4>
                <p className="text-gray-300">{selectedRequest.description}</p>
              </div>

              {selectedRequest.images && selectedRequest.images.length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-3">Images</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRequest.images.map(image => (
                      <div key={image.id} className="bg-gray-800 rounded-lg p-2">
                        <div className="aspect-video bg-gray-700 rounded flex items-center justify-center">
                          <FaEye className="text-gray-500 text-2xl" />
                        </div>
                        <p className="text-sm text-gray-400 mt-2">{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.assignedWorker && (
                <div>
                  <h4 className="font-semibold text-white mb-3">Assigned Worker</h4>
                  <div className="bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-blue-400 font-semibold">{selectedRequest.assignedWorker.name}</p>
                    <p className="text-gray-300">{selectedRequest.assignedWorker.contact}</p>
                  </div>
                </div>
              )}

              {selectedRequest.adminNotes && (
                <div>
                  <h4 className="font-semibold text-white mb-3">Admin Notes</h4>
                  <p className="text-gray-300 bg-gray-800 p-4 rounded-lg">{selectedRequest.adminNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
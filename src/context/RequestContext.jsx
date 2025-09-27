import { createContext, useContext, useState } from 'react'

const RequestContext = createContext()

export const useRequests = () => {
  const context = useContext(RequestContext)
  if (!context) {
    throw new Error('useRequests must be used within a RequestProvider')
  }
  return context
}

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([
    // Mock data for demonstration
    {
      id: 'WR123456',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 234-567-8901',
      wasteType: 'Mixed Waste',
      description: 'Large pile of household waste dumped near the park entrance. Includes plastic bottles, food containers, and paper waste.',
      urgency: 'high',
      location: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 10,
        address: 'Central Park, New York, NY'
      },
      images: [
        { id: 1, url: '/api/placeholder/300/200', name: 'waste-area-1.jpg' },
        { id: 2, url: '/api/placeholder/300/200', name: 'waste-area-2.jpg' }
      ],
      status: 'pending',
      submittedAt: new Date('2025-09-24T10:30:00'),
      assignedWorker: null,
      adminNotes: '',
      estimatedCompletion: null
    },
    {
      id: 'WR789012',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 234-567-8902',
      wasteType: 'Electronic Waste',
      description: 'Old television and computer monitors abandoned on the sidewalk.',
      urgency: 'normal',
      location: {
        latitude: 40.7589,
        longitude: -73.9851,
        accuracy: 15,
        address: 'Times Square, New York, NY'
      },
      images: [
        { id: 3, url: '/api/placeholder/300/200', name: 'ewaste-1.jpg' }
      ],
      status: 'approved',
      submittedAt: new Date('2025-09-23T14:15:00'),
      assignedWorker: {
        id: 'W001',
        name: 'Mike Wilson',
        contact: '+1 555-0101'
      },
      adminNotes: 'E-waste disposal team assigned. Special handling required.',
      estimatedCompletion: new Date('2025-09-26T16:00:00')
    },
    {
      id: 'WR345678',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '+1 234-567-8903',
      wasteType: 'Organic Waste',
      description: 'Rotting food waste creating odor issues in residential area.',
      urgency: 'high',
      location: {
        latitude: 40.6782,
        longitude: -73.9442,
        accuracy: 8,
        address: 'Brooklyn Heights, Brooklyn, NY'
      },
      images: [
        { id: 4, url: '/api/placeholder/300/200', name: 'organic-waste.jpg' }
      ],
      status: 'completed',
      submittedAt: new Date('2025-09-22T09:45:00'),
      assignedWorker: {
        id: 'W002',
        name: 'Lisa Chen',
        contact: '+1 555-0102'
      },
      adminNotes: 'Completed successfully. Area sanitized.',
      estimatedCompletion: new Date('2025-09-23T12:00:00'),
      completedAt: new Date('2025-09-23T11:30:00')
    }
  ])

  const [workers] = useState([
    {
      id: 'W001',
      name: 'Mike Wilson',
      contact: '+1 555-0101',
      specialization: 'Electronic Waste',
      status: 'busy',
      currentAssignments: 1
    },
    {
      id: 'W002',
      name: 'Lisa Chen',
      contact: '+1 555-0102',
      specialization: 'Organic Waste',
      status: 'available',
      currentAssignments: 0
    },
    {
      id: 'W003',
      name: 'David Rodriguez',
      contact: '+1 555-0103',
      specialization: 'General Waste',
      status: 'available',
      currentAssignments: 0
    },
    {
      id: 'W004',
      name: 'Emily Zhang',
      contact: '+1 555-0104',
      specialization: 'Hazardous Materials',
      status: 'available',
      currentAssignments: 0
    }
  ])

  const addRequest = (requestData) => {
    const newRequest = {
      ...requestData,
      id: `WR${Math.floor(Math.random() * 1000000)}`,
      status: 'pending',
      submittedAt: new Date(),
      assignedWorker: null,
      adminNotes: '',
      estimatedCompletion: null
    }
    setRequests(prev => [newRequest, ...prev])
    return newRequest
  }

  const updateRequestStatus = (requestId, status, adminNotes = '', assignedWorker = null) => {
    setRequests(prev => prev.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status, 
            adminNotes, 
            assignedWorker,
            ...(status === 'completed' && { completedAt: new Date() })
          }
        : request
    ))
  }

  const assignWorker = (requestId, workerId) => {
    const worker = workers.find(w => w.id === workerId)
    if (worker) {
      updateRequestStatus(requestId, 'approved', `Assigned to ${worker.name}`, worker)
    }
  }

  const getRequestsByStatus = (status) => {
    return requests.filter(request => request.status === status)
  }

  const getRequestStats = () => {
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      completed: requests.filter(r => r.status === 'completed').length,
      rejected: requests.filter(r => r.status === 'rejected').length
    }
  }

  const value = {
    requests,
    workers,
    addRequest,
    updateRequestStatus,
    assignWorker,
    getRequestsByStatus,
    getRequestStats
  }

  return (
    <RequestContext.Provider value={value}>
      {children}
    </RequestContext.Provider>
  )
}

export default RequestContext
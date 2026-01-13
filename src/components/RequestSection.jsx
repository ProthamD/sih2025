import { useState, useRef } from 'react'
import { 
  FaCheckCircle, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaMobileAlt, 
  FaEdit, 
  FaTrash, 
  FaCamera, 
  FaSpinner, 
  FaRocket, 
  FaUndo, 
  FaPhone, 
  FaCreditCard,
  FaClock 
} from 'react-icons/fa'

const RequestSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    wasteType: '',
    description: '',
    urgency: 'normal',
    location: null,
    images: []
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [imageUploadError, setImageUploadError] = useState('')
  const fileInputRef = useRef(null)

  const wasteTypes = [
    'Household Waste',
    'Organic Waste',
    'Paper & Cardboard',
    'Plastic & Bottles',
    'Glass',
    'Metal',
    'Electronic Waste',
    'Hazardous Materials',
    'Construction Debris',
    'Garden Waste',
    'Mixed Waste',
    'Illegal Dumping',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setImageUploadError('')

    // Validate files
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setImageUploadError('Each image must be less than 5MB')
        return false
      }
      if (!file.type.startsWith('image/')) {
        setImageUploadError('Please upload only image files')
        return false
      }
      return true
    })

    if (formData.images.length + validFiles.length > 5) {
      setImageUploadError('Maximum 5 images allowed')
      return
    }

    // Create preview URLs
    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }))

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))
  }

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => {
        if (img.id === imageId) {
          URL.revokeObjectURL(img.preview)
        }
        return img.id !== imageId
      })
    }))
  }

  const getCurrentLocation = () => {
    setIsLoadingLocation(true)
    setLocationError('')

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser')
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        }
        
        setFormData(prev => ({
          ...prev,
          location: locationData
        }))
        setIsLoadingLocation(false)
      },
      (error) => {
        let errorMessage = 'Unable to get location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
        }
        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.wasteType) {
      alert('Please fill in all required fields')
      return
    }

    if (formData.images.length === 0) {
      alert('Please upload at least one image of the waste area')
      return
    }

    if (!formData.location) {
      alert('Please share your location to help us locate the waste area')
      return
    }

    try {
      // Get token from localStorage (you should implement proper auth)
      const token = localStorage.getItem('token')
      
      // Create FormData for multipart/form-data
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('wasteType', formData.wasteType)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('urgency', formData.urgency)
      formDataToSend.append('location', JSON.stringify(formData.location))
      
      // Append images
      formData.images.forEach(img => {
        formDataToSend.append('images', img.file)
      })

      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Waste Report submitted:', data)
        setIsSubmitted(true)
        
        // Clean up image URLs
        formData.images.forEach(img => URL.revokeObjectURL(img.preview))
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            wasteType: '',
            description: '',
            urgency: 'normal',
            location: null,
            images: []
          })
          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }, 5000)
      } else {
        alert(data.message || 'Failed to submit report. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting report:', error)
      alert('Failed to submit report. Please make sure you are logged in and try again.')
    }
  }

  // Fallback for when user is not logged in (temporary mock submission)
  const handleSubmitMock = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.wasteType) {
      alert('Please fill in all required fields')
      return
    }

    if (formData.images.length === 0) {
      alert('Please upload at least one image of the waste area')
      return
    }

    if (!formData.location) {
      alert('Please share your location to help us locate the waste area')
      return
    }

    // Create submission data
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      id: 'WR' + Date.now()
    }
    
    console.log('Waste Report submitted (Mock):', submissionData)
    setIsSubmitted(true)
    
    // Clean up image URLs
    formData.images.forEach(img => URL.revokeObjectURL(img.preview))
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        wasteType: '',
        description: '',
        urgency: 'normal',
        location: null,
        images: []
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }, 5000)
  }

  if (isSubmitted) {
    return (
      <section id="request" className="min-h-screen bg-black flex items-center py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-12 text-center animate-fade-in">
            <div className="text-8xl mb-6 text-secondary-400">
              <FaCheckCircle />
            </div>
            <h2 className="text-4xl font-bold text-secondary-400 mb-6">Waste Report Submitted Successfully!</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Your waste report has been received and will be reviewed by our team. We'll assign a cleanup crew to the location and notify you of the progress.
            </p>
            <div className="inline-block bg-gradient-to-r from-primary-500 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl mb-8">
              Report ID: WR{Math.floor(Math.random() * 1000000)}
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md mx-auto border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6">What happens next?</h3>
              <ul className="space-y-4 text-left">
                <li className="flex items-center space-x-3 text-gray-300">
                  <span className="text-2xl text-secondary-400">
                    <FaMapMarkerAlt />
                  </span>
                  <span>Our team will verify the location</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <span className="text-2xl text-primary-400">
                    <FaUsers />
                  </span>
                  <span>A cleanup crew will be assigned</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <span className="text-2xl text-secondary-400">
                    <FaMobileAlt />
                  </span>
                  <span>You'll receive SMS/email updates</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-300">
                  <span className="text-2xl text-primary-400">
                    <FaCheckCircle />
                  </span>
                  <span>Area will be cleaned within 48-72 hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="request" className="min-h-screen bg-black py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Report Waste Area</h2>
          <p className="section-subtitle">Help us keep your community clean by reporting waste areas that need attention</p>
        </div>

        <div className="card p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span className="text-primary-400">
                  <FaEdit />
                </span>
                <span>Your Information</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Waste Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                <span className="text-secondary-400">
                  <FaTrash />
                </span>
                <span>Waste Details</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="wasteType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Type of Waste *
                  </label>
                  <select
                    id="wasteType"
                    name="wasteType"
                    value={formData.wasteType}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select waste type</option>
                    {wasteTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent - Health Hazard</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Describe the waste situation, approximate size, any hazards, or additional details..."
                  className="form-input resize-none"
                />
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2 mb-2">
                  <span className="text-primary-400">
                    <FaCamera />
                  </span>
                  <span>Upload Images</span>
                </h3>
                <p className="text-gray-600 text-sm">Please upload photos of the waste area to help our team understand the situation better</p>
              </div>
              
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="imageUpload"
                />
                <label 
                  htmlFor="imageUpload" 
                  className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <span className="text-4xl mb-2 text-primary-400">
                    <FaCamera />
                  </span>
                  <span className="text-lg font-semibold text-gray-700">Choose Images</span>
                  <span className="text-sm text-gray-500 mt-1">Max 5 images, 5MB each</span>
                </label>
              </div>

              {imageUploadError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                  {imageUploadError}
                </div>
              )}

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image) => (
                    <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <img src={image.preview} alt="Waste area" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                        onClick={() => removeImage(image.id)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2 mb-2">
                  <span className="text-secondary-400">
                    <FaMapMarkerAlt />
                  </span>
                  <span>Location</span>
                </h3>
                <p className="text-gray-600 text-sm">Share your current location to help us locate the waste area accurately</p>
              </div>
              
              <div className="space-y-4">
                <button
                  type="button"
                  className={`btn-secondary ${isLoadingLocation ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? (
                    <span className="flex items-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Getting Location...
                    </span>
                  ) : formData.location ? (
                    <span className="flex items-center gap-2">
                      <FaCheckCircle />
                      Location Captured
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      Share My Location
                    </span>
                  )}
                </button>

                {formData.location && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                    <p className="font-semibold mb-2 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-green-600" />
                      Location captured successfully!
                    </p>
                    <div className="text-sm font-mono text-green-600">
                      Coordinates: {formData.location.latitude.toFixed(6)}, {formData.location.longitude.toFixed(6)}
                      <br />
                      Accuracy: ±{Math.round(formData.location.accuracy)}m
                    </div>
                  </div>
                )}

                {locationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {locationError}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
              <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                <FaRocket />
                Submit Waste Report
              </button>
              <button 
                type="button" 
                className="btn-outline flex-1 flex items-center justify-center gap-2"
                onClick={() => {
                  formData.images.forEach(img => URL.revokeObjectURL(img.preview))
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    wasteType: '',
                    description: '',
                    urgency: 'normal',
                    location: null,
                    images: []
                  })
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
              >
                <FaUndo />
                Reset Form
              </button>
            </div>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white">
            <div className="text-4xl mb-4 text-primary-400 flex justify-center">
              <FaClock />
            </div>
            <h4 className="text-xl font-bold mb-2">Response Time</h4>
            <p className="text-white/90">We respond to all requests within 24 hours</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white">
            <div className="text-4xl mb-4 text-secondary-400 flex justify-center">
              <FaPhone />
            </div>
            <h4 className="text-xl font-bold mb-2">Emergency Service</h4>
            <p className="text-white/90">For urgent requests, call: (555) 123-WASTE</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center text-white">
            <div className="text-4xl mb-4 text-primary-400 flex justify-center">
              <FaCreditCard />
            </div>
            <h4 className="text-xl font-bold mb-2">Free Service</h4>
            <p className="text-white/90">Community waste reporting is completely free</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RequestSection
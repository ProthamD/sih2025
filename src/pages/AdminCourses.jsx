import { 
  FaRecycle, 
  FaLeaf, 
  FaIndustry, 
  FaWater, 
  FaClock, 
  FaUsers, 
  FaStar,
  FaPlay,
  FaBookOpen,
  FaCertificate,
  FaGraduationCap
} from 'react-icons/fa'

const AdminCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Waste Segregation Fundamentals',
      description: 'Learn the basics of waste segregation and how to manage different types of waste effectively.',
      duration: '2 hours',
      students: 1250,
      rating: 4.8,
      icon: <FaRecycle />,
      level: 'Beginner',
      modules: [
        'Introduction to Waste Types',
        'Segregation Techniques',
        'Safety Protocols',
        'Best Practices'
      ],
      instructor: 'Dr. Sarah Johnson',
      completionRate: 92
    },
    {
      id: 2,
      title: 'Environmental Impact Assessment',
      description: 'Understand the environmental impact of waste and learn sustainable disposal methods.',
      duration: '3 hours',
      students: 890,
      rating: 4.7,
      icon: <FaLeaf />,
      level: 'Intermediate',
      modules: [
        'Environmental Impact Basics',
        'Carbon Footprint Analysis',
        'Sustainable Practices',
        'Impact Reduction Strategies'
      ],
      instructor: 'Prof. Michael Green',
      completionRate: 87
    },
    {
      id: 3,
      title: 'Industrial Waste Management',
      description: 'Advanced techniques for managing industrial waste and implementing circular economy principles.',
      duration: '4 hours',
      students: 650,
      rating: 4.9,
      icon: <FaIndustry />,
      level: 'Advanced',
      modules: [
        'Industrial Waste Categories',
        'Treatment Technologies',
        'Circular Economy Models',
        'Regulatory Compliance'
      ],
      instructor: 'Dr. Emily Chen',
      completionRate: 89
    },
    {
      id: 4,
      title: 'Water Treatment & Recycling',
      description: 'Comprehensive guide to water treatment processes and recycling techniques for sustainability.',
      duration: '3.5 hours',
      students: 720,
      rating: 4.6,
      icon: <FaWater />,
      level: 'Intermediate',
      modules: [
        'Water Quality Assessment',
        'Treatment Processes',
        'Recycling Technologies',
        'Quality Control'
      ],
      instructor: 'Dr. Robert Kim',
      completionRate: 85
    }
  ]

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-900/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-900/20'
      case 'Advanced': return 'text-red-400 bg-red-900/20'
      default: return 'text-gray-400 bg-gray-900/20'
    }
  }

  const getCompletionColor = (rate) => {
    if (rate >= 90) return 'text-green-400'
    if (rate >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Admin Course Management
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Monitor course progress, student engagement, and manage educational content for waste management training
          </p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="card p-6 text-center">
            <div className="text-3xl text-primary-400 mb-2">
              <FaBookOpen />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{courses.length}</h3>
            <p className="text-gray-400">Total Courses</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl text-secondary-400 mb-2">
              <FaUsers />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {courses.reduce((total, course) => total + course.students, 0).toLocaleString()}
            </h3>
            <p className="text-gray-400">Total Students</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl text-yellow-400 mb-2">
              <FaStar />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {(courses.reduce((total, course) => total + course.rating, 0) / courses.length).toFixed(1)}
            </h3>
            <p className="text-gray-400">Avg Rating</p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-3xl text-green-400 mb-2">
              <FaCertificate />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {Math.round(courses.reduce((total, course) => total + course.completionRate, 0) / courses.length)}%
            </h3>
            <p className="text-gray-400">Avg Completion</p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map(course => (
            <div key={course.id} className="card p-8 hover:shadow-2xl transition-all duration-300">
              {/* Course Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl text-primary-400">
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-secondary-400 mb-1">
                    <FaClock />
                    <span className="font-semibold text-white">{course.duration}</span>
                  </div>
                  <p className="text-sm text-gray-400">Duration</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-primary-400 mb-1">
                    <FaUsers />
                    <span className="font-semibold text-white">{course.students.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-400">Students</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-yellow-400 mb-1">
                    <FaStar />
                    <span className="font-semibold text-white">{course.rating}</span>
                  </div>
                  <p className="text-sm text-gray-400">Rating</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6">{course.description}</p>

              {/* Instructor */}
              <div className="flex items-center gap-2 mb-6">
                <FaGraduationCap className="text-secondary-400" />
                <span className="text-gray-300">
                  <strong className="text-white">Instructor:</strong> {course.instructor}
                </span>
              </div>

              {/* Completion Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">Completion Rate</span>
                  <span className={`font-bold ${getCompletionColor(course.completionRate)}`}>
                    {course.completionRate}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      course.completionRate >= 90 ? 'bg-green-400' :
                      course.completionRate >= 80 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>

              {/* Course Modules */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <FaBookOpen className="text-primary-400" />
                  Course Modules
                </h4>
                <div className="space-y-2">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                  <FaPlay />
                  View Course
                </button>
                <button className="btn-outline flex items-center justify-center gap-2">
                  <FaUsers />
                  Manage Students
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card p-6 text-center">
            <div className="text-4xl text-primary-400 mb-4">
              <FaBookOpen />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Add New Course</h3>
            <p className="text-gray-400 mb-4">Create and publish new educational content</p>
            <button className="btn-primary">Create Course</button>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-4xl text-secondary-400 mb-4">
              <FaUsers />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Student Analytics</h3>
            <p className="text-gray-400 mb-4">View detailed student progress and engagement</p>
            <button className="btn-secondary">View Analytics</button>
          </div>
          
          <div className="card p-6 text-center">
            <div className="text-4xl text-yellow-400 mb-4">
              <FaCertificate />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Certificates</h3>
            <p className="text-gray-400 mb-4">Manage and issue completion certificates</p>
            <button className="btn-outline">Manage Certificates</button>
          </div>
        </div>

        {/* Course Performance Metrics */}
        <div className="mt-12 card p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaStar className="text-yellow-400" />
            Course Performance Overview
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl text-primary-400">
                    {course.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{course.title}</h4>
                    <p className="text-xs text-gray-400">{course.level}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Students:</span>
                    <span className="text-white">{course.students}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <span className="text-yellow-400">{course.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Completion:</span>
                    <span className={getCompletionColor(course.completionRate)}>
                      {course.completionRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCourses
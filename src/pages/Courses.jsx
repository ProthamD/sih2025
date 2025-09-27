import { useState } from 'react'

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const courses = [
    {
      id: 1,
      title: 'Waste Segregation Fundamentals',
      description: 'Learn the basics of separating different types of waste for effective recycling.',
      category: 'basics',
      duration: '2 hours',
      level: 'Beginner',
      image: '🗂️',
      topics: ['Types of waste', 'Color coding systems', 'Best practices']
    },
    {
      id: 2,
      title: 'Composting at Home',
      description: 'Master the art of turning organic waste into nutrient-rich compost.',
      category: 'composting',
      duration: '3 hours',
      level: 'Intermediate',
      image: '🌱',
      topics: ['Compost bin setup', 'Organic materials', 'Maintenance tips']
    },
    {
      id: 3,
      title: 'E-waste Management',
      description: 'Understand proper disposal and recycling of electronic waste.',
      category: 'ewaste',
      duration: '1.5 hours',
      level: 'Beginner',
      image: '💻',
      topics: ['Device disposal', 'Data security', 'Recycling centers']
    },
    {
      id: 4,
      title: 'Industrial Waste Solutions',
      description: 'Advanced strategies for managing waste in industrial settings.',
      category: 'industrial',
      duration: '4 hours',
      level: 'Advanced',
      image: '🏭',
      topics: ['Regulatory compliance', 'Cost optimization', 'Safety protocols']
    },
    {
      id: 5,
      title: 'Community Recycling Programs',
      description: 'Learn how to set up and manage community-wide recycling initiatives.',
      category: 'community',
      duration: '2.5 hours',
      level: 'Intermediate',
      image: '♻️',
      topics: ['Program planning', 'Community engagement', 'Impact measurement']
    },
    {
      id: 6,
      title: 'Zero Waste Lifestyle',
      description: 'Practical steps towards achieving a zero waste lifestyle.',
      category: 'lifestyle',
      duration: '3 hours',
      level: 'Beginner',
      image: '🌍',
      topics: ['Reduce strategies', 'Reuse techniques', 'Sustainable alternatives']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'basics', name: 'Basics' },
    { id: 'composting', name: 'Composting' },
    { id: 'ewaste', name: 'E-waste' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'community', name: 'Community' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory)

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return '#4CAF50'
      case 'Intermediate': return '#FF9800'
      case 'Advanced': return '#F44336'
      default: return '#2196F3'
    }
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">Waste Management Courses</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">Expand your knowledge with our comprehensive courses on sustainable waste management practices</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id 
                  ? 'bg-primary-500 text-white shadow-lg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div key={course.id} className="card p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl bg-gradient-to-r from-[#0f172a]  to-[#334155]">
              <div className="text-center mb-6">
                <span className="text-6xl">{course.image}</span>
              </div>
              
              <div className="text-center">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white text-left flex-1">{course.title}</h3>
                  <span 
                    className="text-xs font-semibold px-3 py-1 rounded-full text-white ml-2"
                    style={{ backgroundColor: getLevelColor(course.level) }}
                  >
                    {course.level}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 text-left leading-relaxed">{course.description}</p>
                
                <div className="flex items-center justify-start mb-4">
                  <span className="text-xl mr-2">⏱️</span>
                  <span className="text-gray-400">{course.duration}</span>
                </div>

                <div className="mb-6 text-left">
                  <h4 className="text-white font-semibold mb-2">What you'll learn:</h4>
                  <ul className="space-y-1 text-gray-300">
                    {course.topics.map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-primary-400 mr-2">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button className="btn-primary flex-1">Enroll Now</button>
                  <button className="btn-outline flex-1">Preview</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="courses-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Courses Available</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Students Enrolled</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Courses
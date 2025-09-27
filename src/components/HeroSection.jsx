import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="min-h-screen relative flex items-center pt-16 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/hero.jpg)'}}>
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Waste Management for a 
            <span className="text-yellow-300 block"> Greener Tomorrow</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
            Transform your community with our intelligent waste management system. 
            Track, learn, and contribute to a sustainable future through 
            real-time monitoring and educational resources.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card p-8 hover:scale-102 transition-transform duration-200 hover:shadow-xl">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-white mb-4">Learn & Grow</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Access comprehensive courses on waste management and sustainability</p>
              <Link to="/courses" className="btn-primary inline-block bg-gradient-to-bl from-[#84cc16] via-[#16a34a] to-[#0f766e]">
                Explore Courses
              </Link>
            </div>
            
            <div className="card p-8 hover:scale-102 transition-transform duration-200 hover:shadow-xl">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-white mb-4">Track Waste</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Monitor waste collection and disposal in real-time</p>
              <a href="#track" className="btn-secondary inline-block bg-gradient-to-bl from-[#84cc16] via-[#16a34a] to-[#0f766e]">
                Start Tracking
              </a>
            </div>
            
            <div className="card p-8 hover:scale-102 transition-transform duration-200 hover:shadow-xl">
              <div className="text-6xl mb-4">🚛</div>
              <h3 className="text-2xl font-bold text-white mb-4">Request Service</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">Report waste areas and request cleanup services</p>
              <a href="#request" className="btn-outline inline-block">
                Make Request
              </a>
            </div>
          </div>
          
          {/* Floating Visual Elements */}
          <div className="relative mt-16">
            <div className="flex justify-center space-x-8">
              <div className="text-6xl animate-bounce">♻️</div>
              <div className="text-6xl animate-bounce" style={{animationDelay: '0.5s'}}>🌍</div>
              <div className="text-6xl animate-bounce" style={{animationDelay: '1s'}}>🌱</div>
              <div className="text-6xl animate-bounce" style={{animationDelay: '1.5s'}}>💚</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
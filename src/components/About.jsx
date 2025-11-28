import React, { useEffect } from 'react'
import Header from './Header/Header';
import Footer from './Header/Footer';

const About = () => {
  // Enhanced animations for About page
  useEffect(() => {
    // Counter animation
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.textContent.includes('Minutes') ? ' Minutes' : 
                      counter.textContent.includes('Cities') ? '+ Cities' : 
                      counter.textContent.includes('Medicines') ? '+ Medicines' : '+ Partners';
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        
        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.textContent = Math.floor(count) + (suffix && count >= target ? suffix : '');
            setTimeout(updateCount, 16);
          } else {
            counter.textContent = target + (suffix ? suffix : '');
          }
        };
        
        updateCount();
      });
    };

    // Enhanced fade in on scroll with staggered delays
    const checkFadeIn = () => {
      const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
      fadeElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 100);
        }
      });
    };

    // Initialize animations
    const timer = setTimeout(() => {
      animateCounters();
      checkFadeIn();
    }, 100);

    window.addEventListener('scroll', checkFadeIn);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', checkFadeIn);
    };
  }, []);

  // Founder Profile Component
  const FounderProfile = () => (
    <section className="max-w-6xl mx-auto pt-12 py-2">
      <div className="bg-white rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 items-start">
        {/* Left: Image card with quote below */}
        <div className="space-y-6">
          <div className="relative overflow-hidden slide-in-left">
            <div className='flex item-end w-full justify-center'>
              <img
                src="/assets/CEO.png"
                alt="Founder Anand"
                className="w-70 h-[600px] object-cover object-top center transform hover:scale-105 transition-transform duration-700"
                style={{ borderRadius: 12 }}
              />
            </div>

            {/* Small floating badge with animation */}
            <div className="absolute bottom-4 right-4 lg:bottom-5 lg:right-20 sm:bottom-10 sm:right-20 scale-in">
              <div className="bg-white px-4 py-3 rounded-lg shadow-lg font-semibold text-gray-700 border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                <div className="uppercase text-lg tracking-wide text-center text-green-600 font-bold">ANAND</div>
                <div className="text-xs text-gray-500 text-center">Founder & Chairman</div>
              </div>
            </div>
          </div>

          {/* Quote below image */}
          <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-700 bg-green-50 rounded-lg p-4 text-base slide-in-left">
            "We don't just deliver medicines; we deliver trust. Every prescription fulfilled is a life improved, every doorstep reached is a promise kept for healthier communities."
          </blockquote>
        </div>

        {/* Right: Content */}
        <div className="pt-6 slide-in-right">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Our Story</h2>
          <p className="text-sm text-green-700 font-medium">Founded with a Vision for Better Healthcare</p>

          {/* Description */}
          <div className="mb-6 space-y-4 mt-6">
            <p className="text-gray-700 leading-relaxed text-base fade-in">
              Under the visionary leadership of our Founder, Mr. Anand, Anand Pharma was established on the foundational principle of 
              <span className='font-bold text-green-600'> "Healthcare for All"</span> — ensuring that quality medicines reach everyone, everywhere, within minutes.
            </p>
            <p className="text-gray-700 leading-relaxed text-base fade-in">
              With a background in pharmaceutical sciences and a passion for healthcare innovation, Mr. Anand envisioned a future where technology bridges the gap between pharmacies and patients, making healthcare truly accessible.
            </p>
            <p className="text-gray-700 leading-relaxed text-base fade-in">
              His vision drives our mission to transform healthcare delivery through intelligent logistics, transparent pricing, and trusted pharmacy partnerships.
            </p>
          </div>

          {/* Core Values */}
          <div className="mt-8 fade-in">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Our Core Values</h3>
            <div className="space-y-3">
              {[
                { icon: 'fas fa-heartbeat', text: 'Healthcare as a Fundamental Right' },
                { icon: 'fas fa-clock', text: 'Speed with Safety' },
                { icon: 'fas fa-hand-holding-medical', text: 'Patient-Centric Care' },
                { icon: 'fas fa-shield-alt', text: 'Trust & Transparency' }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="flex items-center text-gray-700 p-3 rounded-lg hover:bg-green-50 transition-all duration-300 transform hover:translate-x-2"
                >
                  <i className={`${value.icon} text-green-500 mr-3 text-lg`}></i>
                  <span className="font-medium">{value.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Stats Section Component
  const StatsSection = () => (
    <section className="py-6 text-black w-full bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { count: 15, label: 'Delivery Time', icon: 'fas fa-clock' },
            { count: 100, label: 'Cities Covered', icon: 'fas fa-map-marker-alt' },
            { count: 50000, label: 'Medicines Available', icon: 'fas fa-pills' },
            { count: 1000, label: 'Pharmacy Partners', icon: 'fas fa-handshake' }
          ].map((stat, index) => (
            <div key={index} className="p-6 fade-in group hover:scale-105 transition-transform duration-300">
              <i className={`${stat.icon} text-green-600 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
              <div className="text-3xl text-green-800 font-bold mb-2 counter" data-count={stat.count}>0</div>
              <div className="text-lg text-black font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const missionPillars = [
    {
      icon: 'fas fa-bullseye',
      title: 'Our Mission',
      description: 'To make healthcare truly accessible by delivering genuine medicines to every doorstep in just 15 minutes through advanced technology and trusted partnerships.',
    },
    {
      icon: 'fas fa-eye',
      title: 'Our Vision',
      description: 'A world where timely access to medication is never a privilege, but a fundamental right for every individual, regardless of their location or circumstances.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Our Promise',
      description: 'To deliver trust, transparency, and timely care through genuine medicines, transparent pricing, and reliable service that puts patient safety first.',
    }
  ]

  const teamValues = [
    {
      icon: 'fas fa-rocket',
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to revolutionize healthcare delivery'
    },
    {
      icon: 'fas fa-users',
      title: 'Collaboration',
      description: 'Working with licensed pharmacies and healthcare professionals'
    },
    {
      icon: 'fas fa-gem',
      title: 'Integrity',
      description: 'Maintaining highest standards of transparency and ethics'
    },
    {
      icon: 'fas fa-heart',
      title: 'Compassion',
      description: 'Putting patient well-being at the center of everything we do'
    }
  ]

  return (
    <div className="overflow-hidden pt-14">
        <Header/>
      {/* Hero Section */}
      <section className="text-white py-20 bg-gradient-to-br from-blue-900 via-blue-900 to-blue-900 relative overflow-hidden">
       
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 fade-in">
            Anand Pharma
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto fade-in animation-delay-300">
            Revolutionizing healthcare delivery through innovation, trust, and accessibility
          </p>
        </div>
      </section>

      {/* Founder & Story Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto py-6 px-4">
          <FounderProfile />
        </div>
      </section>

      {/* Mission, Vision & Promise Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 fade-in">Our Guiding Principles</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8 scale-in"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionPillars.map((pillar, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl text-center fade-in group hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-r from-green-400 to-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${pillar.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-6 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 fade-in">Our Approach to Healthcare</h2>
              <div className="w-20 h-1 bg-green-500 mx-auto mb-8 scale-in"></div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p className="fade-in">
                  At Anand Pharma, we believe that <span className="font-semibold text-green-600">when it comes to health, every moment matters</span>. 
                  Our innovative platform was built on the conviction that timely access to medication should never be a privilege, but a fundamental right.
                </p>
                
                <p className="fade-in">
                  We empower users with <span className="font-semibold text-green-600">real choices</span>, offering equivalent medicines with the same formula across multiple trusted brands, 
                  complete with transparent pricing. This ensures that every customer can choose confidently — balancing quality, affordability, and trust.
                </p>
                
                <p className="fade-in">
                  By combining <span className="font-semibold text-green-600">advanced technology, licensed pharmacy expertise, and intelligent logistics</span>, 
                  we are building a healthcare ecosystem that's faster, safer, and more reliable than ever before.
                </p>
                
                <p className="fade-in font-semibold text-green-700 text-center mt-8">
                  At Anand Pharma, we don't just deliver medicines — we deliver trust, transparency, and timely care to every home, every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 fade-in">Our Values</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8 scale-in"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-gray-100 fade-in group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                  <i className={`${value.icon} text-green-600 text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      <Footer/>

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .fade-in {
          opacity: 0;
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .slide-in-left {
          opacity: 0;
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .slide-in-right {
          opacity: 0;
          animation: slide-in-right 0.8s ease-out forwards;
        }
        
        .scale-in {
          opacity: 0;
          animation: scale-in 0.6s ease-out forwards;
        }
        
        .visible {
          opacity: 1;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .group:hover .group-hover\:scale-110 {
          transform: scale(1.1);
        }
        
        .group:hover .group-hover\:-translate-y-2 {
          transform: translateY(-0.5rem);
        }
      `}</style>
    </div>
  )
}

export default About
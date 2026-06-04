import React from 'react'
import Navbar from '../components/Navbar'
import { Feature, motion } from 'framer-motion';
import img from '../assets/img.png';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg--white text-black px-4 py-8">
      <Navbar />

      {/* top */}
      <section className='max-w-7xl mx-auto px-8 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        <div>
          <motion.div initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5 }}
            whileHover={{ rotateX: 8, rotateY: -8 }}
            className="transform-gpu 
          style={{ transformStyle: 'preserve-3d' }}">
            <motion.h1 className="text-5xl lg:text-6xl font-extrabold leading-tight bg-gradient-to-br from-black/90 via-black/60 to-black/90 bg-clip-text text-transparent"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
                textShadow: "0 18px 40px rgba(0,0,0,0.25)"
              }}>
              Create Smart <br /> AI Notes in seconds
            </motion.h1>
            <motion.p className='mt-6 max-w-xl text-lg bg-gradient-to-br from-gray-700 via-gray-500/80 to-gray-700 bg-clip-text text-transparent'
              whileHover={{ y: -2 }}
              style={{ transform: "translateZ(20px)", textShadow: "0 12px 30px rgba(0,0,0,0.15)" }}>
              Generate exam-focused notes , project documents , flow diagrams and revsion ready content using AI — instantly. Start with 50 free credits and upgrade anytime for more!

            </motion.p>

            <motion.button onClick={() => navigate('/notes')}
              whileHover={{y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
              whileTap={{ type: "spring", stiffness: 200, damping: 18  }}
              className='mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300  flex items-center gap-2 cursor-pointer'>

                Get Started
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          whileHover={{  y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
          className="transform-gpu" style={{ transformStyle: 'preserve-3d' }}>
            <div className="overflow-hidden">
              <img src={img} alt="img" style={{ transform: "translateZ(40px)" }} className="rounded-3xl" />

            </div>
          </motion.div>
      </section>

      {/* bottom */}
      <section className='max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 md:grid-cols-4 gap-12'> 
        <FeatureCard icon="📗" title="Exam Notes" description="Create comprehensive notes in seconds with our AI-powered tool." />
        <FeatureCard icon="📊" title="Graphs & Diagrams" description="Generate clear graphs and diagrams for visual learning." />
        <FeatureCard icon="📥" title="PDF Downloads" description="Download your notes as clean, well-formatted PDFs." />
        <FeatureCard icon="⚡" title="Instant Generation" description="Get your notes instantly with our powerful AI engine." />
      </section>
      <Footer />
    </div>
  )
}

function FeatureCard({ title, description, icon }) {
    return (
        <motion.div
            whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className='relative rounded-2xl p-6 bg-gradient-to-br from-black/90 via-black/80 to-black/90 text-white shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] border border-white/10' style={{ transformStyle: "preserve-3d" }}>
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none' style={{ transform: "translateZ(1px)" }}/>
                <div className='relative z-10 ' style={{ transform: "translateZ(30px)" }}>
                    <div className='text-4xl mb-3'>{icon}</div>
                    <h3 className='text-lg font-semibold mb-2'>{title}</h3>
                    <p className='text-gray-400 text-sm leading-relaxed'>{description}</p>
                </div>

        </motion.div>
    )
  }

export default Home

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const featureVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6 }
  })
}

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: `url("https://static.vecteezy.com/system/resources/previews/008/300/433/large_2x/panoramic-view-of-connecting-people-with-internet-communication-social-media-and-network-community-concept-global-business-internet-technology-3d-rendering-free-photo.jpg")`,
        }}
      >
        {/* Dark overlay to shade the image */}
        <div className="absolute inset-0 bg-black opacity-50 z-0" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            Expand Your Reach. Deepen Your Connections.
          </motion.h1>

          <motion.p
            className="text-lg md:text-2xl mb-6 max-w-2xl drop-shadow-md"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Join a community built for meaningful interactions and global connections.
          </motion.p>

          <Link to='/register'>
          <motion.button
            className="bg-blue-500 px-6 py-3 rounded-3xl text-white font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            Get Started
          </motion.button>
          </Link>
          
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-100 text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <p className="mt-2 text-gray-600">We help you build meaningful networks faster.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[ 
            {
              title: 'Global Connectivity',
              desc: 'Seamlessly connect with professionals and communities worldwide.'
            },
            {
              title: 'Secure & Private',
              desc: 'Your data is protected and your conversations are confidential.'
            },
            {
              title: 'Easy to Use',
              desc: 'Designed for simplicity—connect and communicate effortlessly.'
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white p-6 rounded shadow"
              custom={i}
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage

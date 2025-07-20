"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AboutPage() {
  const values = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in physiotherapy care and treatment outcomes.",
      emoji: "🏆",
      gradient: "from-yellow-400 to-yellow-600",
    },
    {
      title: "Compassion",
      description: "Every patient receives personalized care with empathy and understanding.",
      emoji: "💝",
      gradient: "from-pink-400 to-pink-600",
    },
    {
      title: "Innovation",
      description: "We embrace modern techniques and evidence-based practices for optimal results.",
      emoji: "🚀",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Integrity",
      description: "Honest, transparent communication and ethical practices in all our interactions.",
      emoji: "🤝",
      gradient: "from-green-400 to-green-600",
    },
  ]

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Lead Physiotherapist",
      experience: "8+ Years",
      specialization: "Orthopedic & Sports Rehabilitation",
      emoji: "👩‍⚕️",
    },
    {
      name: "Dr. Michael Chen",
      role: "Senior Physiotherapist",
      experience: "6+ Years",
      specialization: "Neurological Rehabilitation",
      emoji: "👨‍⚕️",
    },
    {
      name: "Dr. Priya Sharma",
      role: "Physiotherapist",
      experience: "4+ Years",
      specialization: "Pediatric & Women's Health",
      emoji: "👩‍⚕️",
    },
  ]

  const achievements = [
    { number: "500+", label: "Patients Treated", icon: "👥" },
    { number: "98%", label: "Success Rate", icon: "📈" },
    { number: "5+", label: "Years of Service", icon: "🗓️" },
    { number: "15+", label: "Treatment Types", icon: "🏥" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-teal-600">We Care</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dedicated to your recovery and well-being. We combine expertise, compassion, and innovation to provide
              exceptional physiotherapy care that transforms lives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div>
                  <span className="text-teal-600 font-semibold text-lg">Our Story</span>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-6">
                    One Successful Year Down, Countless More to Go
                  </h2>
                </div>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded with a vision to provide exceptional physiotherapy care, We Care Physiotherapy has been
                  serving the community for over a year. Our journey began with a simple belief: every individual
                  deserves personalized, compassionate healthcare that addresses their unique needs.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  From our humble beginnings, we've grown into a trusted healthcare provider, helping hundreds of
                  patients regain their mobility, reduce pain, and improve their quality of life. Our success is
                  measured not just in numbers, but in the smiles of our patients and their renewed confidence.
                </p>

                <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To provide world-class physiotherapy services that empower individuals to achieve optimal health,
                    mobility, and independence through evidence-based treatments and compassionate care.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl p-8 relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Celebrating Success</h3>
                  <p className="text-lg text-gray-700 mb-4">One year of dedicated service</p>
                  <div className="bg-white rounded-lg p-4 inline-block">
                    <p className="text-sm text-gray-600">Join us in our journey of healing</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center p-6 hover:shadow-lg transition-all duration-300 group border-teal-100 hover:border-teal-200">
                  <CardContent className="p-0">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center text-2xl`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {value.emoji}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your health and recovery
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-teal-100 hover:border-teal-200">
                  <CardContent className="p-0">
                    <motion.div
                      className="text-6xl mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {member.emoji}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-teal-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                    <p className="text-sm text-gray-500">{member.specialization}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 sm:p-8 hover:shadow-lg transition-all duration-300 group border-teal-100 hover:border-teal-200">
                  <CardContent className="p-0">
                    <motion.div
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {achievement.icon}
                    </motion.div>
                    <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">{achievement.number}</div>
                    <p className="text-gray-600 font-medium">{achievement.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Success Story</h2>
            <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto mb-8">
              Become part of our growing family of satisfied patients. Let us help you achieve your health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg w-full sm:w-auto bg-transparent"
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

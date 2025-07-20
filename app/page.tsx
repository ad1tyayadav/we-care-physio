"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Hero from '/public/hero.png'

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block"
                >
                  <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium">
                    ✨ Premium Physiotherapy Care
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  We Care
                  <span className="block text-teal-600">Physiotherapy</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Experience healing through expert care. Our dedicated team provides personalized physiotherapy
                  treatments to restore your mobility and enhance your quality of life.
                </p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={fadeInUp}>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg group w-full sm:w-auto"
                    >
                      Start Your Journey
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <Link href="/services">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-teal-200 text-teal-700 hover:bg-teal-50 px-8 py-3 text-lg bg-transparent w-full sm:w-auto"
                    >
                      Our Services
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-4 sm:gap-8 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -left-4 w-24 h-24 bg-teal-100 rounded-full opacity-60"
                />
                <motion.div
                  animate={{
                    rotate: [0, -5, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -right-4 w-32 h-32 bg-teal-200 rounded-full opacity-40"
                />
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-teal-100">
                  <div className="aspect-square bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-4">
                    <Image 
                    src={Hero}
                    alt="clinic Image"
                    />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our comprehensive approach to physiotherapy
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Expert Team",
                description: "Certified professionals with years of experience",
                emoji: "👨‍⚕️",
                color: "from-blue-400 to-blue-600",
              },
              {
                title: "Modern Equipment",
                description: "State-of-the-art facilities and technology",
                emoji: "🏥",
                color: "from-green-400 to-green-600",
              },
              {
                title: "Personalized Care",
                description: "Tailored treatment plans for each patient",
                emoji: "💝",
                color: "from-purple-400 to-purple-600",
              },
              {
                title: "Proven Results",
                description: "98% success rate with satisfied patients",
                emoji: "🎯",
                color: "from-orange-400 to-orange-600",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-teal-100 hover:border-teal-200 transition-all duration-300 group hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature.emoji}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/services">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                View All Services
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Your Recovery?</h2>
            <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto mb-8">
              Take the first step towards better health. Contact us today to schedule your consultation.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold">
                Book Your Appointment Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">We Care Physiotherapy</h3>
                <p className="text-gray-400 text-sm">Your health, our priority</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 We Care Physiotherapy. All rights reserved.</p>
              <p className="text-sm text-gray-500 mt-1">Made with ❤️ for better health</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

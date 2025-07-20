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

export default function ServicesPage() {
  const services = [
    {
      title: "Manual Therapy",
      description:
        "Hands-on techniques including joint mobilization, soft tissue massage, and myofascial release to improve mobility and reduce pain.",
      features: ["Joint Mobilization", "Soft Tissue Massage", "Trigger Point Release", "Myofascial Release"],
      emoji: "🤲",
      gradient: "from-blue-400 to-blue-600",
      duration: "45-60 minutes",
      price: "₹800-1200",
    },
    {
      title: "Exercise Therapy",
      description:
        "Customized exercise programs designed to strengthen muscles, improve flexibility, and restore functional movement patterns.",
      features: ["Strength Training", "Flexibility Exercises", "Balance Training", "Functional Movement"],
      emoji: "💪",
      gradient: "from-green-400 to-green-600",
      duration: "30-45 minutes",
      price: "₹600-900",
    },
    {
      title: "Sports Rehabilitation",
      description:
        "Specialized treatment for sports-related injuries with focus on returning athletes to peak performance safely.",
      features: ["Injury Assessment", "Performance Enhancement", "Return-to-Sport Programs", "Injury Prevention"],
      emoji: "⚽",
      gradient: "from-orange-400 to-orange-600",
      duration: "60-90 minutes",
      price: "₹1000-1500",
    },
    {
      title: "Pain Management",
      description:
        "Advanced techniques for chronic pain relief using evidence-based approaches and modern therapeutic methods.",
      features: ["Chronic Pain Relief", "TENS Therapy", "Heat/Cold Therapy", "Pain Education"],
      emoji: "🎯",
      gradient: "from-purple-400 to-purple-600",
      duration: "45-60 minutes",
      price: "₹700-1000",
    },
    {
      title: "Post-Surgery Care",
      description:
        "Comprehensive rehabilitation programs following surgical procedures to ensure optimal recovery and function.",
      features: ["Post-Op Rehabilitation", "Scar Management", "Mobility Restoration", "Strength Recovery"],
      emoji: "🏥",
      gradient: "from-red-400 to-red-600",
      duration: "60-75 minutes",
      price: "₹900-1300",
    },
    {
      title: "Wellness Programs",
      description:
        "Preventive care and lifestyle improvement plans to maintain optimal health and prevent future injuries.",
      features: ["Health Screening", "Posture Correction", "Ergonomic Assessment", "Lifestyle Coaching"],
      emoji: "🌟",
      gradient: "from-teal-400 to-teal-600",
      duration: "30-45 minutes",
      price: "₹500-800",
    },
  ]

  const specialties = [
    { name: "Orthopedic Physiotherapy", icon: "🦴" },
    { name: "Neurological Rehabilitation", icon: "🧠" },
    { name: "Pediatric Physiotherapy", icon: "👶" },
    { name: "Geriatric Care", icon: "👴" },
    { name: "Women's Health", icon: "👩" },
    { name: "Respiratory Therapy", icon: "🫁" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-teal-600">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive physiotherapy treatments tailored to your specific needs. Our expert team uses
              evidence-based approaches to help you achieve optimal health and mobility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-teal-100 hover:border-teal-200 transition-all duration-300 group hover:shadow-xl">
                  <CardContent className="p-6 sm:p-8">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {service.emoji}
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors text-center">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 text-center">{service.description}</p>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Duration:</span>
                        <span className="font-medium text-gray-700">{service.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Price Range:</span>
                        <span className="font-medium text-teal-600">{service.price}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Specialties</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              We specialize in various areas of physiotherapy to provide comprehensive care
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {specialties.map((specialty, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-all duration-300 group border-teal-100 hover:border-teal-200">
                  <CardContent className="p-0">
                    <motion.div
                      className="text-3xl sm:text-4xl mb-3"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {specialty.icon}
                    </motion.div>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-teal-600 transition-colors">
                      {specialty.name}
                    </h3>
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
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Begin Your Treatment?</h2>
            <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto mb-8">
              Our experienced physiotherapists are here to help you recover and achieve your health goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg font-semibold w-full sm:w-auto"
                >
                  Book Consultation
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-3 text-lg w-full sm:w-auto bg-transparent"
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Calendar, MessageCircle } from "lucide-react"

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

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      info: "+91 98765 43210",
      subInfo: "Available 9 AM - 8 PM",
      action: "tel:+919876543210",
      gradient: "from-green-400 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      info: "info@wecarephysio.com",
      subInfo: "We'll respond within 24 hours",
      action: "mailto:info@wecarephysio.com",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "Shop No 8, Ratan Orbit Apartment",
      subInfo: "Kalyanpur, Kanpur, 208024",
      action: "#",
      gradient: "from-purple-400 to-purple-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      info: "Mon - Sat: 9 AM - 8 PM",
      subInfo: "Sunday: 10 AM - 6 PM",
      action: "#",
      gradient: "from-orange-400 to-orange-600",
    },
  ]

  const services = [
    "Manual Therapy",
    "Exercise Therapy",
    "Sports Rehabilitation",
    "Pain Management",
    "Post-Surgery Care",
    "Wellness Programs",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div className="text-center mb-16" {...fadeInUp}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Get In <span className="text-teal-600">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to start your journey to better health? Contact us today to schedule your consultation or learn more
              about our physiotherapy services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((contact, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full text-center p-6 hover:shadow-lg transition-all duration-300 group border-teal-100 hover:border-teal-200">
                  <CardContent className="p-0">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${contact.gradient} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <contact.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                      {contact.title}
                    </h3>
                    <a href={contact.action} className="text-gray-700 hover:text-teal-600 transition-colors block mb-1">
                      {contact.info}
                    </a>
                    <p className="text-sm text-gray-500">{contact.subInfo}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 sm:p-8 border-teal-100">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                      <p className="text-gray-600">We'll get back to you within 24 hours</p>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          id="firstName"
                          type="text"
                          required
                          className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          required
                          className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        required
                        rows={4}
                        className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                        placeholder="Tell us about your condition or questions..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg font-semibold"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Quick Booking */}
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Quick Booking</h3>
                      <p className="text-gray-600">Schedule your appointment instantly</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Need immediate assistance? Call us directly for same-day appointments or urgent consultations.
                  </p>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Call Now: +91 98765 43210</Button>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Emergency Contact</h3>
                      <p className="text-gray-600">For urgent medical situations</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    If you're experiencing severe pain or need immediate physiotherapy consultation, don't hesitate to
                    reach out.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Emergency Line:</strong> +91 98765 43210
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Available:</strong> 24/7 for emergencies
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Location Info */}
              <Card className="p-6 sm:p-8 border-teal-100">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Visit Our Clinic</h3>
                      <p className="text-gray-600">Convenient location with parking</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Address:</strong> Shop No 8, Ratan Orbit Apartment
                    </p>
                    <p>Kalyanpur, Kanpur, 208024</p>
                    <p>
                      <strong>Landmarks:</strong> Near Kalyanpur Market
                    </p>
                    <p>
                      <strong>Parking:</strong> Free parking available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                question: "Do I need a referral from a doctor?",
                answer: "No referral is required. You can book directly with us for most physiotherapy services.",
              },
              {
                question: "What should I bring to my first appointment?",
                answer: "Bring comfortable clothing, any medical reports, and a list of current medications.",
              },
              {
                question: "How long is each session?",
                answer: "Sessions typically last 45-60 minutes, depending on your treatment plan.",
              },
              {
                question: "Do you accept insurance?",
                answer: "We accept most major insurance plans. Please contact us to verify your coverage.",
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-teal-100 hover:border-teal-200">
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

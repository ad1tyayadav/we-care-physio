"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-teal-100"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.02 }}>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 animate-pulse opacity-75"></div>
                <span className="text-white font-bold text-lg relative z-10">W</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">We Care</h1>
                <p className="text-sm text-teal-600 font-medium">Physiotherapy</p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  className={`font-medium transition-colors relative ${
                    pathname === item.href ? "text-teal-600" : "text-gray-700 hover:text-teal-600"
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </motion.span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} className="hidden sm:block">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6">Book Appointment</Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-teal-100"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <span
                    className={`block py-2 font-medium transition-colors ${
                      pathname === item.href ? "text-teal-600" : "text-gray-700 hover:text-teal-600"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <Button className="bg-teal-600 hover:bg-teal-700 text-white w-full mt-4">Book Appointment</Button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}

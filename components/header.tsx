"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, User } from "firebase/auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 w-full bg-opacity-40 backdrop-blur-sm shadow-lg z-50 border-b-4 border-orange-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
              {/* <span className="text-white font-bold text-xl">भ</span> */}
              <img src="/logo.png" alt="भ" className="rounded-full"/>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-orange-800">Bhojan</h1>
              <p className="text-sm text-orange-600">मिथिला का स्वाद</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  const element = document.querySelector(item.href)
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
                className="text-orange-800 hover:text-orange-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
            {/* User Profile or Login/Signup Button */}
            {user ? (
              <Link href="/profile">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "Profile"}
                  className="ml-4 w-10 h-10 rounded-full border-2 border-orange-600 object-cover cursor-pointer"
                  title={user.displayName || user.email || "Profile"}
                />
              </Link>
            ) : (
              <Link href="/login">
                <Button className="ml-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200">
                  Login / Signup
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-orange-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-orange-200">
            <div className="flex flex-col space-y-2 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    const element = document.querySelector(item.href)
                    element?.scrollIntoView({ behavior: "smooth" })
                    setIsMenuOpen(false)
                  }}
                  className="text-orange-800 hover:text-orange-600 font-medium py-2 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-left w-full"
                >
                  {item.name}
                </button>
              ))}
              {/* User Profile or Login/Signup Button for Mobile */}
              {user ? (
                <Link href="/profile" className="flex items-center mt-2">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "Profile"}
                    className="w-10 h-10 rounded-full border-2 border-orange-600 object-cover mr-2"
                  />
                  <span className="text-orange-800 font-medium">{user.displayName || user.email}</span>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 w-full">
                    Login / Signup
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

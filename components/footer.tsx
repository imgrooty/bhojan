"use client"

import { Heart, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-800 to-red-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-800 font-bold text-xl">भ</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Bhojan</h3>
                <p className="text-orange-200">मिथिला का स्वाद</p>
              </div>
            </div>
            <p className="text-orange-100 leading-relaxed mb-6 max-w-md">
              Experience the authentic flavors of Mithila cuisine in a warm, traditional setting. Every dish is prepared
              with love and respect for our cultural heritage.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.querySelector("#home")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-orange-200 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-orange-200 hover:text-white transition-colors text-left"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-orange-200 hover:text-white transition-colors text-left"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-orange-200 hover:text-white transition-colors text-left"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="text-orange-200 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-orange-200">
              <p>123 Mithila Street</p>
              <p>Janakpur, Nepal 45600</p>
              <p>Phone: +977-41-520123</p>
              <p>Email: info@bhojan.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-orange-700 mt-8 pt-8 text-center">
          <p className="text-orange-200 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-400" /> for preserving Mithila culture
          </p>
          <p className="text-orange-300 text-sm mt-2">© 2024 Bhojan Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

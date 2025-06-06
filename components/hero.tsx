"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Traditional Mithila Border Design */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-orange-800 mb-4">भोजन</h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-orange-700 mb-6">Bhojan</h2>

          <p className="text-xl md:text-2xl text-orange-600 mb-4 font-medium">मिथिला की पारंपरिक स्वादिष्ट व्यंजन</p>
          <p className="text-lg md:text-xl text-orange-700 mb-8 max-w-2xl mx-auto">
            Experience the authentic flavors of Mithila cuisine, where every dish tells a story of tradition, culture,
            and love.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => {
                const element = document.querySelector("#menu")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              View Menu
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300"
            >
              Book Table
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse delay-100"></div>
            <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse delay-200"></div>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="w-8 h-8 text-orange-600 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}

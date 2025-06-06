"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryImages = [
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Traditional Mithila Dal Bhat",
      title: "Dal Bhat Thali",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Fresh Sattu Paratha",
      title: "Sattu Paratha",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Mithila Fish Curry",
      title: "Fish Curry",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Traditional Thekua",
      title: "Thekua Sweets",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Restaurant Interior",
      title: "Our Restaurant",
    },
    {
      src: "/placeholder.svg?height=400&width=600",
      alt: "Mithila Art Decoration",
      title: "Traditional Decor",
    },
  ]

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">गैलरी</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-orange-700 mb-6">Gallery</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            A visual journey through our delicious dishes and warm, traditional atmosphere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <Card
              key={index}
              className="overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-orange-200 hover:border-orange-400"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-lg font-semibold">{image.title}</h4>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal for enlarged image */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={galleryImages[selectedImage].src || "/placeholder.svg"}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

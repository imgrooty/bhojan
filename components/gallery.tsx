"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { Loader2 } from "lucide-react"

interface GalleryImage {
  id?: string
  src: string
  alt: string
  title: string
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));

      if (querySnapshot.empty) {
        setImages([]);
        return;
      }

      const fetchedImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
      setImages(fetchedImages);
    } catch (err: any) {
      console.error("Error fetching gallery:", err);
      setError("Unable to capture Mithila's beauty at this moment. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, [])

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
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
              <p className="text-lg text-orange-800 font-medium">Capturing Mithila's Beauty...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-orange-100">
              <p className="text-red-600 mb-6 text-lg font-medium">{error}</p>
              <button
                onClick={fetchGallery}
                className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors shadow-lg"
              >
                Retry
              </button>
            </div>
          ) : images.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-orange-100">
              <p className="text-orange-800 text-lg font-medium mb-2">Our gallery is currently empty.</p>
              <p className="text-gray-600">We're out capturing new memories of Mithila. Check back soon!</p>
            </div>
          ) : images.map((image, index) => (
            <Card
              key={image.id || index}
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
        {selectedImage !== null && images[selectedImage] && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
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

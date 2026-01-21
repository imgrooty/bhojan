"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle2 } from "lucide-react"
import { db, isFirebaseConfigured } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if Firebase is configured
    if (!isFirebaseConfigured()) {
      setError("Contact form is currently unavailable. Please email us directly at info@bhojan.com");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Mithila Street", "Janakpur, Nepal", "Pin: 45600"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+977-41-520123", "+977-9841234567"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@bhojan.com", "reservations@bhojan.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Sun: 11:00 AM - 10:00 PM", "Kitchen closes at 9:30 PM"],
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">संपर्क करें</h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-orange-700 mb-6">Contact Us</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch for reservations, catering, or any questions about our authentic
            Mithila cuisine.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h4 className="text-2xl font-bold text-orange-800 mb-8">Get in Touch</h4>
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-2 border-orange-200 hover:border-orange-400 transition-colors duration-300"
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-orange-800">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-gray-700 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <Card className="border-2 border-orange-200">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                  <div className="text-center text-orange-800">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Interactive Map</p>
                    <p className="text-sm">Find us in the heart of Janakpur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-800">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-orange-800">Message Sent!</h4>
                    <p className="text-gray-700">Thank you for reaching out. We'll get back to you soon.</p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-4 border-orange-600 text-orange-600 hover:bg-orange-50"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Your phone number"
                          pattern="[0-9+ \-]{8,20}"
                          title="Please enter a valid phone number"
                          className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What is this regarding?"
                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      />
                    </div>

                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                    <Button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>

                    <p className="text-sm text-gray-600 text-center">We'll get back to you within 24 hours</p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

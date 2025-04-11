"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon, MapPin, Clock, Phone, Globe, Heart, Share2, ShoppingBag, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import { AnimatedToolbar } from "@/components/animated-toolbar"

// Mock data for businesses
const businessesData = [
  {
    id: "1",
    name: "Sunrise Cafe",
    description:
      "A cozy cafe serving specialty coffee, pastries, and breakfast options. Our beans are locally sourced and roasted in small batches to ensure the freshest coffee experience.",
    category: "Cafe",
    rating: 4.8,
    reviewCount: 124,
    address: "123 Main Street, Indiranagar, Bangalore",
    phone: "+91 98765 43210",
    website: "https://sunrisecafe.example.com",
    openHours: "8:00 AM - 10:00 PM",
    priceRange: "₹200 for two",
    location: { lat: 12.9716, lng: 77.5946 }, // Bangalore coordinates
    images: [
      "https://picsum.photos/id/225/600/400",
      "https://picsum.photos/id/431/600/400",
      "https://picsum.photos/id/292/600/400",
    ],
    products: [
      {
        id: "1",
        name: "Specialty House Blend",
        description: "Our signature coffee blend with notes of chocolate and caramel.",
        price: "₹180",
        image: "https://picsum.photos/id/766/200/200",
        category: "Coffee",
      },
      {
        id: "2",
        name: "Artisan Croissant",
        description: "Flaky, buttery croissant made fresh daily.",
        price: "₹120",
        image: "https://picsum.photos/id/431/200/200",
        category: "Pastry",
      },
      {
        id: "3",
        name: "Avocado Toast",
        description: "Sourdough toast topped with avocado, cherry tomatoes, and microgreens.",
        price: "₹250",
        image: "https://picsum.photos/id/292/200/200",
        category: "Breakfast",
      },
      {
        id: "4",
        name: "Sunrise Breakfast Box",
        description: "A complete breakfast with eggs, toast, fruits, and coffee.",
        price: "₹350",
        image: "https://picsum.photos/id/1080/200/200",
        category: "Breakfast",
      },
    ],
    reviews: [
      {
        id: "1",
        user: "Priya M.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Amazing coffee and atmosphere! The staff is very friendly and the pastries are delicious.",
        avatar: "https://picsum.photos/id/64/40/40",
      },
      {
        id: "2",
        user: "Rahul K.",
        rating: 4,
        date: "1 month ago",
        comment: "Great place to work remotely. Good wifi and plenty of power outlets.",
        avatar: "https://picsum.photos/id/65/40/40",
      },
      {
        id: "3",
        user: "Anita S.",
        rating: 5,
        date: "2 months ago",
        comment: "The avocado toast is to die for! Definitely coming back for more.",
        avatar: "https://picsum.photos/id/66/40/40",
      },
    ],
  },
  {
    id: "2",
    name: "Page Turner Books",
    description:
      "Independent bookstore with a curated collection of fiction and non-fiction titles. We also host regular author events and book clubs.",
    category: "Bookstore",
    rating: 4.9,
    reviewCount: 98,
    address: "456 Book Lane, Koramangala, Bangalore",
    phone: "+91 98765 43211",
    website: "https://pageturner.example.com",
    openHours: "10:00 AM - 8:00 PM",
    priceRange: "₹500 avg. purchase",
    location: { lat: 12.9352, lng: 77.6245 }, // Koramangala coordinates
    images: [
      "https://picsum.photos/id/169/600/400",
      "https://picsum.photos/id/24/600/400",
      "https://picsum.photos/id/42/600/400",
    ],
    products: [
      {
        id: "1",
        name: "Classic Novel Collection",
        description: "Set of 5 classic novels in hardcover edition.",
        price: "₹1,200",
        image: "https://picsum.photos/id/24/200/200",
        category: "Books",
      },
      {
        id: "2",
        name: "Contemporary Fiction",
        description: "Latest bestsellers and award-winning fiction.",
        price: "₹450",
        image: "https://picsum.photos/id/169/200/200",
        category: "Books",
      },
      {
        id: "3",
        name: "Children's Book Bundle",
        description: "Collection of illustrated children's books for ages 5-10.",
        price: "₹800",
        image: "https://picsum.photos/id/20/200/200",
        category: "Books",
      },
      {
        id: "4",
        name: "Bookworm Membership",
        description: "Annual membership with discounts and exclusive events.",
        price: "₹1,500",
        image: "https://picsum.photos/id/42/200/200",
        category: "Membership",
      },
    ],
    reviews: [
      {
        id: "1",
        user: "Vikram S.",
        rating: 5,
        date: "1 week ago",
        comment: "Wonderful selection of books and very knowledgeable staff. My favorite bookstore in the city!",
        avatar: "https://picsum.photos/id/91/40/40",
      },
      {
        id: "2",
        user: "Meera P.",
        rating: 5,
        date: "3 weeks ago",
        comment: "Attended a book reading event here and it was fantastic. Great community space.",
        avatar: "https://picsum.photos/id/92/40/40",
      },
      {
        id: "3",
        user: "Arjun K.",
        rating: 4,
        date: "2 months ago",
        comment: "Good collection but can be a bit pricey. The ambiance makes up for it though.",
        avatar: "https://picsum.photos/id/93/40/40",
      },
    ],
  },
]

export default function BusinessPage() {
  const params = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [businessData, setBusinessData] = useState<any>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>("AIzaSyDPHxEqtnfuuQmyEFVWcxb7KWyOhRXrNN8")

  useEffect(() => {
    // Find the business data based on the ID from the URL
    const id = params?.id as string
    const business = businessesData.find((b) => b.id === id)

    if (business) {
      setBusinessData(business)
    } else {
      // If we can't find the business with the given ID, use the first one as a fallback
      setBusinessData(businessesData[0])
    }
  }, [params])

  useEffect(() => {
    // Use the pre-defined API key directly instead of checking localStorage
    loadGoogleMapsScript(googleMapsApiKey)

    // Store it in localStorage for future use
    localStorage.setItem("googleMapsApiKey", googleMapsApiKey)
  }, [googleMapsApiKey])

  const loadGoogleMapsScript = (apiKey: string) => {
    // Remove any existing Google Maps scripts
    const existingScript = document.getElementById("google-maps-script")
    if (existingScript) {
      existingScript.remove()
    }

    // Load Google Maps script
    const script = document.createElement("script")
    script.id = "google-maps-script"
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      setIsMapLoaded(true)
      setMapError(null)
      initializeMap() // Call initialize map after script loads
    }
    script.onerror = () => {
      setMapError("Failed to load Google Maps. Please check your API key.")
    }
    document.head.appendChild(script)
  }

  // Add a separate function to initialize the map
  const initializeMap = () => {
    if (businessData && window.google) {
      const mapElement = document.getElementById("google-map")
      if (mapElement) {
        try {
          const map = new window.google.maps.Map(mapElement, {
            center: businessData.location,
            zoom: 15,
          })
          new window.google.maps.Marker({
            position: businessData.location,
            map,
            title: businessData.name,
          })
        } catch (error) {
          setMapError("Error initializing Google Maps. Please check your API key.")
        }
      }
    }
  }

  useEffect(() => {
    if (isMapLoaded && businessData) {
      initializeMap()
    }
  }, [isMapLoaded, businessData])

  if (!businessData) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnimatedToolbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading business details...</h1>
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedToolbar />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <motion.img
            src={businessData.images[activeImage]}
            alt={businessData.name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge className="mb-3 rounded-full">{businessData.category}</Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{businessData.name}</h1>
                <div className="flex items-center gap-2 text-white mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="ml-1 font-medium">{businessData.rating}</span>
                  </div>
                  <span>•</span>
                  <span>{businessData.reviewCount} reviews</span>
                  <span>•</span>
                  <span>{businessData.priceRange}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{businessData.address}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{businessData.openHours}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30">
              <Share2 className="h-5 w-5 text-white" />
            </Button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {businessData.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${activeImage === index ? "bg-white" : "bg-white/50"} transition-all`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="mb-8">
                <TabsList className="grid w-full grid-cols-4 rounded-full p-1">
                  <TabsTrigger value="about" className="rounded-full">
                    About
                  </TabsTrigger>
                  <TabsTrigger value="products" className="rounded-full">
                    Products
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-full">
                    Reviews
                  </TabsTrigger>
                  <TabsTrigger value="photos" className="rounded-full">
                    Photos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6">
                  <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>About {businessData.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-6">{businessData.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Contact Information</h3>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>{businessData.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <a
                                  href={businessData.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {businessData.website.replace("https://", "")}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Business Hours</h3>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span>Monday - Friday</span>
                                <span>{businessData.openHours}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Saturday - Sunday</span>
                                <span>9:00 AM - 11:00 PM</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">Location</h3>
                          {!isMapLoaded && !mapError && (
                            <div className="relative">
                              <div
                                id="google-map"
                                className="h-[200px] rounded-xl overflow-hidden"
                                style={{ background: "#f0f0f0" }}
                              >
                                <div className="h-full flex items-center justify-center">
                                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                                  <p className="ml-2 text-sm text-muted-foreground">Loading map...</p>
                                </div>
                              </div>
                            </div>
                          )}
                          {mapError && (
                            <div className="h-[200px] rounded-xl overflow-hidden bg-red-50 flex items-center justify-center p-4">
                              <div className="text-center">
                                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                <p className="text-red-600 mb-2">{mapError}</p>
                                <Button onClick={() => loadGoogleMapsScript(googleMapsApiKey)} size="sm">
                                  Retry Loading Map
                                </Button>
                              </div>
                            </div>
                          )}
                          {isMapLoaded && !mapError && (
                            <div
                              id="google-map"
                              className="h-[200px] rounded-xl overflow-hidden"
                              style={{ background: "#f0f0f0" }}
                            ></div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="products" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {businessData.products.map((product) => (
                      <ProductCard key={product.id} product={product} businessName={businessData.name} />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Customer Reviews</CardTitle>
                        <Button className="rounded-full">Write a Review</Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {businessData.reviews.map((review) => (
                          <div key={review.id} className="pb-6 border-b last:border-0 last:pb-0">
                            <div className="flex items-start gap-4">
                              <img
                                src={review.avatar || "/placeholder.svg"}
                                alt={review.user}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{review.user}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <StarIcon
                                            key={i}
                                            className={`h-4 w-4 ${
                                              i < review.rating
                                                ? "fill-yellow-500 text-yellow-500"
                                                : "fill-gray-300 text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm text-muted-foreground">{review.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <p className="mt-2">{review.comment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="photos" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[...Array(9)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="aspect-square rounded-xl overflow-hidden"
                      >
                        <img
                          src={`https://picsum.photos/id/${index + 10}/300/300`}
                          alt={`${businessData.name} photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="rounded-3xl overflow-hidden border-0 shadow-md sticky top-20">
                <CardHeader>
                  <CardTitle>Order Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>Get {businessData.name} products delivered to your doorstep.</p>
                    <Button className="w-full rounded-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Order Now
                    </Button>
                    <div className="text-sm text-muted-foreground">
                      <p>Delivery available within 5 km</p>
                      <p>Estimated delivery time: 30-45 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

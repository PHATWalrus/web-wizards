"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarIcon, Heart, ShoppingBag, Share2, Eye, Clock } from "lucide-react"
import { motion } from "framer-motion"

// Mock products data
const products = [
  {
    id: "1",
    name: "Specialty House Blend",
    description:
      "Our signature coffee blend with notes of chocolate and caramel. Sourced from ethically grown beans and roasted in small batches to ensure the freshest coffee experience. Perfect for morning brews or afternoon pick-me-ups.",
    price: "₹180",
    image: "https://picsum.photos/id/766/600/400",
    category: "Coffee",
    businessName: "Sunrise Cafe",
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    images: [
      "https://picsum.photos/id/766/600/400",
      "https://picsum.photos/id/431/600/400",
      "https://picsum.photos/id/225/600/400",
    ],
    reviews: [
      {
        id: "1",
        user: "Priya M.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Amazing coffee! Rich flavor and perfect balance.",
        avatar: "https://picsum.photos/id/64/40/40",
      },
      {
        id: "2",
        user: "Rahul K.",
        rating: 4,
        date: "1 month ago",
        comment: "Great taste, but a bit pricey. Still worth it for the quality.",
        avatar: "https://picsum.photos/id/65/40/40",
      },
    ],
  },
  {
    id: "2",
    name: "Artisan Croissant",
    description:
      "Flaky, buttery croissant made fresh daily. Our pastry chefs use traditional French techniques and the finest ingredients to create these delicious treats. Each croissant is hand-rolled and baked to perfection.",
    price: "₹120",
    image: "https://picsum.photos/id/431/600/400",
    category: "Pastry",
    businessName: "Sunrise Cafe",
    rating: 4.9,
    reviewCount: 36,
    inStock: true,
    images: [
      "https://picsum.photos/id/431/600/400",
      "https://picsum.photos/id/292/600/400",
      "https://picsum.photos/id/225/600/400",
    ],
    reviews: [
      {
        id: "1",
        user: "Anita S.",
        rating: 5,
        date: "3 weeks ago",
        comment: "The best croissants in the city! So buttery and flaky.",
        avatar: "https://picsum.photos/id/66/40/40",
      },
    ],
  },
  {
    id: "3",
    name: "Classic Novel Collection",
    description:
      "Set of 5 classic novels in hardcover edition. This curated collection includes timeless works from renowned authors, beautifully bound with premium materials. A perfect addition to any home library or a thoughtful gift for book lovers.",
    price: "₹1,200",
    image: "https://picsum.photos/id/24/600/400",
    category: "Books",
    businessName: "Page Turner Books",
    rating: 4.7,
    reviewCount: 28,
    inStock: true,
    images: [
      "https://picsum.photos/id/24/600/400",
      "https://picsum.photos/id/169/600/400",
      "https://picsum.photos/id/42/600/400",
    ],
    reviews: [],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [viewCount, setViewCount] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  useEffect(() => {
    // Find product by ID
    const id = params?.id as string
    const foundProduct = products.find((p) => p.id === id)

    if (foundProduct) {
      setProduct(foundProduct)
      // Initialize random view count
      setViewCount(Math.floor(Math.random() * 100) + 20)
    } else if (products.length > 0) {
      // Fallback to first product if ID not found
      setProduct(products[0])
      setViewCount(Math.floor(Math.random() * 100) + 20)
    }
  }, [params])

  useEffect(() => {
    // Simulate view count increasing
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setViewCount((prev) => prev + 1)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false)
      // Add to cart logic here
    }, 1000)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <AnimatedToolbar />
        <main className="flex-1 pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading product details...</h1>
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
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden aspect-square"
              >
                <img
                  src={product.images[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
                </Button>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                  <Eye className="h-4 w-4" />
                  <span>{viewCount} people viewing</span>
                </div>
              </motion.div>

              <div className="flex gap-2 mt-4">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`rounded-xl overflow-hidden border-2 ${activeImage === index ? "border-primary" : "border-transparent"}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="rounded-full">{product.category}</Badge>
                  <span className="text-sm text-muted-foreground">From {product.businessName}</span>
                </div>

                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    <span className="ml-1 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                  <div className="flex items-center gap-1 ml-4">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Updated recently</span>
                  </div>
                </div>

                <p className="text-2xl font-bold mb-4">{product.price}</p>

                <p className="mb-6">{product.description}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-l-full"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-full"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {product.inStock ? (
                      <span className="text-green-600">In Stock</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="flex-1 rounded-full"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || !product.inStock}
                  >
                    {isAddingToCart ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding to Cart...
                      </div>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>

                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3 rounded-full p-1">
                <TabsTrigger value="details" className="rounded-full">
                  Details
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="shipping" className="rounded-full">
                  Shipping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>{product.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h3 className="font-medium mb-2">Features</h3>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Premium quality</li>
                            <li>Ethically sourced</li>
                            <li>Locally made</li>
                            <li>Sustainable packaging</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Specifications</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Category</span>
                              <span>{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Brand</span>
                              <span>{product.businessName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Weight</span>
                              <span>250g</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-6">
                        {product.reviews.map((review: any) => (
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
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">
                          No reviews yet. Be the first to review this product!
                        </p>
                        <Button className="rounded-full">Write a Review</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Shipping & Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Delivery Information</h3>
                        <p>
                          We offer fast and reliable shipping options to ensure your order reaches you in perfect
                          condition.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Standard Delivery: 3-5 business days (₹50)</li>
                          <li>Express Delivery: 1-2 business days (₹100)</li>
                          <li>Free shipping on orders above ₹500</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Return Policy</h3>
                        <p>
                          We want you to be completely satisfied with your purchase. If you're not happy with your
                          order, we accept returns within 30 days of delivery.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Items must be unused and in original packaging</li>
                          <li>Contact our customer service to initiate a return</li>
                          <li>Refunds are processed within 7-10 business days</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

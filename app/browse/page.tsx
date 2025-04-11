"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { StarIcon, Filter, MapPin, Clock, SearchIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CategorySelector } from "@/components/cuisine-selector"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

const businesses = [
  {
    id: "1",
    title: "Sunrise Cafe",
    description: "Cozy cafe with specialty coffee, pastries, and breakfast options.",
    price: "₹200 for two",
    category: "Cafe",
    rating: 4.8,
    owner: "Priya Sharma",
    location: "Indiranagar",
    image: "https://picsum.photos/id/225/600/400",
    openHours: "8 AM - 10 PM",
  },
  {
    id: "2",
    title: "Page Turner Books",
    description: "Independent bookstore with a curated collection of fiction and non-fiction titles.",
    price: "₹500 avg. purchase",
    category: "Bookstore",
    rating: 4.9,
    owner: "Rahul Mehta",
    location: "Koramangala",
    image: "https://picsum.photos/id/169/600/400",
    openHours: "10 AM - 8 PM",
  },
  {
    id: "3",
    title: "Artisan Bakery",
    description: "Fresh bread, pastries, and cakes made with traditional recipes.",
    price: "₹350 for two",
    category: "Bakery",
    rating: 4.7,
    owner: "Anita Desai",
    location: "Jayanagar",
    image: "https://picsum.photos/id/292/600/400",
    openHours: "7 AM - 9 PM",
  },
  {
    id: "4",
    title: "Green Earth Organics",
    description: "Organic fruits, vegetables, and grocery items from local farmers.",
    price: "₹800 avg. purchase",
    category: "Grocery",
    rating: 4.6,
    owner: "Vikram Singh",
    location: "HSR Layout",
    image: "https://picsum.photos/id/42/600/400",
    openHours: "9 AM - 9 PM",
  },
  {
    id: "5",
    title: "Craft Corner",
    description: "Handmade crafts, art supplies, and workshops for all ages.",
    price: "₹600 avg. purchase",
    category: "Crafts",
    rating: 4.5,
    owner: "Meera Patel",
    location: "Whitefield",
    image: "https://picsum.photos/id/76/600/400",
    openHours: "11 AM - 7 PM",
  },
  {
    id: "6",
    title: "Tech Wizards",
    description: "Computer repairs, accessories, and tech support services.",
    price: "₹1200 avg. service",
    category: "Technology",
    rating: 4.7,
    owner: "Arjun Kumar",
    location: "Electronic City",
    image: "https://picsum.photos/id/0/600/400",
    openHours: "10 AM - 8 PM",
  },
]

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [filteredBusinesses, setFilteredBusinesses] = useState(businesses)
  const [showFilters, setShowFilters] = useState(false)

  // Initialize search query from URL parameters
  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchQuery(search)
    }

    const category = searchParams.get("category")
    if (category) {
      setSelectedCategory(category.toLowerCase())
    }

    const location = searchParams.get("location")
    if (location) {
      setSelectedLocation(location.toLowerCase())
    }
  }, [searchParams])

  useEffect(() => {
    let filtered = [...businesses]

    // Apply search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (business) =>
          business.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((business) => business.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Apply location filter
    if (selectedLocation !== "all") {
      filtered = filtered.filter((business) => business.location.toLowerCase() === selectedLocation.toLowerCase())
    }

    // Apply price filter
    filtered = filtered.filter((business) => {
      // Extract numeric price value
      const price = Number.parseInt(business.price.replace(/[^\d]/g, ""))
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating
      } else if (sortBy === "price-low") {
        const priceA = Number.parseInt(a.price.replace(/[^\d]/g, ""))
        const priceB = Number.parseInt(b.price.replace(/[^\d]/g, ""))
        return priceA - priceB
      } else if (sortBy === "price-high") {
        const priceA = Number.parseInt(a.price.replace(/[^\d]/g, ""))
        const priceB = Number.parseInt(b.price.replace(/[^\d]/g, ""))
        return priceB - priceA
      } else if (sortBy === "name") {
        return a.title.localeCompare(b.title)
      }
      return 0
    })

    setFilteredBusinesses(filtered)
  }, [searchQuery, selectedCategory, selectedLocation, priceRange, sortBy, businesses])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Update URL with search parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (selectedLocation !== "all") params.set("location", selectedLocation)

    router.push(`/browse?${params.toString()}`)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "all" : category)
  }

  const applyFilters = () => {
    // Update URL with all filter parameters
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    if (selectedCategory !== "all") params.set("category", selectedCategory)
    if (selectedLocation !== "all") params.set("location", selectedLocation)
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())
    params.set("sort", sortBy)

    router.push(`/browse?${params.toString()}`)

    // On mobile, hide filters after applying
    if (window.innerWidth < 768) {
      setShowFilters(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16 container py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          Browse Local Businesses
        </motion.h1>

        <div className="mb-8">
          <CategorySelector onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-full md:w-64 space-y-6 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <div className="glass-card rounded-3xl p-6 space-y-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="cafe">Cafe</SelectItem>
                      <SelectItem value="bookstore">Bookstore</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="grocery">Grocery</SelectItem>
                      <SelectItem value="crafts">Crafts</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="indiranagar">Indiranagar</SelectItem>
                      <SelectItem value="koramangala">Koramangala</SelectItem>
                      <SelectItem value="jayanagar">Jayanagar</SelectItem>
                      <SelectItem value="hsr layout">HSR Layout</SelectItem>
                      <SelectItem value="whitefield">Whitefield</SelectItem>
                      <SelectItem value="electronic city">Electronic City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range (₹)</label>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={2000} step={100} className="py-4" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="rounded-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full rounded-full" onClick={applyFilters}>
                Apply Filters
              </Button>
            </div>
          </motion.aside>

          {/* Businesses Grid */}
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <form onSubmit={handleSearch} className="flex w-full gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search businesses..."
                    className="rounded-full glass-input pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="rounded-full">
                  Search
                </Button>
              </form>
              <Button className="md:hidden rounded-full" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" />
                {showFilters ? "Hide Filters" : "Filters"}
              </Button>
            </motion.div>

            {filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business, index) => (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <Card className="group overflow-hidden transition-all hover:shadow-lg rounded-3xl border-0 shadow-md h-full flex flex-col">
                      <div className="aspect-video w-full overflow-hidden rounded-t-3xl">
                        <img
                          src={business.image || "/placeholder.svg"}
                          alt={business.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="flex justify-between items-start gap-2">
                          <span>{business.title}</span>
                          <Badge variant="secondary" className="rounded-full px-3">
                            {business.category}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{business.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-3 flex-grow">
                        <div className="flex items-center gap-2">
                          <StarIcon className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm">{business.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{business.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{business.openHours}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <span className="text-lg font-bold">{business.price}</span>
                        <Link href={`/business/${business.id}`}>
                          <Button className="rounded-full">View Details</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <SearchIcon className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No businesses found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedLocation("all")
                    setPriceRange([0, 2000])
                    setSortBy("rating")
                    router.push("/browse")
                  }}
                >
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { motion } from "framer-motion"

const featuredBusinesses = [
  {
    id: 1,
    title: "Sunrise Cafe",
    description: "Cozy cafe with specialty coffee, pastries, and breakfast options.",
    price: "₹200 for two",
    category: "Cafe",
    rating: 4.8,
    image: "https://source.unsplash.com/random/300x200/?cafe",
  },
  {
    id: 2,
    title: "Page Turner Books",
    description: "Independent bookstore with a curated collection of fiction and non-fiction titles.",
    price: "₹500 avg. purchase",
    category: "Bookstore",
    rating: 4.9,
    image: "https://source.unsplash.com/random/300x200/?bookstore",
  },
  {
    id: 3,
    title: "Artisan Bakery",
    description: "Fresh bread, pastries, and cakes made with traditional recipes.",
    price: "₹350 for two",
    category: "Bakery",
    rating: 4.7,
    image: "https://source.unsplash.com/random/300x200/?bakery",
  },
]

export function FeaturedBusinesses() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-neutral-950 dark:to-blue-950">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Local Businesses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover these amazing local businesses that are loved by the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden transition-all hover:shadow-lg rounded-3xl border-0 shadow-md">
                <div className="aspect-video w-full overflow-hidden rounded-t-3xl">
                  <img
                    src={business.image || "/placeholder.svg"}
                    alt={business.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{business.title}</CardTitle>
                      <CardDescription className="mt-2">{business.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-3">
                      {business.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <StarIcon className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{business.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-lg font-bold">{business.price}</span>
                  <Button className="rounded-full">Visit Now</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full px-8">
            View All Businesses
          </Button>
        </div>
      </div>
    </section>
  )
}

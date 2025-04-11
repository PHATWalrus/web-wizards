"use client"

import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Hero } from "@/components/hero"
import { FeaturedBusinesses } from "@/components/featured-businesses"
import { Footer } from "@/components/footer"
import { CategorySelector } from "@/components/cuisine-selector"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedToolbar />
      <main className="flex-1 pt-16">
        <Hero />

        <section className="py-12 px-6">
          <div className="container mx-auto">
            <CategorySelector />
          </div>
        </section>

        <FeaturedBusinesses />
        <FeaturedProducts />

        <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50 dark:from-neutral-950 dark:to-blue-950">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-4">Discover Local Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Shop unique products from local businesses in your neighborhood.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <Link href="/products">
                <Button className="rounded-full px-8">
                  Browse Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        "Dukaan has helped my cafe reach so many new customers. The platform is easy to use and the community is amazing!",
      author: "Priya Sharma",
      role: "Owner, Sunrise Cafe",
    },
    {
      quote:
        "As a small bookstore owner, I've seen a 40% increase in foot traffic since joining Dukaan. Truly a game-changer for local businesses.",
      author: "Rahul Mehta",
      role: "Founder, Page Turner Books",
    },
    {
      quote:
        "The support from the Dukaan team has been exceptional. They really care about helping local businesses thrive.",
      author: "Anita Desai",
      role: "Owner, Artisan Bakery",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Business Owners Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from the local businesses that have joined our marketplace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-6 relative"
            >
              <div className="absolute -top-4 left-6 text-5xl text-primary opacity-30">"</div>
              <p className="mb-6 relative z-10">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

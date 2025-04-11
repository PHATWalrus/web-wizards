"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Home, Store, Heart, ShoppingBag, Menu, X, Bell } from "lucide-react"
import Link from "next/link"
import { NotificationFlyout } from "@/components/notification-flyout"
import { useRouter, usePathname } from "next/navigation"

export function AnimatedToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchValue)}`)
      setSearchValue("")
    }
  }

  const toolbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  }

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  }

  const searchVariants = {
    initial: { width: "200px" },
    focus: { width: "300px", transition: { duration: 0.3 } },
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <>
      <motion.div
        variants={toolbarVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled ? "bg-white/90 dark:bg-black/90 shadow-md backdrop-blur-lg" : "bg-transparent dark:bg-transparent"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold"
              >
                <span>D</span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                ></motion.span>
              </motion.div>
              <span className="hidden font-bold sm:inline-block">Dukaan</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <form onSubmit={handleSearch} className="relative">
              <motion.div variants={searchVariants} initial="initial" whileFocus="focus" className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search local businesses..."
                  className="pl-10 pr-4 py-2 rounded-full w-[200px] md:w-[250px] lg:w-[350px] glass-input transition-all duration-300 focus:w-[280px] md:focus:w-[300px] lg:focus:w-[400px]"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </motion.div>
              <button type="submit" className="hidden">
                Search
              </button>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                <Button variant={isActive("/") ? "default" : "ghost"} size="icon" className="rounded-full">
                  <Home className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/browse">
              <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                <Button variant={isActive("/browse") ? "default" : "ghost"} size="icon" className="rounded-full">
                  <Store className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/favorites">
              <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                <Button variant={isActive("/favorites") ? "default" : "ghost"} size="icon" className="rounded-full">
                  <Heart className="h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/cart">
              <motion.div variants={iconVariants} initial="initial" whileHover="hover">
                <Button variant={isActive("/cart") ? "default" : "ghost"} size="icon" className="rounded-full relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] flex items-center justify-center text-white">
                    3
                  </span>
                </Button>
              </motion.div>
            </Link>
            <motion.div variants={iconVariants} initial="initial" whileHover="hover">
              <NotificationFlyout />
            </motion.div>
            <div className="ml-2 flex space-x-2">
              <Link href="/signin">
                <Button variant="outline" className="rounded-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full">Sign Up</Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 bg-white dark:bg-black md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    <span>D</span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </div>
                  <span className="font-bold">Dukaan</span>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="p-4">
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search local businesses..."
                    className="pl-10 pr-4 py-2 rounded-full glass-input w-full"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button type="submit" className="hidden">
                    Search
                  </button>
                </form>

                <nav className="space-y-6">
                  <Link
                    href="/"
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      isActive("/") ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/browse"
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      isActive("/browse") ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Store className="h-5 w-5" />
                    <span>Browse</span>
                  </Link>
                  <Link
                    href="/favorites"
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      isActive("/favorites") ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Heart className="h-5 w-5" />
                    <span>Favorites</span>
                  </Link>
                  <Link
                    href="/cart"
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      isActive("/cart") ? "bg-primary/10 text-primary" : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Cart</span>
                    <span className="ml-auto w-5 h-5 bg-primary rounded-full text-xs flex items-center justify-center text-white">
                      3
                    </span>
                  </Link>
                  <Link
                    href="/notifications"
                    className={`flex items-center space-x-3 p-2 rounded-lg ${
                      isActive("/notifications")
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                    <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                      2
                    </span>
                  </Link>
                </nav>
              </div>

              <div className="mt-auto p-4 border-t">
                <Link href="/signup">
                  <Button className="w-full rounded-full mb-2" onClick={() => setIsOpen(false)}>
                    Sign Up
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button variant="outline" className="w-full rounded-full" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

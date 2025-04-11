"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, ShoppingBag, Star, Calendar, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: "order" | "promotion" | "review" | "event" | "system"
  title: string
  description: string
  time: string
  read: boolean
  action?: {
    text: string
    url: string
  }
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Confirmed",
    description: "Your order from Sunrise Cafe has been confirmed and is being prepared.",
    time: "5 minutes ago",
    read: false,
    action: {
      text: "View Order",
      url: "/orders/123",
    },
  },
  {
    id: "2",
    type: "promotion",
    title: "Weekend Sale",
    description: "Get 15% off on all products from Artisan Bakery this weekend!",
    time: "2 hours ago",
    read: false,
    action: {
      text: "Shop Now",
      url: "/business/artisan-bakery",
    },
  },
  {
    id: "3",
    type: "review",
    title: "New Review Response",
    description: "The owner of Page Turner Books has responded to your review.",
    time: "Yesterday",
    read: true,
    action: {
      text: "See Response",
      url: "/profile/reviews",
    },
  },
  {
    id: "4",
    type: "event",
    title: "Upcoming Event",
    description: "Don't forget: Local Business Networking Breakfast is tomorrow at 8 AM.",
    time: "Yesterday",
    read: true,
    action: {
      text: "View Event",
      url: "/events/456",
    },
  },
  {
    id: "5",
    type: "system",
    title: "Account Verified",
    description: "Your account has been successfully verified. Enjoy all features of Dukaan!",
    time: "3 days ago",
    read: true,
  },
]

export function NotificationFlyout() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(0)
  const flyoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const count = notifications.filter((notification) => !notification.read).length
    setUnreadCount(count)
  }, [notifications])

  useEffect(() => {
    // Handle clicks outside the flyout to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Handle escape key to close the flyout
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "promotion":
        return <Tag className="h-5 w-5 text-green-500" />
      case "review":
        return <Star className="h-5 w-5 text-yellow-500" />
      case "event":
        return <Calendar className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={flyoutRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden z-50"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-lg">Notifications</h3>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-primary hover:text-primary/90"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-y-auto" style={{ maxHeight: "60vh" }}>
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {getNotificationIcon(notification.type)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <p className="font-medium truncate">{notification.title}</p>
                              {!notification.read && <Badge className="ml-2 rounded-full h-2 w-2 p-0 bg-blue-500" />}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{notification.description}</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {notification.time}
                              </span>
                              {notification.action && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-7 text-primary hover:text-primary/90"
                                  asChild
                                >
                                  <a href={notification.action.url}>{notification.action.text}</a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <Bell className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-base font-medium">No notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      You're all caught up! Check back later for updates from Dukaan.
                    </p>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Button variant="outline" className="w-full rounded-full text-sm" asChild>
                    <a href="/notifications">View All Notifications</a>
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

"use client"

import { useState } from "react"
import { AnimatedToolbar } from "@/components/animated-toolbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, ShoppingBag, Tag, Star, Calendar, Check, Filter, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface Notification {
  id: string
  type: "order" | "promotion" | "review" | "event" | "system"
  title: string
  description: string
  time: string
  date: string
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
    description: "Your order #12345 from Sunrise Cafe has been confirmed and is being prepared.",
    time: "5 minutes ago",
    date: "Today",
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
    description: "Get 15% off on all products from Artisan Bakery this weekend! Use code WEEKEND15 at checkout.",
    time: "2 hours ago",
    date: "Today",
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
    description:
      "The owner of Page Turner Books has responded to your review: 'Thank you for your kind words! We're glad you enjoyed our collection.'",
    time: "Yesterday",
    date: "May 10, 2023",
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
    description:
      "Don't forget: Local Business Networking Breakfast is tomorrow at 8 AM at Sunrise Cafe. 15 people are attending.",
    time: "Yesterday",
    date: "May 10, 2023",
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
    description: "Your account has been successfully verified. Enjoy all features of LocalMarket!",
    time: "3 days ago",
    date: "May 8, 2023",
    read: true,
  },
  {
    id: "6",
    type: "order",
    title: "Order Delivered",
    description: "Your order from Green Earth Organics has been delivered. Enjoy your fresh organic produce!",
    time: "4 days ago",
    date: "May 7, 2023",
    read: true,
    action: {
      text: "Leave Review",
      url: "/review/create",
    },
  },
  {
    id: "7",
    type: "promotion",
    title: "New Business Alert",
    description: "A new craft shop 'Handmade Heaven' has opened near you. Check out their handcrafted items!",
    time: "1 week ago",
    date: "May 4, 2023",
    read: true,
    action: {
      text: "Explore",
      url: "/business/handmade-heaven",
    },
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filterNotifications = (type: string) => {
    if (type === "all") {
      return notifications
    } else if (type === "unread") {
      return notifications.filter((notification) => !notification.read)
    } else {
      return notifications.filter((notification) => notification.type === type)
    }
  }

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

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedToolbar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground mt-1">Stay updated with important information about your activity</p>
            </motion.div>

            {unreadCount > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button onClick={markAllAsRead} variant="outline" className="mt-4 md:mt-0 rounded-full">
                  <Check className="mr-2 h-4 w-4" />
                  Mark all as read
                </Button>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="rounded-3xl overflow-hidden border-0 shadow-md sticky top-20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <Button
                      variant={activeFilter === "all" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("all")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      All Notifications
                      <span className="ml-auto bg-muted rounded-full px-2 py-0.5 text-xs">{notifications.length}</span>
                    </Button>
                    <Button
                      variant={activeFilter === "unread" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("unread")}
                    >
                      <div className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
                      Unread
                      <span className="ml-auto bg-muted rounded-full px-2 py-0.5 text-xs">{unreadCount}</span>
                    </Button>
                    <Button
                      variant={activeFilter === "order" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("order")}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4 text-blue-500" />
                      Orders
                    </Button>
                    <Button
                      variant={activeFilter === "promotion" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("promotion")}
                    >
                      <Tag className="mr-2 h-4 w-4 text-green-500" />
                      Promotions
                    </Button>
                    <Button
                      variant={activeFilter === "review" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("review")}
                    >
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      Reviews
                    </Button>
                    <Button
                      variant={activeFilter === "event" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("event")}
                    >
                      <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                      Events
                    </Button>
                    <Button
                      variant={activeFilter === "system" ? "default" : "ghost"}
                      className="w-full justify-start rounded-lg"
                      onClick={() => setActiveFilter("system")}
                    >
                      <Bell className="mr-2 h-4 w-4 text-gray-500" />
                      System
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="rounded-3xl overflow-hidden border-0 shadow-md">
                <CardHeader>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-full p-1">
                      <TabsTrigger value="all" className="rounded-full">
                        All
                      </TabsTrigger>
                      <TabsTrigger value="unread" className="rounded-full">
                        Unread ({unreadCount})
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {filterNotifications(activeFilter).length > 0 ? (
                      filterNotifications(activeFilter).map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className={`p-4 rounded-xl mb-2 ${
                            !notification.read
                              ? "bg-blue-50 dark:bg-blue-900/20"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-primary/10">
                                  {getNotificationIcon(notification.type)}
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between">
                                <p className="font-medium">
                                  {notification.title}
                                  {!notification.read && (
                                    <span className="ml-2 inline-block h-2 w-2 rounded-full bg-blue-500" />
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {notification.time}
                                </p>
                              </div>
                              <p className="text-sm mt-1">{notification.description}</p>
                              <div className="flex justify-between items-center mt-2">
                                <p className="text-xs text-muted-foreground">{notification.date}</p>
                                {notification.action && (
                                  <Button className="h-8 rounded-full text-xs" size="sm" asChild>
                                    <a href={notification.action.url}>{notification.action.text}</a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="py-12 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                          <Bell className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No notifications found</h3>
                        <p className="text-muted-foreground mt-1">
                          {activeFilter === "unread"
                            ? "You have read all your notifications"
                            : "No notifications match your current filter"}
                        </p>
                      </div>
                    )}
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

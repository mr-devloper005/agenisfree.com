"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Tag,
  MessageSquare,
  Heart,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Calendar,
  Settings,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavbarShell } from "@/components/shared/navbar-shell"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { loadFromStorage, storageKeys } from "@/lib/local-storage"
import type { Article, Listing, ClassifiedAd } from "@/types"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const recentActivity = [
  {
    id: 1,
    type: "message",
    user: "Jordan Lee",
    action: "asked about availability on",
    target: "Sony A7IV Camera Kit",
    time: "12 min ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    type: "save",
    user: "Priya Desai",
    action: "saved your ad",
    target: "Vintage Mid-Century Sofa",
    time: "28 min ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    type: "message",
    user: "Alex Rivera",
    action: "requested pickup window for",
    target: "Herman Miller Aeron Chair",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    type: "view",
    user: "Marketplace",
    action: "Your MacBook ad crossed",
    target: "200 views today",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const viewWeights = [0.14, 0.12, 0.15, 0.13, 0.16, 0.14, 0.16]
const viewDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function DashboardPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const [storedArticles, setStoredArticles] = useState<Article[]>([])
  const [storedListings, setStoredListings] = useState<Listing[]>([])
  const [storedAds, setStoredAds] = useState<ClassifiedAd[]>([])

  const loadDashboardData = () => {
    setStoredArticles(loadFromStorage<Article[]>(storageKeys.articles, []))
    setStoredListings(loadFromStorage<Listing[]>(storageKeys.listings, []))
    setStoredAds(loadFromStorage<ClassifiedAd[]>(storageKeys.ads, []))
  }

  useEffect(() => {
    loadDashboardData()
    const handleStorage = (event: StorageEvent) => {
      if (!event.key || !event.key.startsWith("nexus-")) return
      loadDashboardData()
    }
    const handleProfileUpdate = () => loadDashboardData()
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadDashboardData()
      }
    }
    window.addEventListener("storage", handleStorage)
    window.addEventListener("nexus-profile-updated", handleProfileUpdate)
    document.addEventListener("visibilitychange", handleVisibility)
    return () => {
      window.removeEventListener("storage", handleStorage)
      window.removeEventListener("nexus-profile-updated", handleProfileUpdate)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  const userArticles = useMemo(
    () => (user ? storedArticles.filter((article) => article.author.id === user.id) : []),
    [storedArticles, user]
  )
  const userListings = useMemo(
    () => (user ? storedListings.filter((listing) => listing.owner.id === user.id) : []),
    [storedListings, user]
  )
  const userAds = useMemo(
    () => (user ? storedAds.filter((ad) => ad.seller.id === user.id) : []),
    [storedAds, user]
  )

  const totalViews = useMemo(
    () =>
      userArticles.reduce((sum, article) => sum + (article.views || 0), 0) +
      userAds.reduce((sum, ad) => sum + (ad.views || 0), 0),
    [userAds, userArticles]
  )
  const totalSaves = useMemo(
    () => userAds.reduce((sum, ad) => sum + (ad.saves || 0), 0),
    [userAds]
  )
  const activeAds = useMemo(() => userAds.filter((ad) => ad.status === "active").length, [userAds])

  const statsData = useMemo(
    () => [
      {
        title: "Ad views",
        value: totalViews.toLocaleString(),
        change: "Live",
        trend: "up",
        icon: Eye,
      },
      {
        title: "Active ads",
        value: activeAds.toLocaleString(),
        change: "Now",
        trend: "up",
        icon: LayoutDashboard,
      },
      {
        title: "Saves on your ads",
        value: totalSaves.toLocaleString(),
        change: "Live",
        trend: totalSaves > 0 ? "up" : "down",
        icon: Heart,
      },
      {
        title: "Inbox threads",
        value: "—",
        change: "Soon",
        trend: "up",
        icon: MessageSquare,
      },
    ],
    [activeAds, totalSaves, totalViews]
  )

  const viewsData = useMemo(() => {
    const total = totalViews || 0
    const distributed = viewWeights.map((weight) => Math.round(total * weight))
    const diff = total - distributed.reduce((sum, value) => sum + value, 0)
    if (diff !== 0) {
      distributed[distributed.length - 1] += diff
    }
    return viewDays.map((name, index) => ({ name, views: distributed[index] || 0 }))
  }, [totalViews])

  const contentData = useMemo(
    () => [
      { name: "Live ads", count: userAds.filter((a) => a.status === "active").length },
      { name: "Paused", count: userAds.filter((a) => a.status !== "active" && a.status !== "sold").length },
      { name: "Sold", count: userAds.filter((a) => a.status === "sold").length },
    ],
    [userAds]
  )

  const myContent = useMemo(
    () => ({
      articles: userArticles.map((article) => ({
        id: article.id,
        title: article.title,
        status: article.status ?? "published",
        views: article.views ?? 0,
        likes: article.likes ?? 0,
        date: new Date(article.publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
      listings: userListings.map((listing) => ({
        id: listing.id,
        title: listing.title,
        status: listing.status,
        views: 0,
        inquiries: 0,
        date: new Date(listing.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
      ads: userAds.map((ad) => ({
        id: ad.id,
        title: ad.title,
        status: ad.status,
        views: ad.views ?? 0,
        messages: 0,
        price: `$${ad.price.toLocaleString()}`,
        date: new Date(ad.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
    }),
    [userAds, userArticles, userListings]
  )

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground">Seller dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name || "neighbor"}—here is how your classifieds are performing.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/ads/new">
                <Plus className="h-4 w-4 mr-2" />
                Post classified
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_18px_50px_rgba(50,32,24,0.05)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge
                  variant="secondary"
                  className={
                    stat.trend === "up"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Charts & Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Views Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_18px_50px_rgba(50,32,24,0.05)]"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Views across your ads</h2>
                  <p className="text-sm text-muted-foreground">Estimated weekly attention on active classifieds</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    toast({
                      title: "Date range applied",
                      description: "Showing performance for this week.",
                    })
                  }
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  This Week
                </Button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={viewsData}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 shadow-[0_18px_50px_rgba(50,32,24,0.05)]"
            >
              <div className="px-6 pt-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Your classifieds</h2>
              </div>
              <div className="space-y-4 p-6 pt-0">
                {myContent.ads.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-[#e8ddd4] bg-[#faf4ec]/60 px-4 py-8 text-center text-sm text-muted-foreground">
                    No ads yet—publish your first listing to see performance here.
                  </p>
                ) : (
                  myContent.ads.map((ad) => (
                    <div
                      key={ad.id}
                      className="flex items-center justify-between rounded-xl border border-[#efe6de] bg-[#faf7f3]/80 p-4 transition-colors hover:bg-[#f3ebe3]"
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium text-foreground">{ad.title}</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{ad.price}</span>
                          <span>{ad.views} views</span>
                          <span>{ad.messages} messages</span>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-3">
                        <Badge variant={ad.status === "active" ? "default" : ad.status === "sold" ? "secondary" : "outline"}>{ad.status}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/ads/${ad.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/ads/${ad.id}`}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/ads/${ad.id}/edit`}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full rounded-full border-[#e8ddd4]" asChild>
                  <Link href="/dashboard/ads">
                    View all classifieds
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Activity & Quick Actions */}
          <div className="space-y-8">
            {/* Content Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_18px_50px_rgba(50,32,24,0.05)]"
            >
              <h2 className="mb-4 text-lg font-semibold text-foreground">Ad status mix</h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="count"
                      fill="hsl(var(--primary))"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_18px_50px_rgba(50,32,24,0.05)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Recent buyer signals</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/notifications">View all</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={activity.avatar} alt={activity.user} />
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                        {activity.target && (
                          <span className="font-medium"> {activity.target}</span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border border-[#e8ddd4] bg-[#fffdfb]/95 p-6 shadow-[0_18px_50px_rgba(50,32,24,0.05)]"
            >
              <h2 className="mb-4 text-lg font-semibold text-foreground">Quick actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start rounded-xl border-[#e8ddd4]" asChild>
                  <Link href="/dashboard/ads/new">
                    <Tag className="mr-3 h-4 w-4" />
                    Post a classified
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start rounded-xl border-[#e8ddd4]" asChild>
                  <Link href="/classifieds">
                    <Eye className="mr-3 h-4 w-4" />
                    Preview public board
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}


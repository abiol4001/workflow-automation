"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
    LayoutDashboard,
    ShoppingCart,
    Puzzle,
    Workflow,
    Menu,
    X,
    LogOut,
    User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
    userData: {
        id: string;
        email: string;
        name: string;
        image: string;
    }
}

const Sidebar = ({ userData }: Props) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const pathname: string = usePathname();

    const routes = [
        {
            label: "Dashboard",
            path: "dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
        },
        {
            label: "Orders",
            path: "orders",
            icon: ShoppingCart,
            href: "/orders",
        },
        {
            label: "Integrations",
            path: "integrations",
            icon: Puzzle,
            href: "/integrations",
        },
        {
            label: "Automation",
            path: "automation",
            icon: Workflow,
            href: "/automation",
        },
    ]

    const handleSignOut = () => {
        // Add your sign out logic here
        console.log("Sign out clicked")
    }

    const SidebarContent = () => (
        <div className="h-full  flex flex-col">
            <div className="flex-1 py-4">
                <Link href="/dashboard" className="flex items-center pl-6 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#B1924E] rounded-lg flex items-center justify-center font-bold text-white">
                            WF
                        </div>
                        <span className="text-xl font-bold">WorkFlow</span>
                    </div>
                </Link>

                <nav className="px-4">
                    <div className="space-y-2">
                        {routes.map((route) => {
                            const IconComponent = route.icon
                            const isActive = pathname.includes(`/${route.path}`)

                            return (
                                <Link
                                    href={route.href}
                                    key={route.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/10
                                        ${isActive
                                            ? "text-[#B1924E] bg-white/10"
                                            : "text-[#545454] hover:text-white"
                                        }`}
                                >
                                    <IconComponent className={`w-5 h-5 ${isActive ? "text-[#B1924E]" : "text-[#545454] group-hover:text-white"}`} />
                                    <span>{route.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>
            </div>

            {/* User Profile Section */}
            <div className="border-t border-white/10 p-4">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                    <Avatar className="w-8 h-8">
                        <AvatarImage src={userData.image} alt={userData.name} />
                        <AvatarFallback className="bg-[#B1924E] text-white text-sm">
                            {userData.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{userData.name}</p>
                        <p className="text-xs text-[#545454] truncate">{userData.email}</p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSignOut}
                        className="text-[#545454] hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                    >
                        <LogOut className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="left"
                        className="p-0 w-80 border-0"
                    >
                        <div className="flex justify-end p-4 lg:hidden">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsMobileOpen(false)}
                                className="text-white hover:bg-white/10"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Sidebar - Hidden on mobile */}
            <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:z-40">
                <SidebarContent />
            </aside>

            {/* Mobile overlay when sidebar is open */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    )
}

export default Sidebar
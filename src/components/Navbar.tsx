import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bell,
  Menu,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  FileText,
  Search,
  ChevronDown,
  MapPin,
  Bookmark,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockNotifications } from "@/data/mockData";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface NavbarProps {
  isLoggedIn?: boolean;
  userRole?: 'citizen' | 'admin' | 'ngo' | 'officer';
  userName?: string;
}

const publicLinks = [
  { href: "/schemes", label: "Browse Schemes" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
];

const dashboardLinks = {
  citizen: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/schemes", label: "Find Schemes", icon: Search },
    { href: "/applications", label: "My Applications", icon: FileText },
    { href: "/offices", label: "Find Offices", icon: MapPin },
  ],
  admin: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/schemes", label: "Manage Schemes", icon: FileText },
    { href: "/admin/users", label: "Users", icon: User },
  ],
  ngo: [
    { href: "/ngo", label: "Dashboard", icon: LayoutDashboard },
    { href: "/ngo/citizens", label: "Citizens", icon: User },
  ],
  officer: [
    { href: "/officer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/officer/applications", label: "Applications", icon: FileText },
  ],
};

export const Navbar = ({ isLoggedIn = false, userRole = 'citizen', userName = 'User' }: NavbarProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const navLinks = isLoggedIn ? dashboardLinks[userRole] : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">
              Benefits<span className="text-accent">GPS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {isLoggedIn ? (
              navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <Link key={link.href} to={link.href}>
                    <Button
                      variant={isActive ? "nav-active" : "nav"}
                      size="sm"
                      className="gap-2"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })
            ) : (
              publicLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <Button variant="nav" size="sm">
                    {link.label}
                  </Button>
                </Link>
              ))
            )}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadNotifications > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                          {unreadNotifications}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {mockNotifications.slice(0, 3).map((notif) => (
                      <DropdownMenuItem key={notif.id} className="flex flex-col items-start gap-1 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            notif.read ? "bg-muted" : "bg-accent"
                          )} />
                          <span className="font-medium text-sm">{notif.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground ml-4">{notif.message}</span>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center text-accent">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                      <span className="hidden sm:inline">{userName}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-2 mt-8">
                  {isLoggedIn ? (
                    navLinks.map((link) => (
                      <Link 
                        key={link.href} 
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={location.pathname === link.href ? "nav-active" : "nav"}
                          className="w-full justify-start gap-2"
                        >
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Button>
                      </Link>
                    ))
                  ) : (
                    <>
                      {publicLinks.map((link) => (
                        <Link 
                          key={link.href} 
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                        >
                          <Button variant="nav" className="w-full justify-start">
                            {link.label}
                          </Button>
                        </Link>
                      ))}
                      <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">Log in</Button>
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)}>
                          <Button className="w-full">Get Started</Button>
                        </Link>
                      </div>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

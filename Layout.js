
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { 
  Heart, 
  BarChart3, 
  Utensils, 
  Dumbbell, 
  Music2, 
  Brain,
  Trophy,
  Calendar,
  Sparkles,
  Volume2,
  BookOpen,
  Users
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: BarChart3,
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Mood Tracker",
    url: createPageUrl("MoodTracker"),
    icon: Brain,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Nutrition AI",
    url: createPageUrl("Nutrition"),
    icon: Utensils,
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Fitness Coach",
    url: createPageUrl("Fitness"),
    icon: Dumbbell,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Music Therapy",
    url: createPageUrl("Music"),
    icon: Music2,
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "Learn",
    url: createPageUrl("Learn"),
    icon: BookOpen,
    gradient: "from-blue-500 to-green-500"
  },
  {
    title: "Therapy",
    url: createPageUrl("Therapy"),
    icon: Users,
    gradient: "from-pink-500 to-purple-500"
  },
  {
    title: "Calendar",
    url: createPageUrl("Calendar"),
    icon: Calendar,
    gradient: "from-indigo-500 to-blue-500"
  },
  {
    title: "Achievements",
    url: createPageUrl("Achievements"),
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-500"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.log("User not logged in");
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SidebarProvider>
      <style>
        {`
          :root {
            --wellness-primary: #87A96B;
            --wellness-secondary: #6B8CAE;
            --wellness-accent: #E8F5E8;
            --wellness-warm: #F8F6F0;
          }
          
          .wellness-gradient {
            background: linear-gradient(135deg, var(--wellness-primary) 0%, var(--wellness-secondary) 100%);
          }
          
          .glass-morphism {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }
          
          .wellness-card {
            background: linear-gradient(135deg, rgba(135, 169, 107, 0.1) 0%, rgba(107, 140, 174, 0.1) 100%);
            border: 1px solid rgba(135, 169, 107, 0.2);
          }

          .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }

          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}
      </style>
      
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-green-50 to-blue-50">
        <Sidebar className="border-r border-green-100 bg-white/80 backdrop-blur-sm">
          <SidebarHeader className="border-b border-green-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 wellness-gradient rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  StartWell
                </h2>
                <p className="text-xs text-gray-500">AI Wellness Platform</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-green-50 transition-all duration-300 rounded-xl group ${
                          location.pathname === item.url ? 'bg-green-50 border border-green-200' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-700">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {user && (
              <SidebarGroup className="mt-6">
                <div className="wellness-card rounded-xl p-4 mx-2">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800">Your Progress</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Streak</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {user.current_streak || 0} days
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Level</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {user.level || 1}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Points</span>
                      <span className="font-medium text-gray-800">{user.total_points || 0}</span>
                    </div>
                  </div>
                </div>
              </SidebarGroup>
            )}
          </SidebarContent>

          <SidebarFooter className="border-t border-green-100 p-4">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {user.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">Wellness Journey</p>
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
                
                <div className="text-center pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Built by <span className="font-medium text-gray-700">Mithun</span> © 2025
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={() => User.login()}
                  className="w-full wellness-gradient text-white rounded-xl py-2 font-medium hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    Built by <span className="font-medium text-gray-700">Mithun</span> © 2025
                  </p>
                </div>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-green-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                StartWell
              </h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

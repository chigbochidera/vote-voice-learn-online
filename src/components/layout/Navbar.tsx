
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { 
  Search, 
  User, 
  Menu,
  X,
  LogIn,
  Sun,
  Moon
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-myvomyvo-700 dark:text-myvomyvo-300">
              MyVote <span className="text-myvomyvo-500">MyVoice</span>
            </span>
          </Link>
        </div>

        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300">Home</Link>
            <Link to="/courses" className="text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300">Courses</Link>
            <Link to="/about" className="text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300">About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300">Contact</Link>
          </nav>
        )}

        <div className="flex items-center gap-3">
          {!isMobile && (
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {isLoggedIn ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="default" className="bg-myvomyvo-700 hover:bg-myvomyvo-800 text-white">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          )}
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Menu</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4 py-4">
              <Link 
                to="/" 
                className="text-base font-medium text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/courses" 
                className="text-base font-medium text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                to="/about" 
                className="text-base font-medium text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-base font-medium text-gray-700 hover:text-myvomyvo-700 dark:text-gray-200 dark:hover:text-myvomyvo-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

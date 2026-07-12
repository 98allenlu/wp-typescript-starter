import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import headerBg from 'figma:asset/e3b6eecc0d2310357d508011639007ba5941d4de.png';

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Shop",
    path: "/shop",
    children: [
      { name: "Yarn", path: "/shop/yarn" },
      { name: "Handkerchiefs", path: "/shop/handkerchiefs" },
      { name: "Kits", path: "/shop/kits" },
    ],
  },
  {
    name: "Research",
    path: "/research",
    children: [
      { name: "Creation of Color", path: "/research/creation-of-color" },
      { name: "Dyer-Scowerers", path: "/research/dyer-scowerers" },
      { name: "A Weaver's Tale", path: "/research/weavers-tale" },
      { name: "Spotted Handkerchiefs", path: "/research/spotted-handkerchiefs" },
      { name: "Linen Stamping", path: "/research/linen-stamping" },
      { name: "All About Denim", path: "/research/denim" },
      { name: "Tape Loom", path: "/research/tape-loom" },
      { name: "Soapmaking", path: "/research/soapmaking" },
      { name: "Linen Bleaching", path: "/research/linen-bleaching" },
      { name: "Cosmetic Dyes", path: "/research/cosmetic-dyes" },
      { name: "Paper", path: "/research/paper" },
    ],
  },
  { name: "About", path: "/about" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <nav 
      className="w-full sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundImage: `url(${headerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 45%', // Moved down further from 65%
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[170px]"> {/* Increased height from h-24 to h-28 */}
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex flex-col items-start justify-center group">
            <span className="font-headline text-xl md:text-2xl text-black leading-tight group-hover:text-black/80 transition-colors">
              At the Sign of the Rainbow & Dove
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-lg font-heading border-b-2 border-transparent hover:text-accent transition-colors",
                    location.pathname === item.path || location.pathname.startsWith(item.path + "/")
                      ? "text-primary border-primary"
                      : "text-foreground"
                  )}
                >
                  {item.name}
                  {item.children && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>

                {/* Dropdown */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-surface-main ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50 bg-[#FCFBF1]"
                      >
                        <div className="py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.path}
                              className="block px-4 py-2 text-sm font-body text-foreground hover:bg-accent/10 hover:text-accent"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
            
            <div className="flex items-center space-x-4 ml-4 border-l pl-4 border-primary/20">
              <button onClick={() => navigate("/search")} className="text-foreground hover:text-primary transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <Link to="/cart" className="text-foreground hover:text-primary relative transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-body">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="text-foreground hover:text-primary mr-4 relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center font-body">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FCFBF1] border-b border-border shadow-lg"
            style={{
               backgroundImage: `url(${headerBg})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center top',
            }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#FCFBF1]/90 backdrop-blur-sm">
              {navItems.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-heading text-foreground hover:text-primary hover:bg-accent/10">
                    <Link
                      to={item.path}
                      onClick={() => !item.children && setIsOpen(false)}
                      className="flex-grow"
                    >
                      {item.name}
                    </Link>
                    {item.children && (
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="p-1 focus:outline-none"
                      >
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            activeDropdown === item.name ? "rotate-180" : ""
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && activeDropdown === item.name && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm font-body text-muted-foreground hover:text-primary hover:bg-accent/5"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

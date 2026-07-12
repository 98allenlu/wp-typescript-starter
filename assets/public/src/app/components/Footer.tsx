import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import footerEdge from 'figma:asset/51b9f4288acfbdb6d7ca9e02a2a026b7ca18941e.png';

export function Footer() {
  return (
    <footer className="text-primary-foreground font-body mt-auto">
      {/* Decorative top edge */}
      <div className="w-full leading-none translate-y-1">
        <img src={footerEdge} alt="" className="w-full h-auto block" />
      </div>
      
      <div className="bg-primary py-4">
        <div className="w-full px-4 sm:px-6 lg:px-8 -translate-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-headline text-2xl mb-4">At the Sign of the Rainbow & Dove</h3>
              <p className="text-primary-foreground/80 text-sm max-w-xs">
                Specializing in 18th- and 19th-century art, decorative arts, material culture, and women’s history.
              </p>
            </div>
            <div>
              <h4 className="font-heading text-xl mb-4 text-accent">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                <li><Link to="/shop" className="hover:text-accent transition-colors">Shop</Link></li>
                <li><Link to="/research" className="hover:text-accent transition-colors">Research</Link></li>
                <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xl mb-4 text-accent">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-accent transition-colors"><Instagram className="h-6 w-6" /></a>
                <a href="#" className="hover:text-accent transition-colors"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="hover:text-accent transition-colors"><Twitter className="h-6 w-6" /></a>
              </div>
              <p className="text-sm text-primary-foreground/60">
                &copy; {new Date().getFullYear()} At the Sign of the Rainbow & Dove. <br/>All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

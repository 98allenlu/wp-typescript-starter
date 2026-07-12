import React from "react";
import { cn } from "@/lib/utils";
import svgPaths from "@/imports/svg-wb47w8l6ix";
import sectionBg from 'figma:asset/04bf5cb42a5739eaf380966456c9033eb8af5779.png';

interface TornPaperSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  topEdge?: boolean;
  bottomEdge?: boolean;
  backgroundClass?: string;
  showBackgroundTexture?: boolean;
}

export function TornPaperSection({
  children,
  className,
  topEdge = true,
  bottomEdge = true,
  backgroundClass = "bg-background",
  showBackgroundTexture = true,
  ...props
}: TornPaperSectionProps) {
  // Derive the text color class for the SVG from the background class
  // e.g., "bg-primary" -> "text-primary"
  const fillClass = backgroundClass.replace("bg-", "text-");

  return (
    <div 
      className={cn("relative w-full", backgroundClass, className)} 
      style={showBackgroundTexture ? {
        backgroundImage: `url(${sectionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : undefined}
      {...props}
    >
      {/* Top Edge removed as requested */}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Bottom Torn Edge */}
      {/* Bottom Edge removed as requested */}
    </div>
  );
}

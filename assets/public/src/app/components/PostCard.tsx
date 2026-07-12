import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface PostCardProps {
  title: string;
  imageSrc?: string;
  excerpt?: string;
  price?: string;
  category?: string;
  link: string;
  className?: string;
  isProduct?: boolean;
}

export function PostCard({
  title,
  imageSrc,
  excerpt,
  price,
  category,
  link,
  className,
  isProduct = false,
}: PostCardProps) {
  return (
    <Link to={link} className={cn("group block h-full", className)}>
      <div className="bg-card text-card-foreground border border-border/60 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
              No Image
            </div>
          )}
          {category && (
            <span className="absolute top-2 right-2 bg-background/90 text-foreground text-xs font-bold px-2 py-1 rounded shadow-sm">
              {category}
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow bg-[rgb(255,255,255)]">
          <h3 className="font-heading text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          {isProduct && price && (
            <p className="font-body font-bold text-lg text-accent mb-2">{price}</p>
          )}
          {excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
              {excerpt}
            </p>
          )}
          <span className="text-sm font-medium text-primary underline decoration-accent decoration-2 underline-offset-4 mt-auto">
            {isProduct ? "View Product" : "Read More"}
          </span>
        </div>
      </div>
    </Link>
  );
}

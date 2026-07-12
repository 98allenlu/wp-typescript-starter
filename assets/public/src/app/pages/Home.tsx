import React from "react";
import { Link } from "react-router-dom";
import { TornPaperSection } from "@/app/components/TornPaperSection";
import { PostCard } from "@/app/components/PostCard";
import { shopItems, researchPosts } from "@/app/data";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Vector from "@/imports/Vector";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-background">
        <div className="relative z-10 text-center max-w-5xl px-4 flex flex-col items-center mt-[-90px] mr-[0px] mb-[0px] ml-[0px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-[300px] h-[337px] mx-auto mb-6"
          >
            <Vector />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-lg text-foreground/80 mb-10 max-w-md mx-auto"
          >
            Explore the rich history of 18th-century textile arts through research and handcrafted products.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/shop" 
              className="inline-block bg-primary text-primary-foreground font-heading px-8 py-3 rounded-md text-xl hover:bg-primary/90 transition-colors shadow-md"
            >
              Visit the Shop
            </Link>
             <Link 
              to="/research" 
              className="inline-block bg-accent text-accent-foreground font-heading px-8 py-3 rounded-md text-xl hover:bg-accent/90 transition-colors shadow-md"
            >
              Explore Research
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Research */}
      <TornPaperSection backgroundClass="bg-[#FCFBF1]" className="py-20 md:py-32">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mb-2">Recent Research</h2>
              <p className="font-body text-muted-foreground text-lg">Exploring history through color and cloth.</p>
            </div>
            <Link to="/research" className="hidden md:flex items-center text-primary font-heading text-lg hover:text-accent transition-colors">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchPosts.slice(0, 3).map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                imageSrc={post.image}
                excerpt={post.excerpt}
                category={post.category}
                link={`/research/${post.slug}`}
              />
            ))}
          </div>
          
           <div className="mt-12 text-center md:hidden">
            <Link to="/research" className="inline-flex items-center text-primary font-heading text-lg hover:text-accent transition-colors">
              View All Posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </TornPaperSection>

      {/* Featured Shop Items */}
      <section className="bg-background py-20 md:py-32 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mb-2">From the Shop</h2>
              <p className="font-body text-muted-foreground text-lg">Hand-dyed yarns, fabrics, and historical kits.</p>
            </div>
            <Link to="/shop" className="hidden md:flex items-center text-primary font-heading text-lg hover:text-accent transition-colors">
              Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shopItems.slice(0, 3).map((item) => (
              <PostCard
                key={item.id}
                title={item.title}
                imageSrc={item.image}
                price={item.price}
                category={item.category}
                link={`/shop/${item.slug}`}
                isProduct={true}
              />
            ))}
          </div>

           <div className="mt-12 text-center md:hidden">
            <Link to="/shop" className="inline-flex items-center text-primary font-heading text-lg hover:text-accent transition-colors">
              Browse Collection <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

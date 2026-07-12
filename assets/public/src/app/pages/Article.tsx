import React from "react";
import { useParams, Link } from "react-router-dom";
import { TornPaperSection } from "@/app/components/TornPaperSection";
import { researchPosts, shopItems } from "@/app/data";
import { ArrowLeft } from "lucide-react";
import { ProductPage } from "@/app/components/ProductPage";
import { BlogPostPage } from "@/app/components/BlogPostPage";

export default function Article() {
  const { slug, category, subslug } = useParams();
  
  let lookupSlug = slug;
  if (category && subslug) {
    lookupSlug = `${category}/${subslug}`;
  }
  
  // Try to find in posts or products (simplified for demo)
  const post = researchPosts.find(p => p.slug === lookupSlug);
  const product = shopItems.find(p => p.slug === lookupSlug);
  const item = post || product;
  const isProduct = !!product;

  if (!item) {
    return <div className="p-20 text-center">Item not found</div>;
  }

  if (isProduct && product) {
    const related = shopItems.filter(s => s.id !== product.id).slice(0, 4);
    return <ProductPage product={product} relatedProducts={related} />;
  }

  if (!isProduct && post) {
    return <BlogPostPage post={post} allPosts={researchPosts} />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative h-[50vh] w-full">
         <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-12 pt-16">
           <div className="text-center text-white px-4">
             <h1 className="font-headline text-4xl md:text-6xl mb-4 max-w-4xl">{item.title}</h1>
             {!isProduct && post && <p className="text-xl font-body opacity-90">{post.date} • {post.category}</p>}
             {isProduct && product && <p className="text-3xl font-body font-bold text-accent">{product.price}</p>}
           </div>
        </div>
      </div>
      
      <TornPaperSection backgroundClass="bg-white" topEdge={true} bottomEdge={false} className="-mt-10 pt-16 relative z-10">
        <div className="max-w-3xl mx-auto px-4">
           <Link to={isProduct ? "/shop" : "/research"} className="inline-flex items-center text-primary mb-8 hover:text-accent transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to {isProduct ? "Shop" : "Research"}
           </Link>

           <div className="prose prose-lg prose-indigo mx-auto font-body">
              <p className="lead text-xl text-foreground/80 mb-6">
                {isProduct ? "This is a beautiful item available in our shop." : post?.excerpt}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <blockquote>
                "The color of the imagination is the color of the soul."
              </blockquote>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              
              {isProduct && (
                <div className="mt-8 pt-8 border-t border-border">
                  <button className="bg-primary text-primary-foreground font-heading px-8 py-4 rounded-md text-xl hover:bg-primary/90 transition-colors w-full md:w-auto">
                    Add to Cart - {product?.price}
                  </button>
                </div>
              )}
           </div>
        </div>
      </TornPaperSection>
    </div>
  );
}

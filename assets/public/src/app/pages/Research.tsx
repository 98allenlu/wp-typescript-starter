import React from "react";
import { researchPosts } from "@/app/data";
import { PostCard } from "@/app/components/PostCard";
import { PageHeaderShape } from "@/app/components/PageHeaderShape";

export default function Research() {
  const categories = [
    "Creation of Color", 
    "Dyer-Scowerers", 
    "Social History", 
    "Textile History", 
    "Soapmaking", 
    "Paper"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeaderShape fillColor="#7EA172">
        <h1 className="font-headline text-4xl md:text-6xl mx-[0px] my-[13px]">Research & Blog</h1>

      </PageHeaderShape>

      <div className="w-full px-4 sm:px-6 lg:px-8 mt-[-200px] relative z-10 pt-[20px] pr-[32px] pb-[0px] pl-[32px] mb-[0px]">
         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="font-heading text-xl mb-4 text-primary border-b border-border pb-2">Categories</h3>
                <ul className="space-y-3">
                  {categories.map(cat => (
                    <li key={cat}>
                      <button className="text-foreground hover:text-accent transition-colors text-left w-full font-body text-lg">
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {researchPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    title={post.title}
                    imageSrc={post.image}
                    excerpt={post.excerpt}
                    category={post.category}
                    link={`/research/${post.slug}`}
                  />
                ))}
                 {/* Duplicate for demo */}
                  {researchPosts.map((post) => (
                  <PostCard
                    key={`${post.id}-dup`}
                    title={post.title}
                    imageSrc={post.image}
                    excerpt={post.excerpt}
                    category={post.category}
                    link={`/research/${post.slug}`}
                  />
                ))}
              </div>
            </div>
         </div>
      </div>
    </div>
  );
}

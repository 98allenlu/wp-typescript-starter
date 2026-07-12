import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";
import { researchPosts, shopItems } from "@/app/data";

type Filter = "all" | "shop" | "research";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>("all");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSearchParams(query ? { q: query } : {});
  }

  function clearQuery() {
    setQuery("");
    setSearchParams({});
  }

  const term = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!term) return { shop: [], research: [] };

    const shop = shopItems.filter(
      item =>
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
    );

    const research = researchPosts.filter(
      post =>
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term)
    );

    return { shop, research };
  }, [term]);

  const visibleShop = filter === "research" ? [] : results.shop;
  const visibleResearch = filter === "shop" ? [] : results.research;
  const totalCount = visibleShop.length + visibleResearch.length;
  const hasQuery = term.length > 0;

  const FILTERS: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "shop", label: "Shop" },
    { id: "research", label: "Research" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="w-full px-6">

        {/* Search bar */}
        <div className="max-w-2xl mb-10">
          <h1
            style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400 }}
            className="text-foreground mb-6"
          >
            Search
          </h1>
          <form onSubmit={handleSubmit} className="relative">
            <SearchIcon
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "var(--muted-foreground)" }}
            />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles, products, categories…"
              className="w-full border border-border rounded-sm pl-11 pr-10 py-3 bg-input-background focus:outline-none focus:ring-1 focus:ring-ring transition"
              style={{ fontFamily: "var(--font-body)", fontSize: "16px" }}
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={clearQuery}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>

        {/* Filters + count */}
        {hasQuery && (
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--muted-foreground)" }}>
              {totalCount === 0
                ? `No results for "${term}"`
                : `${totalCount} result${totalCount !== 1 ? "s" : ""} for "${term}"`}
            </p>
            <div className="flex gap-2">
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className="px-4 py-1.5 rounded-sm border transition-colors"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "12px",
                    letterSpacing: "0.06em",
                    borderColor: filter === f.id ? "var(--primary)" : "var(--border)",
                    backgroundColor: filter === f.id ? "var(--primary)" : "transparent",
                    color: filter === f.id ? "var(--primary-foreground)" : "var(--foreground)",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty state — no query yet */}
        {!hasQuery && (
          <div className="mt-16 text-center">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--muted-foreground)" }}>
              Start typing to search across the shop and research archive.
            </p>
          </div>
        )}

        {/* No results */}
        {hasQuery && totalCount === 0 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--muted-foreground)" }}>
              Try a different term, or browse below.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link to="/shop" className="px-5 py-2 rounded-sm border border-border hover:border-primary transition-colors" style={{ fontFamily: "var(--font-heading)", fontSize: "13px" }}>
                Browse Shop
              </Link>
              <Link to="/research" className="px-5 py-2 rounded-sm border border-border hover:border-primary transition-colors" style={{ fontFamily: "var(--font-heading)", fontSize: "13px" }}>
                Browse Research
              </Link>
            </div>
          </div>
        )}

        {/* Shop results */}
        {visibleShop.length > 0 && (
          <section className="mb-14">
            <h2
              style={{ fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}
              className="uppercase mb-5"
            >
              Shop — {visibleShop.length} item{visibleShop.length !== 1 ? "s" : ""}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {visibleShop.map(item => (
                <Link key={item.id} to={`/shop/${item.slug}`} className="group flex flex-col gap-3">
                  <div className="aspect-square overflow-hidden bg-muted rounded-sm">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: "14px" }} className="text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}>{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Research results */}
        {visibleResearch.length > 0 && (
          <section>
            <h2
              style={{ fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}
              className="uppercase mb-5"
            >
              Research — {visibleResearch.length} article{visibleResearch.length !== 1 ? "s" : ""}
            </h2>
            <div className="flex flex-col divide-y divide-border border-t border-border">
              {visibleResearch.map(post => (
                <Link key={post.id} to={`/research/${post.slug}`} className="group flex gap-5 py-5 items-center hover:bg-muted/20 transition-colors -mx-2 px-2 rounded-sm">
                  <img src={post.image} alt={post.title} className="w-16 h-16 object-cover rounded-sm bg-muted flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "var(--font-heading)", fontSize: "15px" }} className="text-foreground group-hover:text-primary transition-colors mb-1">{post.title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }} className="line-clamp-1">{post.excerpt}</p>
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--accent)", whiteSpace: "nowrap" }} className="hidden md:block">{post.category}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

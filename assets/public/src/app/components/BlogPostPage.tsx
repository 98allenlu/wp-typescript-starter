import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ResearchPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  slug: string;
  date: string;
}

interface BlogPostPageProps {
  post: ResearchPost;
  allPosts: ResearchPost[];
}

const BODY_PARAGRAPHS = [
  "Before the age of coal tar and aniline dyes, color was a living thing — coaxed from roots, bark, insects, and mineral earths through patient chemical negotiation. The dyer's workshop was equal parts kitchen, laboratory, and alchemist's den. Every dyestuff brought its own demands: some required mordanting with alum or iron to fix the color; others shifted hue depending on the acidity of the bath. A recipe that produced a rich scarlet in one season might yield a muddy orange the next, depending on the quality of the water, the age of the dyestuff, or the weather during harvest.",
  "Colorists of the 18th century inherited centuries of accumulated craft knowledge, passed down through guild apprenticeships and handwritten receipt books. The great treatises — among them Hellot's \"L'Art de la Teinture des Laines\" (1750) and the anonymous \"The Art of Dyeing\" circulating in English workshops — attempted to rationalize this knowledge into reproducible procedures. Yet the gap between the printed recipe and the dye pot remained wide. Skill was embodied: in the hand that tested the temperature of a bath, the eye that read the color shift of a mordanted fiber, the nose that detected the first signs of a fermented woad vat going off.",
  "The palette available to an 18th-century dyer was remarkably broad, even by modern standards. From the New World came cochineal — the dried bodies of a scale insect that yielded the most saturated crimsons and scarlets yet known to European textiles — and logwood, a brazilwood-like heartwood capable of producing blacks, purples, and navy blues depending on the mordant used. From the East came indigo, the dominant blue dyestuff that had replaced woad across Europe by the late 17th century. From the hedgerows and meadows of Europe itself came weld (yellow), woad (a secondary blue), and oak gall (for tannins and grays). Combinations of these, applied in sequence through a process called \"saddening\" or \"brightening,\" opened up the full spectrum.",
  "What distinguished the master dyer from the journeyman was not merely knowledge of ingredients, but an understanding of the fiber itself. Wool and silk, being protein fibers, accepted most mordants readily. Linen and cotton — cellulose fibers — were far more resistant and required different preparatory treatments, often involving tannin baths to provide a surface the mordant could grip. The same dyestuff applied to wool and to linen in the same bath would produce noticeably different results, a phenomenon that skilled dyers exploited to create patterned effects in mixed-fiber cloth.",
];

const PULL_QUOTE = "The dyer's workshop was equal parts kitchen, laboratory, and alchemist's den. Every dyestuff brought its own demands.";

function estimateReadTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(" ").length;
  return Math.max(1, Math.ceil(words / 200));
}

export function BlogPostPage({ post, allPosts }: BlogPostPageProps) {
  const related = allPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const readTime = estimateReadTime(BODY_PARAGRAPHS);

  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">

      {/* Top bar */}
      <div className="w-full pt-20 pb-4 px-6 border-b border-border">
        <div className="flex items-center justify-between">
          <Link
            to="/research"
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}
          >
            <ArrowLeft size={13} />
            Research &amp; Blog
          </Link>
          <span
            style={{ fontFamily: "var(--font-heading)", fontSize: "11px", letterSpacing: "0.1em", color: "var(--accent)" }}
            className="uppercase"
          >
            {post.category}
          </span>
        </div>
      </div>

      {/* Header block */}
      <header className="w-full px-6 pt-12 pb-10 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <h1
            style={{ fontFamily: "var(--font-headline)", fontWeight: 400, lineHeight: 1.1, fontSize: "clamp(36px, 5vw, 64px)" }}
            className="text-foreground mb-6"
          >
            {post.title}
          </h1>
          <p
            style={{ fontFamily: "var(--font-body)", fontSize: "20px", lineHeight: 1.6, color: "var(--muted-foreground)" }}
            className="mb-8 max-w-2xl"
          >
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <span
              style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}
            >
              {post.date}
            </span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span
              style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}
            >
              {readTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* Hero image — full width */}
      <figure className="w-full">
        <div className="w-full" style={{ height: "clamp(280px, 45vw, 560px)" }}>
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        <figcaption
          className="px-6 py-3 border-b border-border"
          style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--muted-foreground)" }}
        >
          Historical textile and dyeing materials, 18th century.
        </figcaption>
      </figure>

      {/* Article body */}
      <article className="w-full px-6 py-16">
        <div className="max-w-2xl mx-auto">

          {/* Drop-cap first paragraph */}
          <p
            className="mb-8 leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:mt-1"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--foreground)",
            }}
            // @ts-ignore
            // eslint-disable-next-line
          >
            <span
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "72px",
                lineHeight: 0.8,
                float: "left",
                marginRight: "8px",
                marginTop: "6px",
                color: "var(--primary)",
              }}
            >
              {BODY_PARAGRAPHS[0][0]}
            </span>
            {BODY_PARAGRAPHS[0].slice(1)}
          </p>

          <p
            className="mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-body)", fontSize: "17px", lineHeight: 1.8 }}
          >
            {BODY_PARAGRAPHS[1]}
          </p>

          {/* Pull quote */}
          <blockquote
            className="my-12 pl-6 border-l-4"
            style={{ borderColor: "var(--accent)" }}
          >
            <p
              style={{
                fontFamily: "var(--font-headline)",
                fontSize: "clamp(22px, 3vw, 30px)",
                fontWeight: 400,
                lineHeight: 1.4,
                color: "var(--primary)",
              }}
            >
              "{PULL_QUOTE}"
            </p>
          </blockquote>

          {BODY_PARAGRAPHS.slice(2).map((para, i) => (
            <p
              key={i}
              className="mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-body)", fontSize: "17px", lineHeight: 1.8 }}
            >
              {para}
            </p>
          ))}

          {/* Section divider */}
          <div className="flex items-center gap-4 my-12">
            <div className="flex-1 border-t border-border" />
            <span style={{ fontFamily: "var(--font-accent)", fontSize: "20px", color: "var(--secondary)" }}>❧</span>
            <div className="flex-1 border-t border-border" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[post.category, "18th Century", "Material Culture", "Textile History"].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-sm border border-border"
                style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--muted-foreground)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Prev / Next navigation */}
      {(prevPost || nextPost) && (
        <nav className="w-full border-t border-border">
          <div className="grid grid-cols-2 divide-x divide-border">
            {prevPost ? (
              <Link
                to={`/research/${prevPost.slug}`}
                className="group flex flex-col gap-1 p-6 hover:bg-muted/30 transition-colors"
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }} className="uppercase flex items-center gap-1">
                  <ArrowLeft size={11} /> Previous
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px" }} className="text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost && (
              <Link
                to={`/research/${nextPost.slug}`}
                className="group flex flex-col gap-1 p-6 hover:bg-muted/30 transition-colors text-right"
              >
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", letterSpacing: "0.08em", color: "var(--muted-foreground)" }} className="uppercase flex items-center gap-1 justify-end">
                  Next <ArrowRight size={11} />
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px" }} className="text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section className="w-full border-t border-border px-6 py-16 bg-muted/20">
          <div className="max-w-3xl mx-auto">
            <h2
              style={{ fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "0.12em", color: "var(--muted-foreground)" }}
              className="uppercase mb-8"
            >
              More in {post.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(item => (
                <Link key={item.id} to={`/research/${item.slug}`} className="group flex flex-col gap-3">
                  <div className="aspect-video overflow-hidden bg-muted rounded-sm">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <p
                      style={{ fontFamily: "var(--font-heading)", fontSize: "14px", lineHeight: 1.4 }}
                      className="text-foreground group-hover:text-primary transition-colors mb-1"
                    >
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--muted-foreground)" }}>
                      {item.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

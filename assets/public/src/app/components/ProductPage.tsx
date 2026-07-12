import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/app/context/CartContext";
import { ArrowLeft, Minus, Plus, ShoppingBag, ChevronDown, ChevronUp, Truck, RotateCcw, ShieldCheck } from "lucide-react";

interface ShopItem {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
  slug: string;
}

interface ProductPageProps {
  product: ShopItem;
  relatedProducts?: ShopItem[];
}

const DETAILS = [
  {
    label: "Product Details",
    content:
      "Handcrafted using traditional methods dating back to the 18th century. Each piece is made with care using natural materials sourced from heritage suppliers. Slight variations in color and texture are inherent to the handmade process and are a mark of authenticity.",
  },
  {
    label: "Care Instructions",
    content:
      "Hand wash in cool water with a gentle, pH-neutral soap. Do not wring or tumble dry. Lay flat to dry away from direct sunlight. Store loosely folded in a breathable cotton bag.",
  },
  {
    label: "Shipping & Returns",
    content:
      "Orders ship within 3–5 business days. Free shipping on orders over $75. Returns accepted within 30 days of delivery for unwashed, unused items in original condition.",
  },
];

function Accordion({ label, content }: { label: string; content: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "14px" }} className="text-foreground">
          {label}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && (
        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px" }} className="text-muted-foreground pb-4 leading-relaxed">
          {content}
        </p>
      )}
    </div>
  );
}

export function ProductPage({ product, relatedProducts = [] }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ""));

  function handleAddToCart() {
    addItem({ id: product.id, title: product.title, price: product.price, image: product.image, slug: product.slug }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      {/* Breadcrumb */}
      <div className="w-full px-6 mb-6">
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-body)", fontSize: "13px" }}
        >
          <ArrowLeft size={14} />
          Back to Shop
        </Link>
      </div>

      {/* Main product grid */}
      <div className="w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden bg-muted rounded-sm">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="absolute top-4 left-4 bg-background px-3 py-1 rounded-sm border border-border"
            style={{ fontFamily: "var(--font-heading)", fontSize: "11px", letterSpacing: "0.08em" }}
          >
            {product.category}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6 sticky top-24">
          {/* Title & price */}
          <div>
            <h1
              style={{ fontFamily: "var(--font-headline)", fontSize: "36px", fontWeight: 400, lineHeight: 1.2 }}
              className="text-foreground mb-3"
            >
              {product.title}
            </h1>
            <p
              style={{ fontFamily: "var(--font-body)", fontSize: "24px", fontWeight: 600 }}
              className="text-primary"
            >
              {product.price}
            </p>
          </div>

          {/* Short description */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px" }} className="text-muted-foreground leading-relaxed">
            A carefully sourced piece from our collection of historically-inspired natural goods. Made using traditional methods and materials.
          </p>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label style={{ fontFamily: "var(--font-heading)", fontSize: "12px", letterSpacing: "0.08em" }} className="text-foreground uppercase">
              Quantity
            </label>
            <div className="flex items-center border border-border rounded-sm w-fit">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span
                style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}
                className="px-5 py-2 border-x border-border min-w-[48px] text-center"
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full py-4 rounded-sm transition-colors"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "14px",
              letterSpacing: "0.06em",
              backgroundColor: added ? "var(--accent)" : "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <ShoppingBag size={16} />
            {added ? "Added to Cart!" : `Add to Cart — $${(priceNum * quantity).toFixed(2)}`}
          </button>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: <Truck size={16} />, label: "Free shipping\nover $75" },
              { icon: <RotateCcw size={16} />, label: "30-day\nreturns" },
              { icon: <ShieldCheck size={16} />, label: "Secure\ncheckout" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center text-muted-foreground">
                {icon}
                <span style={{ fontFamily: "var(--font-body)", fontSize: "11px" }} className="whitespace-pre-line leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Accordion details */}
          <div className="pt-2">
            {DETAILS.map(d => (
              <Accordion key={d.label} label={d.label} content={d.content} />
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="w-full px-6 mt-20">
          <h2
            style={{ fontFamily: "var(--font-heading)", fontSize: "13px", letterSpacing: "0.12em" }}
            className="text-muted-foreground uppercase mb-6"
          >
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <Link key={item.id} to={`/shop/${item.slug}`} className="group flex flex-col gap-3">
                <div className="aspect-square overflow-hidden bg-muted rounded-sm">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "14px" }} className="text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px" }} className="text-muted-foreground mt-0.5">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

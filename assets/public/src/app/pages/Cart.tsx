import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = subtotal > 75 ? 0 : 8.95;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-20 flex flex-col items-center justify-center gap-6 px-6">
        <ShoppingBag size={48} strokeWidth={1} style={{ color: "var(--muted-foreground)" }} />
        <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "36px", fontWeight: 400 }} className="text-foreground">
          Your cart is empty
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--muted-foreground)" }}>
          Discover handcrafted goods from the shop.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-sm transition-colors"
          style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          Browse the Shop <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="w-full px-6">
        <h1
          style={{ fontFamily: "var(--font-headline)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400 }}
          className="text-foreground mb-10"
        >
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Line items */}
          <div className="lg:col-span-2 flex flex-col divide-y divide-border border-t border-border">
            {items.map(item => {
              const itemPrice = parseFloat(item.price.replace(/[^0-9.]/g, ""));
              return (
                <div key={item.id} className="flex gap-5 py-6">
                  <Link to={`/shop/${item.slug}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-sm bg-muted"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        to={`/shop/${item.slug}`}
                        style={{ fontFamily: "var(--font-heading)", fontSize: "16px" }}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--muted-foreground)" }}>
                      {item.price} each
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-border rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "14px" }} className="px-4 border-x border-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 hover:bg-muted transition-colors"
                          aria-label="Increase"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 600 }} className="text-foreground">
                        ${(itemPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <div className="border border-border rounded-sm p-6 flex flex-col gap-4 sticky top-24">
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "16px", letterSpacing: "0.04em" }} className="text-foreground pb-4 border-b border-border">
              Order Summary
            </h2>

            <div className="flex justify-between">
              <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--muted-foreground)" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--muted-foreground)" }}>Shipping</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}>
                {shipping === 0 ? <span style={{ color: "var(--accent)" }}>Free</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            {shipping > 0 && (
              <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--muted-foreground)" }} className="bg-muted/40 rounded-sm px-3 py-2">
                Add ${(75 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}

            <div className="flex justify-between pt-4 border-t border-border">
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "15px" }}>Total</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "16px", fontWeight: 700 }}>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-sm mt-2 transition-colors"
              style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Proceed to Checkout <ArrowRight size={14} />
            </Link>

            <Link
              to="/shop"
              className="text-center transition-colors"
              style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

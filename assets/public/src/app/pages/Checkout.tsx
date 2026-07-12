import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

type Step = "information" | "shipping" | "payment" | "confirmed";

const LABEL = { fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em" } as const;
const INPUT_BASE = "w-full border border-border rounded-sm px-3 py-2.5 bg-input-background focus:outline-none focus:ring-1 focus:ring-ring transition";

function Field({ label, placeholder, type = "text", half }: { label: string; placeholder?: string; type?: string; half?: boolean }) {
  return (
    <div className={half ? "flex-1 min-w-0" : "w-full"}>
      <label style={LABEL} className="block mb-1.5 text-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className={INPUT_BASE}
        style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}
      />
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="w-full">
      <label style={LABEL} className="block mb-1.5 text-foreground">{label}</label>
      <select
        className={INPUT_BASE}
        style={{ fontFamily: "var(--font-body)", fontSize: "14px" }}
      >
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>("information");
  const navigate = useNavigate();

  const shipping = subtotal > 75 ? 0 : 8.95;
  const total = subtotal + shipping;

  function handleConfirm() {
    setStep("confirmed");
    clearCart();
  }

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-background pt-20 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <CheckCircle size={52} strokeWidth={1} style={{ color: "var(--accent)" }} />
        <h1 style={{ fontFamily: "var(--font-headline)", fontSize: "40px", fontWeight: 400 }} className="text-foreground">
          Order Confirmed!
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "var(--muted-foreground)" }} className="max-w-sm">
          Thank you for your order. You'll receive a confirmation email shortly with your order details.
        </p>
        <div className="flex gap-4 flex-wrap justify-center mt-2">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-sm transition-colors"
            style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-sm border border-border transition-colors hover:border-primary"
            style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em" }}
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const steps: { id: Step; label: string }[] = [
    { id: "information", label: "Information" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const currentIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="w-full px-6">
        {/* Breadcrumb steps */}
        <div className="flex items-center gap-2 mb-10">
          <Link to="/cart" className="flex items-center gap-1.5 hover:text-primary transition-colors" style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}>
            <ArrowLeft size={13} /> Cart
          </Link>
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <span style={{ color: "var(--border)" }}>/</span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: i <= currentIndex ? "var(--primary)" : "var(--muted-foreground)",
                  fontWeight: i === currentIndex ? 700 : 400,
                  cursor: i < currentIndex ? "pointer" : "default",
                }}
                onClick={() => i < currentIndex && setStep(s.id)}
              >
                {s.label}
              </span>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === "information" && (
              <div className="flex flex-col gap-6">
                <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "28px", fontWeight: 400 }}>Contact Information</h2>
                <Field label="Email address" placeholder="you@example.com" type="email" />
                <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "28px", fontWeight: 400 }} className="mt-2">Shipping Address</h2>
                <div className="flex gap-3">
                  <Field label="First name" half />
                  <Field label="Last name" half />
                </div>
                <Field label="Address" placeholder="123 Main St" />
                <Field label="Apartment, suite, etc." placeholder="Optional" />
                <div className="flex gap-3">
                  <Field label="City" half />
                  <Field label="ZIP code" half />
                </div>
                <Select label="Country" options={["United States", "Canada", "United Kingdom", "Australia"]} />
                <button
                  onClick={() => setStep("shipping")}
                  className="w-full py-3.5 rounded-sm transition-colors mt-2"
                  style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {step === "shipping" && (
              <div className="flex flex-col gap-6">
                <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "28px", fontWeight: 400 }}>Shipping Method</h2>
                {[
                  { id: "standard", label: "Standard Shipping", detail: "5–7 business days", price: shipping === 0 ? "Free" : "$8.95" },
                  { id: "express", label: "Express Shipping", detail: "2–3 business days", price: "$18.00" },
                ].map(option => (
                  <label key={option.id} className="flex items-center gap-4 border border-border rounded-sm px-4 py-3.5 cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="shipping" defaultChecked={option.id === "standard"} className="accent-primary" />
                    <div className="flex-1">
                      <p style={{ fontFamily: "var(--font-heading)", fontSize: "14px" }}>{option.label}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "var(--muted-foreground)" }}>{option.detail}</p>
                    </div>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: option.price === "Free" ? "var(--accent)" : undefined }}>
                      {option.price}
                    </span>
                  </label>
                ))}
                <button
                  onClick={() => setStep("payment")}
                  className="w-full py-3.5 rounded-sm transition-colors mt-2"
                  style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 style={{ fontFamily: "var(--font-headline)", fontSize: "28px", fontWeight: 400 }}>Payment</h2>
                  <div className="flex items-center gap-1.5" style={{ color: "var(--muted-foreground)" }}>
                    <Lock size={13} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "12px" }}>Secure checkout</span>
                  </div>
                </div>
                <Field label="Name on card" placeholder="Jane Smith" />
                <Field label="Card number" placeholder="1234 5678 9012 3456" />
                <div className="flex gap-3">
                  <Field label="Expiration (MM/YY)" placeholder="MM/YY" half />
                  <Field label="Security code" placeholder="CVV" half />
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full py-3.5 rounded-sm transition-colors mt-2"
                  style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.06em", backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                >
                  Place Order — ${total.toFixed(2)}
                </button>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--muted-foreground)" }} className="text-center">
                  This is a demo. No real payment will be processed.
                </p>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-2 border border-border rounded-sm p-6 flex flex-col gap-4 sticky top-24">
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "14px", letterSpacing: "0.04em" }} className="pb-4 border-b border-border">
              Order Summary
            </h3>
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
              {items.map(item => {
                const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
                return (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-cover rounded-sm bg-muted" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: "var(--muted-foreground)", color: "white" }}>
                        {item.quantity}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13px" }} className="flex-1 text-foreground">{item.title}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13px" }}>${(price * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <div className="flex justify-between">
                <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}>Subtotal</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "13px" }}>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "var(--muted-foreground)" }}>Shipping</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: shipping === 0 ? "var(--accent)" : undefined }}>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span style={{ fontFamily: "var(--font-heading)", fontSize: "14px" }}>Total</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 700 }}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

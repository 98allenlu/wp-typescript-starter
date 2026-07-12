import imgDove from "figma:asset/bd1275550b30cbe010ff2912a326ea52bf9eba0c.png";

export default function Vector({ className }: { className?: string }) {
  return (
    <div className={className || "relative w-full h-full flex items-center justify-center"} data-name="Dove">
      <img alt="Dove" className="w-full h-full object-contain pointer-events-none" src={imgDove} />
    </div>
  );
}

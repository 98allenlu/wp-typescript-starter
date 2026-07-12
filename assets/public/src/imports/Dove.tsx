import imgDove from "figma:asset/bd1275550b30cbe010ff2912a326ea52bf9eba0c.png";

export default function Dove({ className }: { className?: string }) {
  return (
    <div className={className || "h-[391px] relative w-[348px]"} data-name="Dove">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgDove} />
    </div>
  );
}
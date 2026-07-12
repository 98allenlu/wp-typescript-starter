import svgPaths from "./svg-wb47w8l6ix";
import imgPutYourPhotoHere from "figma:asset/91e315dcdcf3143886a01fb52758bd1829765df3.png";

export default function LayoutSection() {
  return (
    <div className="relative size-full" data-name="Layout / [section]">
      <div className="absolute inset-[0.79%_0_0.61%_0]" data-name="PUT YOUR PHOTO HERE">
        <img alt="" className="block max-w-none size-full" height="1122" src={imgPutYourPhotoHere} width="1920" />
      </div>
      <div className="absolute inset-[92.97%_0_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 79.9554">
          <g id="Vector 2">
            <path d={svgPaths.p56558a0} fill="var(--fill-0, #FCFBF1)" />
            <path d={svgPaths.pd38340} fill="var(--fill-0, #FCFBF1)" />
            <path d={svgPaths.p258d2630} fill="var(--fill-0, #FCFBF1)" />
          </g>
        </svg>
      </div>
      <div className="absolute flex inset-[0_0_92.97%_0] items-center justify-center">
        <div className="flex-none h-[79.955px] rotate-[180deg] w-[1920px]">
          <div className="relative size-full">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920 79.9554">
              <g id="Vector 4">
                <path d={svgPaths.p56558a0} fill="var(--fill-0, #FCFBF1)" />
                <path d={svgPaths.pd38340} fill="var(--fill-0, #FCFBF1)" />
                <path d={svgPaths.p258d2630} fill="var(--fill-0, #FCFBF1)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
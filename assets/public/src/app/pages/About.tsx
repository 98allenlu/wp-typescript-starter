import React from "react";
import { PageHeaderShape } from "@/app/components/PageHeaderShape";
import AllYoursLucieX from "@/imports/AllYoursLucieX";
import exampleImage from 'figma:asset/2e5815ad9cd7b670b5966472dfc21d4d581a46a9.png';

export default function About() {
  return (
    <div className="bg-background pb-20">
      <PageHeaderShape fillColor="var(--secondary)">
        <h1 className="font-headline text-[60px] leading-[60px] text-white mx-[0px] mt-[13px] mb-[0px]">About</h1>
      </PageHeaderShape>

      <div className="w-[91%] max-w-[1216px] mx-auto mt-[-180px] relative z-10">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row min-h-[467px]">
             {/* Image Column */}
             <div className="md:w-1/2 relative shrink-0">
                <img 
                  src={exampleImage}
                  alt="Artist portrait"
                  className="w-full h-full object-cover block"
                />
             </div>
             
             {/* Content Column */}
             <div className="md:w-1/2 p-12 flex flex-col justify-center items-center md:items-start">
                {/* Heading */}
                <div className="w-[512px] mb-6">
                  <h2 className="font-headline text-3xl leading-[1.2] text-primary text-left">Hello & Welcome</h2>
                </div>

                {/* Text Content Box - Strictly following provided CSS dimensions */}
                <div className="relative w-[512px] h-[280px]">
                  
                  {/* Paragraph 1 */}
                  <div className="absolute top-0 left-0 w-[512px] h-[96px] flex">
                    <p className="font-body font-normal text-[#000000cc] text-[16px] leading-[24px] tracking-normal text-justify w-[504px] mt-[-1px]">
                      I’m Lucie. I'm an artist and historian specializing in 18th- and 19th-century art, material culture,
                      and women’s history. With a decade of experience as a textile dyer, I have a deep technical and
                      historical understanding of botanical dyes, with a particular interest in indigo.
                    </p>
                  </div>

                  {/* Paragraph 2 */}
                  <div className="absolute top-[112px] left-0 w-[512px] h-[168px] flex">
                     <p className="font-body font-normal text-[#000000cc] text-[16px] leading-[24px] tracking-normal text-justify w-[512px] mt-[-1.2px]">
                      In addition to textile work, I'm an accomplished printmaker and graphic designer. I earned a BFA in
                      Art History with a minor in Fine Arts in Drawing and Design from <br />Moore College of Art and Design,
                      <br />and I'm currently pursuing a <br />Master’s in Museum Studies <br />at Johns Hopkins
                      University.
                     </p>
                  </div>

                  {/* Signature */}
                  <div className="absolute bottom-0 right-0 w-[192px] h-[99px]">
                     <AllYoursLucieX className="!static !w-full !h-full" />
                  </div>
                  
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

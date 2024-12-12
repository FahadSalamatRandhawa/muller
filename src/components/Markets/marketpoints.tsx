import { AnimateFromBelowComponent, AnimateFromFarRightComponent } from "@/AnimationUtils";
import { handleMissingColors } from "@/utils";
import { storyblokEditable } from "@storyblok/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function MarketPoints({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:"-10px"});
    const {points}=blok
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <div ref={ref} className=" grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-[20px] py-[40px] lg:px-[64px] lg:py-[112px] gap-[48px] min-h-max overflow-hidden " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    points.map((point:any)=>(
                        <div className=" flex flex-col gap-[24px] items-center" key={point._uid}>
                            {
                                isInView&&
                                <>
                                    <AnimateFromFarRightComponent className=" relative h-[400px] w-[400px] ">
                                        <Image src={point.image.filename} fill objectPosition="absolute" objectFit="cover" alt={point.image.alt} />
                                    </AnimateFromFarRightComponent>
                                    <AnimateFromBelowComponent className="">
                                        <h4 className="text-center">{point.heading}</h4>
                                    </AnimateFromBelowComponent>
                                    <AnimateFromBelowComponent className="">
                                        <p className=" ">{point.description}</p>
                                    </AnimateFromBelowComponent>
                                </>
                            }
                            
                        </div>
                    ))
                }
        </div>
    )
}


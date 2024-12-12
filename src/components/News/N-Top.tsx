import { AnimateFromBelowComponent } from "@/AnimationUtils";
import { storyblokEditable } from "@storyblok/react";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function NewsTop({blok}:{blok:any}) {
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true});
    const {colors}=blok;
    return(
        <div ref={ref} className=" flex flex-col md:flex-row justify-between items-center min-h-[135px] py-[40px] px-[20px] lg:px-[64px] pb-[50px] lg:pb-[112px] pt-[100px] lg:pt-[200px] "style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            
            {
                isInView&&
                <>
                    <AnimateFromBelowComponent className="">
                    <div className=" flex flex-col w-full gap-[16px]">
                        <text>{blok.title}</text>
                        <h1 className=" ">{blok.heading}</h1>
                    </div>
                </AnimateFromBelowComponent>
                <AnimateFromBelowComponent className=" md:w-[40%]">
                    <p >{blok.overview}</p>
                </AnimateFromBelowComponent>
                </>
            }
        </div>
    )
}
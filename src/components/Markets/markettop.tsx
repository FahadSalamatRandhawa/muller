import { storyblokEditable } from "@storyblok/react";
import Pagelink from "../link";
import { handleMissingColors } from "@/utils";
import { AnimateFromBelowComponent } from "@/AnimationUtils";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default async function MarketTop({blok}:{blok:any}) {
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true})
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <div ref={ref} className=" flex items-end justify-start  lg:h-[500px] xl:h-[600px] px-[20px] lg:px-[64px] py-[130px] md:py-[40px] lg:py-[112px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {isInView&&<AnimateFromBelowComponent className="">
            <div className=" flex flex-col gap-[24px]">
                <h1 className=" ">{blok.heading}</h1>
                <p>{blok.overview}</p>
                {
                    blok.link.map((link:any)=>(
                        <Pagelink variant={colors[0].link_variant} text={link.Lable} url={link.url.url} key={link._uid} />
                    ))
                }
            </div>
            </AnimateFromBelowComponent>}
        </div>
    )
}
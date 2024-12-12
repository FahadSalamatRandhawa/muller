import { storyblokEditable } from "@storyblok/react";
import Pagelink from "../link";
import { handleMissingColors } from "@/utils";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { AnimateFromBelowComponent } from "@/AnimationUtils";

export default function Signup({blok}:{blok:any}) {
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true, margin:"-10px"});
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
        <div ref={ref} className=" max-h-screen flex items-center justify-center text-center py-[30px] lg:py-[80px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateFromBelowComponent className=" flex flex-col gap-[24px] px-[20px] md:px-0 md:w-3/4 ">
                <>
                    <h4 className="">{blok.heading}</h4>
                    <p className=" ">{blok.overview}</p>
                    <div  className=" flex flex-col self-center md:w-[513px] gap-[20px] ">
                    <input className=" min-w-full border-b-[1px] p-[12px] h-[58px] placeholder:text-B-grey " style={{backgroundColor:"transparent",borderBottomColor:colors[0].border_color}} placeholder=" Placeholder"/>
                    
                    <div className=" flex items-center gap-3 mx-2">
                        <hr className=" w-[25px] " style={{borderColor:colors[0].border_color}} />
                        <text className=" text-[14px] leading-[22.6px] text-start">{blok.disclaimer}</text>
                    </div>
                    <Pagelink url={blok.link[0].url.url} text={blok.link[0].Lable}  variant={colors[0].link_variant} />
                    </div>
                </>
            </AnimateFromBelowComponent>
            }
        </div>
    )
}
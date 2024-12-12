import Image from "next/image";
import Pagelink from "../link";
import { GetInTouch } from "../Career/SingleCareerClient";
import MediaRenderer from "../MediaComponent";
import { storyblokEditable } from "@storyblok/react";
import { Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import { AnimateFromBelowComponent, AnimateFromFarRightComponent, AnimateXAxisComponent } from "@/AnimationUtils";
import { handleMissingColors } from "@/utils";


export function ContactTopGrid({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:'-1px'});
    const link=blok.link[0]
    let {colors}=blok;
    colors=handleMissingColors(colors)
    const {space_between_images}=blok;
    const {space_between_slider}=blok;

    return(
        <div ref={ref} className=" min-h-screen md:h-screen flex flex-col md:flex-row items-center justify-between gap-[20px] px-[50px] md:px-[100px] py-[170px]  " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateFromBelowComponent className=" flex flex-col gap-[24px]">
                        <h1 className=" ">{blok.heading}</h1>
                        <text>{blok.subheading}</text>
                        <Pagelink url={link.url.url} openNew={false} text={link.Lable} variant={colors[0].link_variant} />
                    </AnimateFromBelowComponent>
                }
                <div className="grid h-screen w-full md:w-auto grid-cols-2 overflow-auto pointer-events-none " style={{gap:space_between_slider+"px"}} >
                    <div className=" md:h-screen flex flex-col w-full overflow-auto hide-scroll " style={{gap:space_between_images+"px"}}>
                        <div className=" flex flex-col animate-upward" style={{gap:space_between_images+"px"}} >
                        {
                        blok.image_list1&&blok.image_list1.map((image:any)=>(
                            <div className=" relative snap-always snap-center w-full md:w-[264px] min-h-[250px] md:min-h-[340px] min-[1690px]:w-[350px]" key={image._uid}>
                                <Suspense fallback="Hehe">
                                <Image src={image.filename} priority fill alt={image.alt} key={image._uid} objectFit="cover" quality={80} sizes="(min-width:800px)w-[264px] min-h-[250px] md:min-h-[340px]" />
                                </Suspense>
                            </div>
                        ))
                        }
                        </div>
                        <div className=" flex flex-col animate-upward" style={{gap:space_between_images+"px"}}>
                        {
                        blok.image_list1&&blok.image_list1.map((image:any)=>(
                            <div className=" relative  snap-always snap-center w-full md:w-[264px] min-h-[250px] md:min-h-[340px] min-[1690px]:w-[350px]" key={image._uid}>
                                <Image src={image.filename} priority fill alt={image.alt} key={image._uid} objectFit="cover" quality={80} sizes="(min-width:800px)w-[264px] min-h-[250px] md:min-h-[340px]" />
                            </div>
                        ))
                        }
                        </div>
                    </div>
                    
                    <div className=" h-screen flex flex-col w-full overflow-auto hide-scroll " style={{gap:space_between_images+"px"}}>
                        <div className=" flex flex-col animate-downward" style={{gap:space_between_images+"px"}}>
                        {
                        blok.image_list1&&blok.image_list1.map((image:any)=>(
                            <div className=" relative snap-always snap-center w-full md:w-[264px] min-h-[250px] md:min-h-[340px] min-[1690px]:w-[350px]" key={image._uid}>
                                <Image src={image.filename} priority fill alt={image.alt} key={image._uid} objectFit="cover" quality={80} sizes="(min-width:800px)w-[264px] min-h-[250px] md:min-h-[340px]" />
                            </div>
                        ))
                        }
                        </div>
                        <div className=" flex flex-col animate-downward" style={{gap:space_between_images+"px"}}>
                        {
                        blok.image_list1&&blok.image_list1.map((image:any)=>(
                            <div className=" relative  snap-always snap-center w-full md:w-[264px] min-h-[250px] md:min-h-[340px] min-[1690px]:w-[350px]" key={image._uid}>
                                <Image src={image.filename} priority fill alt={image.alt} key={image._uid} objectFit="cover" sizes="(min-width:800px)w-[264px] min-h-[250px] md:min-h-[340px]" />
                            </div>
                        ))
                        }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export function GetInTouchGrid({blok}:{blok:any}){
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true,margin:'-1px'});
    const {background_color}=blok;
    return(
        <div ref={ref} className=" min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center lg:justify-between md:px-[64px] py-[40px] lg:py-[112px] gap-4" style={{backgroundColor:background_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
                {
                    isInView&&
                    <AnimateXAxisComponent X={-400} className="flex items-center justify-center ">
                        <div className=" relative min-h-[400px] lg:h-[600px] w-[90%] md:h-[90%] pointer-events-none ">
                        {
                            blok.media&&blok.media.map((m:any)=>(
                                <MediaRenderer muted={true} url={m.media.filename} alt={m.media.alt} type={m.type} key={m._uid} objectFit={m.objectFit} />
                            ))
                        }
                        </div>
                    </AnimateXAxisComponent>
                }
                {
                    isInView&&
                    <AnimateFromFarRightComponent className="">
                        <GetInTouch blok={blok.GetInTouch[0]} />
                    </AnimateFromFarRightComponent>
                }
            </div>
    )
}

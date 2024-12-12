import { AnimateFromBelowComponent, AnimateFromFarRightComponent } from "@/AnimationUtils";
import { storyblokEditable } from "@storyblok/react";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default async function BlogSection({blok}:{blok:any}) {
    const ref=useRef(null);
    const isInView=useInView(ref,{once:true});
    const {colors}=blok;
    return(
        <div ref={ref} className=" flex flex-col px-[20px] lg:px-[68px] pt-[13px] pb-[40px] lg:pb-[113px] " style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} id={blok.anchor_id} {...storyblokEditable(blok)}>
            {
                isInView&&
                <AnimateFromBelowComponent className="">
                    <>
                    <text className=" pl-2">{blok.title}</text>
                    <div className=" flex flex-col self-center md:text-center ">
                        <h2 className=" ">{blok.heading}</h2>
                        <p>{blok.overview}</p>
                    </div>
                    </>
                </AnimateFromBelowComponent>
            }
            <div className=" flex flex-wrap mt-[50px] lg:mt-[105px] gap-7">
                {
                    isInView&&blok.blogs.map((blog:any)=>(
                        <AnimateFromFarRightComponent className="">
                            <Link href={blog.link.url}>
                                <div className=" flex flex-col md:flex-row md:w-full gap-[24px]" key={blog._uid}>
                                    <div className=" relative h-[400px] w-full">
                                        <Image src={blog.image.filename} alt={blog.image.alt} objectFit="contain" fill className="max-md:!object-contain"/>
                                    </div>
                                    <div className="flex flex-col md:justify-evenly w-full ">
                                        <div className=" flex gap-[16px] text-[DM Mono] text-[14px] items-center ">
                                            <text className=" py-[4px] px-[8px]" style={{backgroundColor:blok.card_tag_color,color:blok.card_tag_text_color}}>{blog.category}</text>
                                            <text className=" font-[500]">{blog.time}</text>
                                        </div>
                                        <div className="flex flex-col gap-[8px]">
                                            <h4 className=" ">{blog.name}</h4>
                                            <p className=" text-[16px] leading-[25.6px]">{blog.overview}</p>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                        </AnimateFromFarRightComponent>
                    ))
                }
            </div>
        </div>
    )
}
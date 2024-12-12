import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import {motion} from 'framer-motion'
import { AppearFromBelow, ImageFromLeft, ImageFromLeftFar, ImageFromRight, ImageFromRightFar, slightlyLongerTransition, transition } from "@/AnimationUtils";

export default function partners({blok}:{blok:any}){
    const ref=useRef(null)
    const isInView=useInView(ref,{once:true,margin:"-1px"})
    const {anchor_id}=blok;

    return(
        <div className="flex flex-col px-[30px] lg:px-[42px] xxl:px-[60px] py-[119px] " ref={ref} style={{backgroundColor:blok.background_color,color:blok.text_color}} id={anchor_id} {...storyblokEditable(blok)} key={blok._uid} data-test="feature">
            
                {
                    isInView&&<motion.h2 variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={slightlyLongerTransition} key={blok.heading} >{blok.heading}</motion.h2>
                }
                {
                    isInView&&<motion.p variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=" md:w-[592px] xl:[700px] mt-[40px]" key={blok.description}>{blok.description}</motion.p>

                }
                <div className="h-full mt-[70px] sm:mt-[200px] flex flex-wrap justify-center gap-[53px] sm:px-[80px] overflow-x-hidden items-center" key={blok.partners._uid}>
                    {
                        isInView&&blok.partners.map((p:any,i:number)=>{
                            
                            return    i<blok.partners.length/2?
                                (<motion.a variants={ImageFromLeftFar} initial={ImageFromLeftFar.start} animate={ImageFromLeftFar.finish} transition={transition} href={p.url.url} key={p._uid} style={{pointerEvents: 'none'}}><Image key={p._uid+i} src={p.image.filename} width={400} height={400} alt={p.image.alt} className="square"/></motion.a>)
                                :(<motion.a variants={ImageFromRightFar} initial={ImageFromRightFar.start} animate={ImageFromRightFar.finish} transition={transition} href={p.url.url} key={p._uid} style={{pointerEvents: 'none'}}><Image key={p._uid+i} src={p.image.filename} width={400} height={400} alt={p.image.alt} className="square"/></motion.a>)

                        })
                    }
                </div>
        </div>
    )
}
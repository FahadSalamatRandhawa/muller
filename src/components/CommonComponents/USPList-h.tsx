import { AppearFromBelow, slightlyLongerTransition, transition } from "@/AnimationUtils";
import Pagelink from "@/components/link";
import { handleMissingColors } from "@/utils";
import { storyblokEditable } from "@storyblok/react";
import { motion, useInView} from 'framer-motion'
import { useRef } from "react";
import Image from "next/image";
import Link from 'next/link';

export default function USPListH({blok}:{blok:any}){
  const ref=useRef(null)
  const isInView=useInView(ref,{once:true,margin:"-1px"})

  const {anchor_id}=blok;
  const links=blok.link
  const {usplist}=blok;
  let {colors}=blok;
  const {image}=blok
    colors=handleMissingColors(colors)
  
    return(
      <>
      
        <div className={` relative  flex flex-col py-[4em] md:py-[8em] px-[1em] md:px-[2em] lg:px-[41px] font-[300]`} ref={ref} style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}}  id={anchor_id} {...storyblokEditable(blok)}>
        {isInView&&<motion.text variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=' text-[21px]'>{blok.title}</motion.text>}
        <div className="flex flex-col">
          <div className=' flex gap-[20px] lg:w-[80%] lg:px-[10px] mt-[30px] lg:mt-[65px] lg:top-[60px] lg:h-[30%]'>
          {isInView&&<motion.h2 variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=" heading2 ml-[10px] mt-[15px] lg:mt-[30px]" >{blok.heading}</motion.h2>}
            {
              isInView&&links.map((link:any)=>(
                <motion.span className=" w-full lg:w-[40%] max-w-[300px]" variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition}>
                  <Pagelink key={link._uid} url={link.url.url} text={link.Lable} variant={colors[0].link_variant} /> 
                </motion.span>
              ))
            }
          </div>
          <div className=" w-full flex-wrap self-end flex flex-row mt-[30px] lg:mt-[150px] lg:px-5 m-auto justify-center items-start">
            {
              isInView&&usplist.map((u:any)=>(
                <Link href={`/${u.full_slug}`} style={{pointerEvents: 'none'}}>
                  <motion.div variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} key={u._uid} className=" h-full w-[200px] flex flex-col pt-[28px] justify-center items-center w-[200px]">
                  <div className="flex justify-center border border-white border-solid w-[180px] h-[180px] text-center items-center mb-5">
                  {u.image.filename&&<Image src={u.image.filename} priority width={100} height={100} objectFit="cover" alt={u.image.alt} className="lg:ml-[2em]"/> }
                    <text className="mt-2 mb-2 ">{u.title}</text> 
                    </div>
                    <div  className="w-[86%] flex justify-center items-center">
                  <motion.text variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=" max-h-[200px] overflow-hidden justify-center items-center">
                  {u.description}
                  </motion.text>
                  </div>
                </motion.div>
              </Link>
              ))
            }
          </div>
        </div>
      </div>
      </>
    )
}
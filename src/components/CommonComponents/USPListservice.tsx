import { AppearFromBelow, slightlyLongerTransition, transition } from "@/AnimationUtils";
import Pagelink from "@/components/link";
import { handleMissingColors } from "@/utils";
import { storyblokEditable } from "@storyblok/react";
import { motion, useInView} from 'framer-motion'
import { useRef } from "react";
import Image from "next/image";
import Link from 'next/link';

export default function USPListservice({blok}:{blok:any}){
  const ref=useRef(null)
  const isInView=useInView(ref,{once:true,margin:"-1px"})

  const {anchor_id}=blok;
  const links=blok.link;
  const {usplist}=blok;
  let {colors}=blok;
  const {image}=blok;
  const {title}=blok;
  const linkshort=blok.linkshort;
    colors=handleMissingColors(colors)
  
    return(
      <>
      
        <div className={` relative  flex flex-col py-[4em] md:py-[8em] px-[1em] md:px-[2em] lg:px-[41px] font-[300]`} ref={ref} style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}}  id={anchor_id} {...storyblokEditable(blok)}>
        <div className="flex lg:flex-row flex-col 2xl:max-w-[70%] 2xl:m-auto">
          <div className=' flex flex-col gap-[20px] lg:w-[50%] lg:px-[10px] mt-[30px] lg:mt-[65px] lg:sticky lg:top-[60px] lg:h-[30%]'>
          {isInView&&<motion.h2 variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=" heading2 ml-[10px] mt-[15px] lg:mt-[30px]" >{blok.heading}</motion.h2>}
          {isInView&&<motion.text variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className=' text-[21px] mt-10'>{blok.title}</motion.text>}
            {
              isInView&&links.map((link:any)=>(
                <motion.span className=" w-full lg:w-[40%] max-w-[300px]" variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition}>
                  <Pagelink key={link._uid} url={link.url.url} text={link.Lable} variant={colors[0].link_variant} /> 
                </motion.span>
              ))
            }
          </div>
          <div className=" w-full lg:w-[50%] self-end flex flex-col mt-[30px] lg:mt-[150px] lg:px-5 m-auto ">
          {isInView && usplist.map((u: any) => (
                u.linkshort?.url && (
                  <Link href={`${u.linkshort.url}`} key={u._uid}>
                    <motion.div variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className="h-[150px] flex flex-row pt-[28px] w-full justify-center items-center">
                      <div className="w-[40%] flex justify-center">
                        {u.image?.filename && (
                          <Image src={u.image.filename} priority width={100} height={100} objectFit="cover" alt={u.image.alt || 'Standard-Alt-Text'} className="lg:ml-[2em]" />
                        )}
                        <text className="mt-2">{u.title}</text>
                      </div>
                      <div className="w-[60%]">
                        <motion.text variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className="max-h-[200px] overflow-hidden justify-center items-center">
                          {u.description}
                        </motion.text>
                      </div>
                    </motion.div>
                  </Link>
                )
              ))}

          </div>
        </div>
      </div>
      </>
    )
}
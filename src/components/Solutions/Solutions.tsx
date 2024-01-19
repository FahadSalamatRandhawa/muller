import ItemsCard from "@/components/CommonComponents/ItemCard";
import { handleMissingColors } from "@/utils";
import { inView, useInView } from "framer-motion";
import { useRef } from "react";
import {motion} from 'framer-motion'
import { AppearFromBottom, ImageFromLeft } from "@/AnimationUtils";

export default function SolutionsList({blok}:{blok:any}){

  const ref = useRef(null)
  const isInView = useInView(ref,{once:true,margin:'-1px'})

    const {card_divider_color}=blok;
    const {buttontext}=blok;
    const {solutions}=blok;
    let {colors}=blok;
    colors=handleMissingColors(colors)
    return(
      
        <div className={`flex flex-col h-auto py-[30px] lg:py-[95px] md:px-[24px] xl:px-[34px]`} id="solutions" ref={ref} style={{backgroundColor:colors[0].background_color,color:colors[0].text_color}} >
        {isInView&&<motion.p variants={AppearFromBottom} initial={AppearFromBottom.start} animate={AppearFromBottom.finish} transition={{delay:0.5,duration:1}} className=' Text-18'>{blok.title}</motion.p>}
          {isInView&&<motion.h2 variants={ImageFromLeft} initial={ImageFromLeft.start} animate={ImageFromLeft.finish} transition={{delay:0.5,duration:0.5}} className=" w-auto lg:max-w-[50%] mt-[30px]" >{blok.heading}</motion.h2>}
          <div className=' grid grid-cols-1 md:grid-cols-2 1400px:grid-cols-4 w-full justify-center gap-[20px] lg:px-[10px] mt-[30px] lg:mt-[65px]'>
             
                <ItemsCard isInView={isInView} divider_color={card_divider_color} link_variant={colors[0].link_variant} buttontext={buttontext} blok={solutions}/>
             
          </div>
      </div>
      
    )
}

import { storyblokEditable } from '@storyblok/react'
import MediaRenderer from '../MediaComponent'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import {motion} from 'framer-motion'
import { AppearFromBelow, ImageFromRight, slightlyLongerTransition, transition } from '@/AnimationUtils'

export default function Numbers({blok}:{blok:any}){
    const ref=useRef(null)
    const isInView=useInView(ref,{once:true,margin:"-1px"})
    const {anchor_id}=blok;
    return(
        <div className=" relative h-screen flex items-center md:items-end md:flex-row justify-between bg-cover " ref={ref} style={{color:blok.text_color}} id={anchor_id} {...storyblokEditable(blok)} >
            <div className=" absolute w-[100%] h-[100%] shadow-inner z-10 "  onPlay={()=>console.log('Playing')} >
            {
                blok.media&&blok.media.map((m:any)=>(
                    <MediaRenderer muted={true} url={m.media.filename} alt={m.media.alt} type={m.type} key={m._uid} objectFit={m.objectFit}/>
                ))
            }
            </div>
            <div className=' flex flex-col gap-[30px] md:gap-0 md:flex-row justify-between px-[20px] lg:px-[43px] z-20 w-full md:!mb-[7%] min-[527px]:mb-[-50%]'>
                {
                    isInView&&
                    <motion.div 
                        variants={ImageFromRight} 
                        initial={ImageFromRight.start} 
                        animate={ImageFromRight.finish} 
                        transition={transition}
                        // Tailwind Klassen für Grid-Layout
                        className="min-[379px]:h-[440px] min-[1123px]:w-[50%] h-full grid grid-cols-1 grid-rows-4 h-auto min-[379px]:grid-cols-2 min-[379px]:grid-rows-2 divide-x divide-y rounded-[10px] border-collapse border border-solid divide-x divide-y min-[379px]:divide-x min-[379px]:divide-y
                            sm:rounded-[10px] md:rounded-[10px] border border-solid md:border md:border-solid "
                        >
                        {blok.numbers.map((n: any) => (
                            <div key={n._uid} className="flex flex-col items-center justify-center p-[10px] sm:p-[20px] min-h-[130px] min-[379px]:min-h-[220px] min-[545px]:w-full h-[100%]">
                            {
                                isInView &&
                                <motion.div variants={ImageFromRight} initial={ImageFromRight.start} animate={ImageFromRight.finish} transition={slightlyLongerTransition} className="flex flex-col items-center justify-center">
                                <text className="heading2 text-[2.5rem] min-[545px]:text-[4.5rem] leading-[100%] text-center">{n.number}</text>
                                <text className="sm:text-[1.5rem] text-[1.2rem] mt-2 leading-[100%] text-center">{n.text}</text>
                                </motion.div>
                            }
                            </div>
                        ))}
                        </motion.div>
                    // <motion.div variants={ImageFromRight} initial={ImageFromRight.start} animate={ImageFromRight.finish} transition={transition} 
                    //     className='h-[440px] md:w-[50%] h-full grid grid-cols-2 grid-rows-2 rounded-[10px] border-collapse border-[1px] divide-x divide-y  '>
                    // {blok.numbers.map((n:any)=>(
                    //     <div key={n._uid} className=' w-full min-[379px]:min-h-[220px] min-[545px]:w-full h-[100%] flex flex-col items-center justify-center '>
                    //         {
                    //             isInView&&
                    //             <motion.div  variants={ImageFromRight} initial={ImageFromRight.start} animate={ImageFromRight.finish} transition={slightlyLongerTransition} className=' flex flex-col'>
                    //                 <text className=' heading2 text-[1.5rem] min-[545px]:text-[4.5rem] leading-[100%] text-center'>{n.number}</text>
                    //                 <text className=' text-[1.5rem] mt-2 leading-[100%] text-center'>{n.text}</text>
                    //             </motion.div>
                    //         }
                            
                    //     </div>
                    // ))}
                    // </motion.div>
                }
                {isInView&&<motion.h2 variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition}  className=' '>{blok.title}</motion.h2>}
            </div>
        </div>
    )
}

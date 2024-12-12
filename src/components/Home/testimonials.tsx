"use client"
import { storyblokEditable } from "@storyblok/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import ReactPlayer from "react-player";
import {motion, useInView} from 'framer-motion'
import { AppearFromBelow, ImageFromLeft, ImageFromRightFar, transition } from "@/AnimationUtils";
import {render} from 'storyblok-rich-text-react-renderer-ts';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  

export default function Testimonials({blok}:{blok:any}){
    const ref=useRef(null)
    const isInView=useInView(ref,{once:true,margin:"-1px"})
    const [value,setValue]=useState(0);
    

    function handleValue(operation:'+'|'-'){
        if(operation=='+'){
           if(value>=blok.testimonials.length-1){
            setValue(0)
           }else{
            setValue(value+1)
           }
        }else{
            if(value==0){
                setValue(blok.testimonials.length-1)
            }else{
                setValue(value-1)
            }
        }
    }

    const {video}=blok.testimonials[value];
    const {anchor_id}=blok;
    const {image}=blok;
    return(
            <div ref={ref} className=" relative min-h-screen flex flex-col px-[1em] md:px-[3em] xl:px-[5em] py-[4em] md:py-[6em] lg:py-[8em justify-evenly overflow-hidden"  style={{backgroundColor:blok.background_color,color:blok.text_color}} id={anchor_id} {...storyblokEditable(blok)} >
            <h2 className=" ">{blok.title}</h2>
            <div className="flex flex-col md:flex-row w-full justify-center items-center md:gap-[50px]">
                {
                    isInView&&video&&video.filename!=""?
                    <motion.div variants={ImageFromRightFar} initial={ImageFromRightFar.start} animate={ImageFromRightFar.finish} transition={{duration:1, stiffness: 120}} className="flex w-full md:w-[60%] md:h-max-[580px] py-[50px] md:py-[85px] justify-center items-center">
                    <div className="flex items-center justify-center h-full w-[90%] md:w-full ">
                        <div className="flex w-full m-auto h-full items-center justify-center">
                            {/* Bild */}
                            {blok.testimonials[value].image.filename && (
                                <Image src={blok.testimonials[value].image.filename} width={700} height={400} alt={blok.testimonials[value].image.alt || "kundenbild"} objectFit="contain" />
                            )}
                            {/* Button über dem Bild */}
                            {video && video.filename && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 video-play-button">
                                        <div className=" w-[70px] md:w-[110px] h-[70px] md:h-[110px] flex items-center justify-center rounded-full border-[1px] border-brand -left-10">
                                            <div className=" relative  w-[30px] md:w-[70px]  h-[30px] md:h-[70px] ">
                                            <Image src="/Icon/Google Play.svg" alt="google play" fill />
                                            </div>
                                        </div>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent className="p-0 max-w-none min-h-[300px] md:min-h-[400px] lg:min-h-[600px] xl:min-h-[800px] w-[90%] sm:w-[60%] lg:!max-w-[50%]" style={{overflow: 'auto'}}>
                                        <ReactPlayer config={{
                                            youtube: {
                                                playerVars: { 
                                                showinfo: 1,
                                                modestbranding: 1,
                                                controls: 0,
                                                },
                                            }
                                            }}
                                            controls={true} muted={false} playing={true} style={{position: 'absolute'}} width={'100%'} height={'100%'} url={video.filename} />
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                    </div>
                </motion.div>
                
                :null
                }
                <div className="flex flex-col justify-between w-full md:w-[40%] md:py-[85px] gap-[45px] self-end ">
                    {
                        isInView&&
                        <motion.text variants={AppearFromBelow} initial={AppearFromBelow.start} animate={AppearFromBelow.finish} transition={transition} className="h-max-[580px] sm:text-[1.5rem] text-[1.2rem] max-w-none prose overflow-hidden leading-[100%]">
                        {render(blok.testimonials[value].testimonial)}
                        </motion.text>
                    }
                    
                    <div className="w-full flex flex-col text-end min-h-[50px] self-end relative ">
                        <text className=" font-medium">{blok.testimonials[value].name}</text>
                        <text>{blok.testimonials[value].position}</text>
                    </div>
                </div>
            </div>
            {
                isInView&&
            <motion.div variants={ImageFromLeft} initial={ImageFromLeft.start} animate={ImageFromLeft.finish} transition={transition} className=" flex gap-[20px] items-baselin">
                <button onClick={()=>handleValue('-')} className=" flex w-[30px] md:w-[65px] h-[30px] md:h-[65px] rounded-full border-[1px] items-center justify-center" style={{color:blok.button_color,borderColor:blok.button_color}}>
                    <div className=" md:scale-150"><BiLeftArrowAlt /></div>
                </button>
                <button onClick={()=>handleValue('+')} className=" flex w-[30px] md:w-[65px] h-[30px] md:h-[65px] rounded-full border-[1px] items-center justify-center" style={{color:blok.button_color,borderColor:blok.button_color}}>
                    <div className=" md:scale-150"><BiRightArrowAlt/></div>
                </button>
                <text className=" ml-[20px] text-[22px] font-medium text-black ">
                    {value+1}/{blok.testimonials.length}
                </text>
            </motion.div>
            }
        </div>
    )
}


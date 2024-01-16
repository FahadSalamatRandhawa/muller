"use client"
import {motion} from 'framer-motion'
import { useState, useEffect } from "react";


export function RevealAnimationComponent(){

    const [isLoading,setIsLoading]=useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        console.log("Loading finished!");
        setIsLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);


    return isLoading && 
      <div className=' w-screen h-screen overflow-hidden'>
        <motion.div key={1} className={`w-screen h-screen bg-cover bg-center overflow-hidden hide-scroll`} style={{backgroundImage: `url(/loading/loading_image.png)`}} viewport={{once:true}} initial={{scale:1}} animate={{scale:[1,3,5,7,11,20],zIndex:100,position:"absolute"}} exit={{zIndex:-100,position:"unset",display:"none"}} transition={{duration:5,ease:"easeInOut"}} >
      </motion.div>
      </div>
    
  }
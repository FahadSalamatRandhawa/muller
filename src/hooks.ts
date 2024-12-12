"use client"
import { useEffect, useRef, useState } from "react"

export function useTypingEffect({textToType,duration,startTyping}:{textToType:string,duration:number,startTyping:boolean}){
    const textArray:string[]=textToType.split(" ");
    const [currentIndex,setCurrentIndex]=useState(0)
    const currentPositionRef=useRef(0);
    const intervalRef = useRef<number>();

    useEffect(()=>{
        if(intervalRef.current){
            clearInterval(intervalRef.current);
        }
        if(startTyping){
            intervalRef.current = setInterval(()=>{
                setCurrentIndex((value)=>value+1)
                currentPositionRef.current+=1;
                if(currentPositionRef.current>=textArray.length){
                    clearInterval(intervalRef.current);
                }
            },duration,textToType)
        }
        return ()=>{ return clearInterval(intervalRef.current)}
    },[duration,textToType,startTyping])
    let returningArray=textArray.slice(0,currentIndex)
    returningArray=returningArray.map((e)=>e+" ");
    

    if(currentPositionRef.current>=textArray.length){
        return {text:returningArray,isFinished:true};
    }else{
        return {text:returningArray,isFinished:false};
    }
}

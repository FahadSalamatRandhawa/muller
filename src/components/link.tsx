import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"

export default function Pagelink({text,width="353px",url,variant="green",openNew=true}:{text?:string,width?:string,url?:string,variant?:string,openNew?:boolean}){
  //console.log(variant)
    return(
        <Link href={url?url:''} target={openNew?"_blank":"_self"} className={`flex items-end justify-between h-[38px] w-full max-w-[300px] text-[21px] font-medium border-b-[1px] ${variant=='yellow'?'border-B-Yellow text-B-Yellow':variant=='green'?'border-brand text-brand':'text-white border-white'} pb-1 `} >
        
          <text className={variant=='yellow'?' text-white':variant=='green'?' text-black':'text-white border-white'}>
            {text?text:'More info'}
          </text>
            <div className=" scale-150"><BiRightArrowAlt /></div>
        
        </Link>
    )
}
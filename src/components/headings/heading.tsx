export default function Heading2({width,height,lineheight='77',text}:{width:string,height?:string,lineheight?:string,text:string}){
    return(
        <div className={` bg-purple-300 w-[${width}] text-[70px] font-[300px] leading-[${lineheight}] `}>
            {text}
        </div>
    )
}
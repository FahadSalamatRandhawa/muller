import MediaRenderer from "./MediaComponent"

export default function Media({blok}:{blok:any}){
    //console.log(blok)
    const {media}=blok
    return(
        <div className=" relative h-screen pointer-events-none " >
           <div className=" absolute  w-[100%] h-[100%] ">
           <MediaRenderer url={media.filename} type={blok.type} alt={media.alt} />  
            </div>       
        </div>
    )
}
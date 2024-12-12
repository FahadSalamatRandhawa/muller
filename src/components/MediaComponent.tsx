"use client"
import Image from 'next/image';
import { Suspense, useState } from 'react';

import dynamic from 'next/dynamic';

// Dynamic import of react-player
const ReactPlayer = dynamic(
  () => import('react-player'),
  {
    // Loading component
    loading: () => <div className=' bg-black w-full h-full text-white' style={{position:'inherit'}}></div>,
    ssr: false
  }
)

function MediaRenderer({url,type,width,height,alt="",muted=true,objectFit}:{url:string,type:string,width?:number,height?:number, alt:string,muted?:boolean,objectFit?:any }) {

  const [isloading,setLoading]=useState(true);
    if(type=='video'){
    return <ReactPlayer 
    // config={{
    //     youtube: {
    //       playerVars: { 
    //         showinfo: 0,
    //         modestbranding: 0,
    //         controls: 0,
    //       },
    //     }
    //   }}
      onPlay={()=>(setLoading(false))} controls={false} muted={muted} loop playing={true} style={{position:'inherit',objectFit:objectFit?objectFit:"cover"}} width={width?width:'100%'} height={height?height:'100%'} url={url}  />
    }else if(type=='image'){
        return <Suspense fallback={<div></div>}><Image src={url} alt={alt} fill objectFit={objectFit?objectFit:'cover'} /></Suspense>
    }else if(type=='audio'){
        <ReactPlayer width={width} height={height} url={url} style={{objectFit:objectFit?objectFit:"cover"}} />
    }
    
}

export default MediaRenderer;
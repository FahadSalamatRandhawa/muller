import MediaRenderer from "./MediaComponentOnly"

export default function MediaAdj({ blok }: { blok: any }) {
    const { objectFit, media, muted, autoplay, loop, controls, light, backgroundImage } = blok;
  
    // Standardwerte, falls sie nicht aus Storyblok kommen
    const isMuted = muted !== undefined ? muted : true;
    const isAutoplay = autoplay !== undefined ? autoplay : true;
    const shouldLoop = loop !== undefined ? loop : true;
    const showControls = controls !== undefined ? controls : false;
    const lightPreview = light  !== undefined ? light : false; // Annahme: 'light' ist entweder ein URL-String zum Vorschaubild oder nicht definiert
  
    return (
      <div className="relative min-[1088px]:h-screen h-[400px] min-[712px]:h-[600px]">
        <div className="absolute w-full h-full bg-[#221e1f]" style={{ objectFit }}>
          <MediaRenderer
            objectFit={objectFit}
            url={media.filename}
            type={blok.type}
            alt={media.alt}
            isMuted={isMuted}
            autoPlay={isAutoplay}
            shouldLoop={shouldLoop}
            showControls={showControls}
            light={lightPreview}
            backgroundImage={backgroundImage.filename}
            // Das Play-Icon wird direkt in MediaRenderer definiert
          />
        </div>
      </div>
    );
  }

// import MediaRenderer from "./MediaComponent"

// export default function Media({blok}:{blok:any}){
//     //console.log(blok)
//     const {objectFit}=blok;
//     const {media}=blok
//     return(
//         <div className=" relative min-[1088px]:h-screen h-[400px] min-[712px]:h-[600px] pointer-events-none " >
//            <div className=" absolute  w-[100%] h-[100%] " style={{objectFit}}>
//            <MediaRenderer objectFit={objectFit} url={media.filename} type={blok.type} alt={media.alt} />  
//             </div>       
//         </div>
//     )
// }
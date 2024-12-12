
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



// Typ-Definition für die Props deiner Komponente
interface MediaRendererProps {
  url: string;
  type: string;
  width?: number;
  height?: number;
  alt?: string;
  isMuted?: boolean;
  showControls?: boolean;
  autoPlay?: boolean;
  shouldLoop?: boolean;
  light?: boolean;
  objectFit?: any;
  backgroundImage?: string;
}

// MediaRenderer Komponenten-Definition
const MediaRenderer: React.FC<MediaRendererProps> = ({
  url,
  type,
  width,
  height,
  alt,
  isMuted,
  showControls,
  autoPlay,
  shouldLoop,
  light,
  objectFit,
  backgroundImage,
}) => {
  const [playing, setPlaying] = useState(autoPlay);

  const handlePlayClick = () => {
    setPlaying(true);
  };
  const backgroundStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' } : {};

  // Bestimmen des Hintergrundstils basierend auf dem Vorhandensein eines Vorschaubildes
  //const backgroundStyle = thumbnail ? { backgroundImage: `url(${thumbnail})`, backgroundSize: 'cover' } : { backgroundColor: '#221e1f' };

  if (type === 'video') {
    return (
      <div className="relative h-full w-full lg:w-[85%] lg:h-[95%] lg:m-auto lg:py-4em lg:max-w-[1900px]" style={backgroundStyle}>
     
        <ReactPlayer 
          playing={autoPlay}
          muted={isMuted}
          controls={showControls}
          loop={shouldLoop}
          width={width || '100%'}
          height={height || '100%'}
          url={url}
          playsinline
          light={light}
          style={{ position: 'inherit', objectFit: objectFit || 'cover' }}
        />
      {!playing && (
          <button className="custom-play-button" onClick={handlePlayClick}></button>
        )}
       </div>
    );
  } else if (type === 'image') {
    // Bild-Komponente
    return <Image src={url} alt={alt || ''} layout='fill' objectFit={objectFit || 'cover'} />;
  } else if (type === 'audio') {
    // Audio-Komponente, muss noch definiert werden
    return <ReactPlayer width={width} height={height} url={url} playing={autoPlay} controls={showControls} style={{objectFit:objectFit?objectFit:"cover"}} />;
  }

  // Standardmäßige Rückgabe, falls kein Typ passt
  return null;
};
export default MediaRenderer;

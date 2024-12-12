import { Metadata } from "next";

export function HandleMissingTags(heading_tags:any[]){
  if(!heading_tags){
    heading_tags=[{Primary:"h1",Secondary:"h2"}]
  }
  return heading_tags[0]; 
}

export function handleMissingColors(colors:any){
  if(!colors){
    return colors=[{}]
  }
  return colors;
}

export const screenSizes={
  md:800,
  lg:1180,
  xl:1900,
}

export function returnMetaData(meta_data:any):Metadata{  
  if(!meta_data){
    console.log("No meta_data found")
    return{
      title:"Muller",
      description:"A company built on trust"
    }
  }
  const keywords=meta_data[0].keywords.map((w:any)=>w.name)

  return{
    title:meta_data[0].title,
    description:meta_data[0].description,
    keywords:keywords,
    openGraph:{
      images:[meta_data[0].image.filename]
    },
    icons:meta_data[0].image.filename
  }
}
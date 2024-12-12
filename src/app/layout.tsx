import localFont from 'next/font/local'
import './globals.css'
export const dynamic = 'force-dynamic'

import { storyblokInit, apiPlugin, StoryblokStory, getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokProvider from '@/components/StoryblokProvider'
import { Providers } from './providers'
import Redux_Providers from '@/components/Provider'
import GoogleAnalytics from '../components/ga'

//const inter = Inter({ subsets: ['latin'] })

// const Roboto=localFont({
//   src:"../fonts/FromGoogle/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf",
//   display:'swap'
// })

// const HelveticaNeue=localFont({
//   src:[
//     {
//       path:"../../public/fonts/HelveticaNeue/HelveticaNeue-MediumExt.otf",
//       weight:'300'
//     }
//   ]
// })


storyblokInit({
  accessToken: process.env.STORYBLOKTOKEN,
  use: [apiPlugin],
  apiOptions:{
    cache:{
      clear:"auto",
      type:"none"
    }
  },
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const header = (await fetchData('navigation')).data;
  const footer = (await fetchData('footer')).data;
 
  // -top-[40px] lg:-top-[60px] body margins for sticky or unset
  return (
    
      <html lang="en" >
        <StoryblokProvider>
        <GoogleAnalytics />
      <body className={""}>
        <Redux_Providers>
          <Providers>
            <StoryblokStory story={header.story} />
              {children}
            <StoryblokStory story={footer.story} />
          </Providers>
        </Redux_Providers>
      </body>
      </StoryblokProvider>
    </html>
    
  )
}
export async function fetchData(component:"navigation"|"footer") {
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/${component}`, { version: "published" });
}
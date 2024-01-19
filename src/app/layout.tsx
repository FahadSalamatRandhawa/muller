//export const revalidate=true;
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
export const dynamic = 'force-dynamic'

import { storyblokInit, apiPlugin, StoryblokStory, getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokProvider from '@/components/StoryblokProvider'
import { Providers } from './providers'
import Redux_Providers from '@/components/Provider'
import { RevealAnimationComponent } from '@/components/RevealAnimation';


const inter = Inter({ subsets: ['latin'] })


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
 
  return (
    
      <html lang="en" >
        <StoryblokProvider>
      <body className={inter.className+ " -top-[40px] lg:-top-[50px] "}>
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

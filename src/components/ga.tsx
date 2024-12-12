import Script from 'next/script'
import { ScriptProps } from 'next/script'

const GoogleAnalytics: React.FC<ScriptProps> = () => {
    return (
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-1T5HC6F98W`}
        />
  
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-1T5HC6F98W');
          `}
        </Script>
      </>
    )
  }
  
  export default GoogleAnalytics
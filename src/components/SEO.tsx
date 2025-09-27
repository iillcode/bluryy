import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
  canonicalUrl?: string
  noIndex?: boolean
  structuredData?: any
}

export default function SEO({
  title = 'ImageBlur Pro - Advanced Image Blur Tool',
  description = 'Professional image blur tool with normal and line blur modes. Upload, edit, and download blurred images with adjustable intensity and color options.',
  keywords = 'image blur tool, photo editor, blur effects, image editing, online photo editor, blur filter, image processing',
  ogImage = '/og-image.jpg',
  ogUrl,
  canonicalUrl,
  noIndex = false,
  structuredData
}: SEOProps) {
  const currentUrl = ogUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://imageblur-pro.com'}`
  const currentCanonical = canonicalUrl || currentUrl

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ImageBlur Pro",
    "description": description,
    "url": currentUrl,
    "applicationCategory": "PhotoApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "ImageBlur Pro",
      "url": currentUrl
    }
  }

  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ImageBlur Pro" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={currentCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="ImageBlur Pro" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@ImageBlurPro" />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
    </Head>
  )
}
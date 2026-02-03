import React from 'react';
import { Helmet } from 'react-helmet-async';
import siteMetadata from '../../lib/seo';

/**
 * SEO component
 * Props: title, description, image, url, lang, twitter
 */
export default function SEO({
  title,
  description,
  image,
  url,
  children,
  lang = siteMetadata.lang,
  twitter = siteMetadata.twitter
}) {
  const metaTitle = title ? `${title} — ${siteMetadata.title}` : siteMetadata.title;
  const metaDescription = description || siteMetadata.description;
  const metaImage = image || siteMetadata.image;
  const metaUrl = url || siteMetadata.siteUrl;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.shortName,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description
  };

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      <link rel="canonical" href={metaUrl} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>

      {children}
    </Helmet>
  );
}

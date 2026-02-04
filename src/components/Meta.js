import React from 'react';
import { Helmet } from 'react-helmet-async';
import siteMetadata from '../lib/seo';

const Meta = ({ title, description, image, url }) => {
    const seoTitle = title || siteMetadata.title;
    const seoDescription = description || siteMetadata.description;
    const seoImage = image || siteMetadata.image;
    const seoUrl = url || siteMetadata.siteUrl;

    return (
        <Helmet>
            {/* Base */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={siteMetadata.keywords} />
            <meta name="author" content={siteMetadata.author} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <html lang={siteMetadata.lang} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={seoUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={seoUrl} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />
            <meta name="twitter:site" content={siteMetadata.twitter} />

            {/* Canonical */}
            <link rel="canonical" href={seoUrl} />
        </Helmet>
    );
};

export default Meta;

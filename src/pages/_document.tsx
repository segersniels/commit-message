import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Generate your git commit message using AI"
        />
        <meta property="og:site_name" content="commit-message.com" />
        <meta
          property="og:description"
          content="Generate your git commit message using AI"
        />
        <meta property="og:title" content="Generate Commit Message" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Generate Commit Message" />
        <meta
          name="twitter:description"
          content="Generate your git commit message using AI"
        />

        <meta
          property="og:image"
          content="https://commit-message.com/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://commit-message.com/og-image.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <>
      {
        // Hier sind eher so Meta-Daten, die wir nicht oft brauchen.
      }
      <Html lang="de">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="bg-ourBackgroundColor font-inter">
          <Main />
          <NextScript />
        </body>
      </Html>
    </>
  )
}

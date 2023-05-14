import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <>
    {
      // Hier wird am Anfang der Index reingerendet. Hier können wir Komponenten darstellen, die auf jeder Seite gleich sind, typischerweise Dinge wie ein Footer.
      // The Component prop is the active page, so whenever you navigate between routes, Component will change to the new page. Therefore, any props you send to Component will be received by the page. Source: https://nextjs.org/docs/pages/building-your-application/routing/custom-app
    }
    <div className="flex flex-row">
      <div className="">
        <Component {...pageProps} />
      </div>
    </div>
  </>
}
import { DefaultSeo } from "@src/core/components/Seo";
import "@src/styles/global.css";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo />
      <Component {...pageProps} />;
    </>
  );
}

export default App;

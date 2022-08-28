import {
  NextSeo,
  NextSeoProps,
  DefaultSeo as NextDefaultSeo,
  DefaultSeoProps,
} from "next-seo"; // eslint-disable-line no-restricted-imports

export const DefaultSeo = (props: DefaultSeoProps) => {
  return (
    <>
      <NextDefaultSeo
        titleTemplate="%s | Feather Notes"
        description="Minimalist notes taking app."
        // openGraph={{
        //   type: "website",
        //   url: "https://www.feathernotes.app",
        //   title: "Manuel Coffin",
        //   description:
        //     "Minimalist notes taking app.",
        //   images: [
        //     {
        //       url: "/og_image.png",
        //       width: 1200,
        //       height: 630,
        //       alt: "Bannière de Manuel Coffin",
        //     },
        //   ],
        // }}
        additionalLinkTags={[
          {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            href: "/favicon-32x32.png",
          },
          {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            href: "/favicon-16x16.png",
          },
        ]}
        {...props}
      />
    </>
  );
};

export const Seo = (
  props: Omit<NextSeoProps, "title"> & {
    title: NonNullable<NextSeoProps["title"]>;
  }
) => {
  return <NextSeo {...props} />;
};

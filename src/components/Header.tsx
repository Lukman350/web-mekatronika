import Head from "next/head";

const Header = ({ title }: { title: string }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>{title}</title>
      <meta name="title" content="Teknik Mekatronika - SMKN 69 Jakarta" />
      <meta
        name="description"
        content="Website jurusan Teknik Mekatronika dari sekolah SMKN 69 Jakarta"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://web-mekatronika.vercel.app/" />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Website jurusan Teknik Mekatronika dari sekolah SMKN 69 Jakarta"
      />
      <meta property="og:image" content="/logo.jpg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://web-mekatronika.vercel.app/"
      />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="Website jurusan Teknik Mekatronika dari sekolah SMKN 69 Jakarta"
      />
      <meta property="twitter:image" content="/logo.jpg" />
      <meta
        name="description"
        content="Website jurusan Teknik Mekatronika dari sekolah SMKN 69 Jakarta"
      />
      <meta
        name="keywords"
        content="tm69, mekatronika69, meka69, mechatronic, smkn69jkt, teknikmekatronika, teknikmekatronika69"
      />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Head>
  );
};

export default Header;

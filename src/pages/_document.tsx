import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id" data-theme="light">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gradient-to-tr from-body-bg-light via-indigo-200 to-indigo-300 dark:bg-gradient-to-tr dark:from-slate-700 dark:via-body-bg-dark dark:to-slate-900 min-h-screen min-w-full selection:bg-sky-800 selection:text-white overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

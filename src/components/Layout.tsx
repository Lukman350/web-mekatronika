import Head from "next/head";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
      </Head>

      <Navbar />

      <main className="z-10">{children}</main>
    </>
  );
};

export default Layout;

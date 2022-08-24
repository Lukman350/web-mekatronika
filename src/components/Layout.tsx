import Header from "@/components/Header";
import Navbar from "@/components/Navbar";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  navbarIsShow?: boolean;
}

const Layout = ({ title, children, navbarIsShow }: LayoutProps) => {
  return (
    <>
      <Header title={title} />

      {navbarIsShow && <Navbar />}

      <main className="z-10">{children}</main>
    </>
  );
};

export default Layout;

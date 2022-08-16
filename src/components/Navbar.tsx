import type { NextPage } from "next";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import NavLink from "@/components/NavLink";
import Link from "next/link";
import validateToken from "@/utils/validateToken";
import { Button } from "flowbite-react";

const NavigationList: Array<{
  title: string;
  href: string;
}> = [
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

const Navbar: NextPage = () => {
  const navigation = useRef<HTMLDivElement>(null);
  const header = useRef<HTMLDivElement>(null);
  const themeSwitch = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const toggleNavigation = () => navigation.current?.classList.toggle("active");

  const scrollHeader = () => {
    if (window.scrollY >= 100) header.current?.classList.add("sticky");
    else header.current?.classList.remove("sticky");
  };

  const switchTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);

    return () => window.removeEventListener("scroll", scrollHeader);
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
      themeSwitch.current!.checked = true;
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      themeSwitch.current!.checked = false;
    }
  }, [themeSwitch]);

  return (
    <header>
      <nav
        className="container flex items-center justify-between flex-wrap p-4 transition-all ease-in-out duration-300 relative bg-none dark:bg-none dark:bg-body-bg-dark dark:lg:bg-none dark:lg:bg-transparent lg:bg-none"
        ref={header}
      >
        <div className="flex items-center flex-shrink-0 text-primary mr-6 lg:mr-12">
          <Link href="/">
            <a className="text-3xl font-bold">
              <span className="text-secondary">TM</span>
              <span className="text-primary">69</span>
            </a>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-primary border-primary hover:text-primary hover:border-primary"
            onClick={toggleNavigation}
            type="button"
          >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className="navbar-nav w-full block flex-grow absolute top-[68px] right-0 left-0 px-4 transition-transform ease-in-out duration-300 overflow-hidden h-max z-50 lg:flex lg:items-center lg:w-auto lg:static lg:px-0 bg-gradient-to-b from-body-bg-light dark:bg-none dark:bg-body-bg-dark dark:lg:bg-none dark:lg:bg-transparent lg:bg-none lg:bg-transparent border-b border-[rgba(0,0,0,0.1)] lg:border-0 transform -translate-x-full md:transform-none lg:transform-none"
          ref={navigation}
        >
          <div className="text-md lg:flex-grow">
            {NavigationList.map(({ title, href }, idx) => (
              <NavLink activeClassName="link-active" href={href} key={idx}>
                <a className="block w-full lg:w-auto py-1 mt-2 lg:inline-block lg:mt-0 text-secondary hover:font-semibold lg:mr-7 dark:text-secondary-dark mr-4">
                  {title}
                </a>
              </NavLink>
            ))}
          </div>
          <div className="mt-7 border-t border-[rgba(0,0,0,.1)] md:mt-0 lg:mt-0 md:border-0 lg:border-0 flex gap-4 flex-row items-center my-2">
            {!validateToken() ? (
              <Button onClick={() => router.push("/auth/login")}>Login</Button>
            ) : (
              <Button onClick={() => router.push("/dashboard/")}>
                Dashboard
              </Button>
            )}

            <div className="py-2 flex items-center before:content-['Light'] before:mr-[10px] before:text-secondary before:dark:text-secondary-dark before:text-md after:content-['Dark'] after:ml-[10px] after:text-secondary after:dark:text-secondary-dark after:text-md">
              <label className="relative inline-block w-[60px] h-[34px]">
                <input
                  type="checkbox"
                  className="theme-switch hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    switchTheme(e)
                  }
                  ref={themeSwitch}
                />
                <span className="slider absolute cursor-pointer top-0 right-0 bottom-0 left-0 bg-[#ccc] rounded-[34px] transition ease-in-out duration-400 before:content-[''] before:absolute before:h-[26px] before:w-[26px] before:left-1 before:bottom-1 before:bg-white before:transition before:ease-in-out before:duration-400 before:rounded-full"></span>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

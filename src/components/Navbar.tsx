import type { NextPage } from "next";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavLink from "@/components/NavLink";
import Link from "next/link";
import validateToken from "@/utils/validateToken";
import { Button, Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { MdWbSunny, MdOutlineBedtime } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

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
  const router = useRouter();
  const [theme, setTheme] = useState<string>("light");

  const { name } = useSelector((state: any) => state.user);

  const toggleNavigation = () => navigation.current?.classList.toggle("active");

  const scrollHeader = () => {
    if (window.scrollY >= 100) header.current?.classList.add("sticky");
    else header.current?.classList.remove("sticky");
  };

  const switchTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    } else if (currentTheme === "light") {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
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
      setTheme("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    }
  }, []);

  return (
    <header>
      <nav
        className="container flex items-center justify-between flex-wrap p-4 transition-all ease-in-out duration-300 relative bg-none dark:bg-none dark:lg:bg-none lg:bg-none"
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
            className="flex items-center rounded text-primary hover:text-primary hover:border-primary"
            onClick={toggleNavigation}
            type="button"
          >
            <GiHamburgerMenu size={30} />
          </button>
        </div>
        <div
          className="navbar-nav w-full block flex-grow absolute top-[68px] right-0 left-0 px-4 transition-transform ease-in-out duration-300 overflow-hidden h-max z-50 lg:flex lg:items-center lg:w-auto lg:static lg:px-0 bg-gradient-to-t from-body-bg-light via-indigo-200 to-indigo-300 dark:bg-none dark:bg-body-bg-dark dark:lg:bg-none dark:lg:bg-transparent lg:bg-none lg:bg-transparent border-b border-[rgba(0,0,0,0.1)] lg:border-0 transform -translate-x-full md:transform-none lg:transform-none"
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
              <div className="text-secondary dark:text-secondary-dark text-sm lg:text-base">
                <Dropdown label={name} size="sm" inline={true}>
                  <Dropdown.Item onClick={() => router.push("/dashboard/")}>
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => router.push("/dashboard/settings")}
                  >
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      Cookies.remove("refreshToken");
                      router.reload();
                    }}
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}

            <button
              className="rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              type="button"
              onClick={switchTheme}
            >
              {theme === "dark" ? (
                <MdWbSunny className="w-5 h-5" />
              ) : (
                <MdOutlineBedtime className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

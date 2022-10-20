import { Footer } from "flowbite-react";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const MyFooter = () => {
  return (
    <Footer container={true}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="md:mr-20">
            <Image src="/logo69.png" height={306} width={306} />
            <h1 className="text-2xl font-bold text-center text-secondary dark:text-secondary-dark">
              SMKN 69 Jakarta
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Alamat" />
              <Footer.LinkGroup col={true}>
                <p className="font-light text-secondary dark:text-secondary-dark">
                  Jl. Swadaya Rawabadung No.32-66, RT.8/RW.7, Jatinegara, Kec.
                  Cakung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta
                  13930
                </p>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Usefull Links" />
              <Footer.LinkGroup col={true}>
                <Link href="/" passHref>
                  <Footer.Link href="/">Home</Footer.Link>
                </Link>
                <Link href="/about" passHref>
                  <Footer.Link href="/">About</Footer.Link>
                </Link>
                <Link href="/contact" passHref>
                  <Footer.Link href="/">Contact</Footer.Link>
                </Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Contact" />
              <Footer.LinkGroup col={true}>
                <p className="font-light text-secondary dark:text-secondary-dark">
                  test@mekasmkn69.my.id
                </p>
                <p className="font-light text-secondary dark:text-secondary-dark">
                  +62 812-3456-7890
                </p>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="/" by="Teknik Mekatronika" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="https://instagram.com/mechatronic_engine"
              target="_blank"
              rel="noopener noreferrer"
              icon={BsInstagram}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;

import { Footer } from "flowbite-react";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";

const MyFooter = () => {
  return (
    <Footer container={true}>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="md:mr-14">
            <Footer.Brand
              href="/"
              src="/logo.jpg"
              alt="Mekatronika Logo"
              name="Mekatronika"
            />
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
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col={true}>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="/" by="Teknik Mekatronika" year={2022} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;

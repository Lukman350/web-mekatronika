import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import validateToken from "@/utils/validateToken";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import MyFooter from "@/components/Footer";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state: any) => state.user);

  useEffect(() => {
    const token = Cookies.get("refreshToken");

    if (token) {
      const decoded = jwt.decode(atob(token!));
      if (decoded) {
        dispatch(setUser(decoded));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (!validateToken()) {
      Cookies.remove("refreshToken");
      dispatch(
        setUser({
          name: "",
          nis: 0,
          username: "",
          password: "",
          email: "",
          role: "",
        })
      );
    }
  }, [dispatch]);

  return (
    <Layout title="Teknik Mekatronika - SMKN 69" navbarIsShow={true}>
      <div className="w-full h-64 lg:h-[90vh]">
        <Carousel slideInterval={5000}>
          <div className="flex h-full items-center justify-center text-white relative">
            <Image
              src="/Banner/1.jpg"
              layout="fill"
              loading="lazy"
              quality={100}
              className="w-full h-full object-cover rounded-none"
            />
            <div className="flex flex-col absolute items-center">
              <h1 className="text-2xl lg:text-5xl font-black text-center">
                Selamat Datang {name && <strong>- {name}</strong>}
              </h1>
              <h3 className="text-xl lg:text-2xl font-medium text-center">
                di Website Teknik Mekatronika
              </h3>
            </div>
          </div>
          <div className="flex h-full items-center justify-center text-white relative">
            <Image
              src="/Banner/2.jpg"
              layout="fill"
              loading="eager"
              quality={100}
              className="w-full h-full object-cover rounded-none"
            />
            <div className="flex absolute">
              <p>Slide 2</p>
            </div>
          </div>
          <div className="flex h-full items-center justify-center text-white relative">
            <Image
              src="/Banner/3.jpg"
              layout="fill"
              loading="eager"
              quality={100}
              className="w-full h-full object-cover rounded-none"
            />
            <div className="flex absolute">
              <p>Slide 3</p>
            </div>
          </div>
        </Carousel>
      </div>

      {/* About */}
      <section id="about" className="min-h-screen">
        <div className="container">
          <h1 className="text-2xl font-bold text-center py-6 dark:text-white">
            Teknik Mekatronika
          </h1>

          <div className="flex flex-row gap-6 items-center w-full mx-auto">
            <div className="w-6/12">
              <p className="font-light text-lg dark:text-slate-300">
                Ilmu teknik Mekatronika merupakan gabungan dari beberapa cabang
                ilmu teknik. Seperti Teknik Mesin/Mekanik dan Teknik Elektronika
                dengan menghubungkan teknologi informatika. Lulusan Teknik
                Mekatronika berkarir di industri Otomatisasi Industri,
                Instrumentasi dan kontrol, industri manufaktur dan bisa
                berkarier sebagai wirausaha.
              </p>
            </div>
            <div className="w-6/12">
              <Image
                src="/logo.jpg"
                width="200"
                height="200"
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <MyFooter />
    </Layout>
  );
};

export default Home;

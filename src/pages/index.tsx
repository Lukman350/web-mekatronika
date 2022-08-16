import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import validateToken from "@/utils/validateToken";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/features/user/userSlice";
import { Carousel } from "flowbite-react";

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
    <Layout title="Teknik Mekatronika - SMKN 69 Jakarta">
      <div className="h-64 lg:h-[500px]">
        <Carousel slideInterval={5000}>
          <div className="flex h-full items-center justify-center bg-[url('/Banner/1.jpg')] bg-center bg-no-repeat bg-cover rounded-none text-white flex-col">
            <h1 className="text-2xl lg:text-5xl font-black">
              Selamat Datang {name && <strong>- {name}</strong>}
            </h1>
            <h3 className="text-xl lg:text-2xl font-medium">
              di Website Teknik Mekatronika
            </h3>
          </div>
          <div className="flex h-full items-center justify-center bg-[url('/Banner/2.jpg')] bg-center bg-no-repeat bg-cover rounded-none text-white">
            Slide 2
          </div>
          <div className="flex h-full items-center justify-center bg-[url('/Banner/3.jpg')] bg-center bg-no-repeat bg-cover rounded-none text-white">
            Slide 3
          </div>
        </Carousel>
      </div>
    </Layout>
  );
};

export default Home;

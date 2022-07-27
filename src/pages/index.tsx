import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Image from "next/image";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

interface UserTypes {
  name: string;
  nis: number;
  username: string;
  password: string;
  email: string;
}

const Home: NextPage = () => {
  const [user, setUser] = useState<UserTypes>({
    name: "",
    nis: 0,
    username: "",
    password: "",
    email: "",
  });

  // const checkUsername = () => {
  //   if (user && user.username === "Unknown") {
  //     router.push("/dashboard/profile");
  //   }
  // };

  useEffect(() => {
    if (Cookies.get("refreshToken")) {
      const token = Cookies.get("refreshToken");
      const decoded = jwt.decode(token!);
      if (decoded) {
        setUser(decoded as UserTypes);
      }
    }
  }, []);

  // useEffect(() => {
  //   checkUsername();
  // });
  return (
    <Layout title="Teknik Mekatronika - SMKN 69 Jakarta">
      <div className="container mx-auto flex items-center relative min-h-[1000px]">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold text-primary">Home Page</h1>
          <p className="text-xl">
            Hello - <strong>{user.name !== "" && user.name}</strong>
          </p>
        </div>
        <div className="w-6/12">
          <Image
            src="/vercel.svg"
            width="100"
            height="100"
            quality={100}
            alt="Testing"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

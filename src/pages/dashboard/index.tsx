import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Cookies from "js-cookie";
import validateToken from "@/utils/validateToken";
import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!validateToken()) {
      Cookies.remove("refreshToken");
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>TM69 - Dashboard</title>
      </Head>

      <h1>Welcome to Dashboard</h1>
    </>
  );
};

export default Dashboard;

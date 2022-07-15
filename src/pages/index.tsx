import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Layout title="Main Page">
      <div className="container mx-auto flex items-center relative min-h-[1000px]">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold text-primary">Home Page</h1>
        </div>
        <div className="w-6/12">
          <Image
            src="/vercel.svg"
            width="100"
            height="100"
            quality={100}
            alt="Testing"
          />
          <Image
            src="/testing.png"
            height="100"
            width="100"
            quality={1}
            alt="Testing 2"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;

import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <Layout title="About Page" navbarIsShow={true}>
      <div className="container mx-auto flex items-center relative min-h-[1000px]">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold text-primary">About Page</h1>
        </div>
        <div className="w-6/12">
          <Image
            src="/logo.jpg"
            width={100}
            height={100}
            quality={100}
            alt="Testing"
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;

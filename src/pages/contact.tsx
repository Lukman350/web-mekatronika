import type { NextPage } from "next";
import Layout from "@/components/Layout";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <Layout title="Contact Page" navbarIsShow={true}>
      <div className="container mx-auto flex items-center relative">
        <div className="w-6/12">
          <h1 className="text-4xl font-bold text-primary">Contact Page</h1>
        </div>
        <div className="w-6/12">
          <div className="border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4321268212598!2d106.92343631431011!3d-6.206592062524609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698bcabb1368d7%3A0xea46dd080cc5e54c!2sSMKN%2069%20JAKARTA%20TIMUR!5e0!3m2!1sid!2sid!4v1662427732818!5m2!1sid!2sid"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

import type { NextPage } from "next";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import callAPI from "@/lib/Api";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import Layout from "@/components/Layout";
import validateToken from "@/utils/validateToken";

type FormData = {
  password: string;
  confirmPassword: string;
};

const Verify: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: any) => {
    setLoading(true);

    const { usrid, c } = router.query;

    const response = await callAPI({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL as string}/auth/verify`,
      data: {
        password: data.password,
        userid: usrid,
        verifyCode: c,
      },
    });

    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    toast.success(response.message);

    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  };

  // const countDown = () => {
  //   setTime(time + 1);

  //   if (time >= 60) {
  //     router.push("/auth/login");
  //   }

  //   setTimeout(countDown, 1000);
  // };

  const resendVerifyCode = async () => {
    // setTime(60);

    // countDown();

    // const { usrid } = router.query;

    // const response = await callAPI({
    //   method: "POST",
    //   url: `${process.env.NEXT_PUBLIC_API_URL as string}/auth/resendcode`,
    //   data: {
    //     userid: usrid,
    //   },
    // });

    // if (!response.success) {
    //   toast.error(response.message);
    //   return;
    // }

    // toast.success(response.message);
    return;
  };

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (validateToken()) {
      router.push("/");
    }
  }, [router]);

  return (
    <Layout title="Teknik Mekatronika - Verify Account" navbarIsShow={false}>
      <div className="container min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-md">
          <div className="background-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-300 dark:border dark:border-slate-700">
            <div className="p-2">
              <h1 className="text-center dark:text-secondary-dark text-2xl font-bold">
                Buat Password Akunmu
              </h1>

              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4 mt-2"
              >
                <div className="flex flex-col justify-start w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    {...register("password", {
                      required: true,
                    })}
                    sizing="md"
                    type="password"
                    id="password"
                    placeholder="Masukkan password kamu disini ..."
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.password.type === "required" &&
                        "* Password harus diisi"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-start w-full">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="confirmPassword"
                      value="Konfirmasi Password"
                    />
                  </div>
                  <TextInput
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === watch("password") || "* Password tidak sama",
                    })}
                    sizing="md"
                    type="password"
                    id="confirmPassword"
                    placeholder="Konfirmasi password kamu disini ..."
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.confirmPassword.type === "required"
                        ? "* Password harus diisi"
                        : "* Password tidak sama"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                  <Button
                    type="submit"
                    style={{ width: "100%" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" light={true} />
                        <span className="pl-2">Loading ...</span>
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button
                    type="button"
                    color="light"
                    style={{ width: "100%" }}
                    onClick={() => router.push("/auth/login")}
                  >
                    {/* {time > 0 ? (
                      <>
                        <Spinner size="sm" light={true} />
                        <span className="pl-2">
                          Mohon tunggu {time * -1} detik lagi
                        </span>
                      </>
                    ) : (
                      "Kirim Ulang Link"
                    )} */}
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface IServerSideProps {
  query: {
    usrid: string;
    c: string;
  };
}

export const getServerSideProps = async (context: IServerSideProps) => {
  const { usrid, c } = context.query;

  if (!usrid || !c) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Verify;

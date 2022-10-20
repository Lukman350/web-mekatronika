import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import callAPI from "@/lib/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Spinner, Button, Label, TextInput } from "flowbite-react";
import validateToken from "@/utils/validateToken";

type FormData = {
  nis: number;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: unknown) => {
    setLoading(true);

    const { nis, password } = data as { nis: number; password: string };

    const response = await callAPI({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL as string}/auth/login`,
      data: {
        nis,
        password,
      },
    });

    if (response.success) {
      const { refreshToken } = response.data;

      const encryptedToken = btoa(refreshToken);

      Cookies.set("refreshToken", encryptedToken, {
        expires: 1,
      });

      toast.success(response.message);

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
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
    <Layout title="Teknik Mekatronika - Login Page" navbarIsShow={false}>
      <div className="container min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-md">
          <div className="background-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-300 dark:border dark:border-slate-700">
            <div className="p-2">
              <h1 className="text-center dark:text-secondary-dark text-2xl font-bold">
                Login
              </h1>
              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4 mt-2"
              >
                <div className="flex flex-col justify-start w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="nis" value="NIS" />
                  </div>
                  <TextInput
                    {...register("nis", {
                      required: true,
                      maxLength: 7,
                      minLength: 7,
                    })}
                    type="number"
                    id="nis"
                    sizing="md"
                    placeholder="Masukkan NIS kamu disini ..."
                  />
                  {errors.nis && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.nis.type === "required"
                        ? "* Nomor NIS harus diisi"
                        : "* Nomor NIS harus 7 digit"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-start w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Password" />
                  </div>
                  <TextInput
                    {...register("password", {
                      required: true,
                    })}
                    type="password"
                    id="password"
                    sizing="md"
                    placeholder="Masukkan password kamu disini ..."
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.password.type === "required" &&
                        "* Password harus diisi"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center w-full gap-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%" }}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" light={true} />
                        <span className="pl-2">Loading ...</span>
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                  <Button
                    color="light"
                    style={{ width: "100%" }}
                    onClick={() => router.push("/")}
                  >
                    Back to Home
                  </Button>
                </div>
              </form>
              <Link href="/auth/register">
                <a className="block my-2 text-right text-gray-700 dark:text-secondary-dark text-sm hover:underline">
                  Tidak mempunyai akun? Register disini
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;

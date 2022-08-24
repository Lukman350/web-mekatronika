import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import callAPI from "@/lib/Api";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import Layout from "@/components/Layout";
import Link from "next/link";
import validateToken from "@/utils/validateToken";

type FormData = {
  username: string;
  email: string;
  nis: number;
};

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: unknown) => {
    setLoading(true);

    const response = await callAPI({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL as string}/auth/register`,
      data,
    });

    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    toast.success(response.message);

    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
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
    <Layout title="Teknik Mekatronika - Register Page" navbarIsShow={false}>
      <div className="container min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-md">
          <div className="background-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-300 dark:border dark:border-slate-700">
            <div className="p-2">
              <h1 className="text-center dark:text-secondary-dark text-2xl font-bold">
                Register
              </h1>
              <form
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4 mt-2"
              >
                <div className="flex flex-col justify-start w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <TextInput
                    {...register("username", {
                      required: true,
                    })}
                    type="text"
                    id="username"
                    sizing="md"
                    placeholder="Masukkan Username sesuka mu disini ..."
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.username.type === "required" &&
                        "* Username harus diisi"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-start w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Alamat Email" />
                  </div>
                  <TextInput
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                    sizing="md"
                    type="email"
                    id="email"
                    placeholder="Masukkan Alamat Email kamu disini ..."
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.email.type === "required"
                        ? "* Alamat Email harus diisi"
                        : "* Alamat Email tidak valid"}
                    </p>
                  )}
                </div>
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
                <div className="flex flex-col items-center w-full gap-2">
                  <Button
                    type="submit"
                    style={{ width: "100%" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" light={true} />
                        <span className="pl-3">Loading ...</span>
                      </>
                    ) : (
                      "Register"
                    )}
                  </Button>
                  <Button
                    color="light"
                    onClick={() => router.push("/")}
                    style={{ width: "100%" }}
                  >
                    Back to Home
                  </Button>
                </div>
              </form>
              <Link href="/auth/login">
                <a className="block my-2 text-right text-gray-700 dark:text-secondary-dark text-sm hover:underline">
                  Sudah mempunyai akun? Login disini
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

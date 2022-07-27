import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import callAPI from "@/lib/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Head from "next/head";
import Link from "next/link";

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

  const onSubmit = async (data: unknown) => {
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

      Cookies.set("refreshToken", refreshToken, {
        expires: 1,
      });

      router.push("/");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Head>
        <title>Teknik Mekatronika - Login Page</title>
      </Head>
      <div className="container min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-md">
          <div className="background-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-300 dark:border dark:border-slate-700">
            <div className="p-2">
              <h1 className="text-center dark:text-secondary-dark text-2xl font-bold">
                Login
              </h1>
              <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-start w-full mt-2">
                  <label htmlFor="nis" className="font-semibold py-2">
                    <span className="text-gray-700 dark:text-secondary-dark">
                      NIS
                    </span>
                  </label>
                  <input
                    {...register("nis", {
                      required: true,
                      maxLength: 7,
                      minLength: 7,
                    })}
                    className="form-input-primary"
                    type="number"
                    id="nis"
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
                <div className="flex flex-col justify-start w-full mt-2">
                  <label htmlFor="password" className="font-semibold py-2">
                    <span className="text-gray-700 dark:text-secondary-dark">
                      Password
                    </span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    className="form-input-primary"
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
                <div className="flex flex-col items-center w-full mt-4 gap-2">
                  <button
                    className="btn-primary w-full dark:btn-secondary"
                    type="submit"
                  >
                    Login
                  </button>
                  <Link href="/">
                    <a className="btn-secondary w-full text-center dark:btn-primary">
                      Back to Home
                    </a>
                  </Link>
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
    </>
  );
};

export default Login;

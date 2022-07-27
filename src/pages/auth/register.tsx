import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import callAPI from "@/lib/Api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Head from "next/head";
import Link from "next/link";

type FormData = {
  username: string;
  email: string;
  nis: number;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: unknown) => {
    const response = await callAPI({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL as string}/auth/register`,
      data,
    });

    if (!response.success) return toast.error(response.message);

    toast.success(response.message);

    setTimeout(() => {
      router.push("/auth/login");
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Teknik Mekatronika - Register Page</title>
      </Head>
      <div className="container min-h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-md">
          <div className="background-gradient shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-slate-300 dark:border dark:border-slate-700">
            <div className="p-2">
              <h1 className="text-center dark:text-secondary-dark text-2xl font-bold">
                Register
              </h1>
              <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-start w-full mt-2">
                  <label htmlFor="fullName" className="font-semibold py-2">
                    <span className="text-gray-700 dark:text-secondary-dark">
                      Username
                    </span>
                  </label>
                  <input
                    {...register("username", {
                      required: true,
                    })}
                    className="form-input-primary"
                    type="text"
                    id="username"
                    placeholder="Masukkan Username sesuka mu disini ..."
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs italic mt-2">
                      {errors.username.type === "required" &&
                        "* Username harus diisi"}
                    </p>
                  )}
                </div>
                <div className="flex flex-col justify-start w-full mt-2">
                  <label htmlFor="fullName" className="font-semibold py-2">
                    <span className="text-gray-700 dark:text-secondary-dark">
                      Alamat Email
                    </span>
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                    className="form-input-primary"
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
                <div className="flex flex-col justify-start w-full mt-2">
                  <label
                    htmlFor="confirmPassword"
                    className="font-semibold py-2"
                  >
                    <span className="text-gray-700 dark:text-secondary-dark">
                      Konfirmasi Password
                    </span>
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === watch("password") || "* Password tidak sama",
                    })}
                    className="form-input-primary"
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
                <div className="flex flex-col items-center w-full mt-4 gap-2">
                  <button
                    className="btn-primary w-full dark:btn-secondary"
                    type="submit"
                  >
                    Register
                  </button>
                  <Link href="/">
                    <a className="btn-secondary w-full text-center dark:btn-primary">
                      Back to Home
                    </a>
                  </Link>
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
    </>
  );
};

export default Register;

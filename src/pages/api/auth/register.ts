import type { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "@/data-types";
import * as db from "@/database";
import bcrypt from "bcryptjs";
import UserSchema from "@/database/schema/User";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  if (req.method !== "POST")
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });

  const { username, email, nis } = req.body as {
    username: string;
    email: string;
    nis: number;
  };

  if (!nis || !username || !email)
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });

  await db.connect();

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const check = await User.find({
    $or: [{ username: username }, { nis: nis }],
  }).exec();

  if (check.length > 0) {
    res.status(400).json({
      success: false,
      message: "Username atau NIS sudah terdaftar",
    });

    await db.disconnect();
    return;
  }

  const generateVerifyCode = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 32; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }

    return code;
  };

  const user = await User.create({
    username: username,
    email: email,
    nis: nis,
    verified: false,
    verifyCode: generateVerifyCode(),
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime(),
  });

  if (!user) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });

    await db.disconnect();
    return;
  }

  await db.disconnect();

  res.status(200).json({
    success: true,
    message:
      "Selamat Akun Anda berhasil dibuat, silahkan cek Email Anda untuk verifikasi akun",
  });
}

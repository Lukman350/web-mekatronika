import type { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "@/data-types";
import * as db from "@/database";
import bcrypt from "bcryptjs";
import UserSchema from "@/database/schema/User";
import mongoose, { isValidObjectId } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { userid, verifyCode, password } = req.body as {
    userid: number;
    verifyCode: string;
    password: string;
  };

  if (!userid || !verifyCode || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }

  if (!isValidObjectId(userid)) {
    return res.status(400).json({
      success: false,
      message: "Invalid userid",
    });
  }

  await db.connect();

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const checkUser = await User.findOne({ _id: userid }).exec();

  if (!checkUser) {
    res.status(404).json({
      success: false,
      message: "Kode verifikasi tidak ditemukan",
    });

    await db.disconnect();
    return;
  }

  const isCodeMatch = verifyCode === checkUser.verifyCode;

  if (!isCodeMatch) {
    res.status(403).json({
      success: false,
      message: "Kode verifikasi tidak valid",
    });

    await db.disconnect();
    return;
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.updateOne(
    { _id: userid },
    {
      $set: {
        password: hashPassword,
        verified: true,
        verifyCode: "",
      },
    }
  ).exec();

  if (!user) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });

    await db.disconnect();
    return;
  }

  await db.disconnect();

  res.status(200).json({
    success: true,
    message: "Akun berhasil diverifikasi",
  });
}

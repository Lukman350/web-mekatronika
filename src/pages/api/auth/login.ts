import type { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "@/data-types";
import * as db from "@/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

  const { nis, password } = req.body as { nis: string; password: string };

  if (!nis || !password)
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });

  await db.connect();

  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const user = await User.findOne({ nis: nis }).exec();

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User tidak ditemukan",
    });

    await db.disconnect();
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(403).json({
      success: false,
      message: "Password yang Anda masukkan salah",
    });

    await db.disconnect();
    return;
  }

  if (!user.verified) {
    res.status(403).json({
      success: false,
      message: "Akun Anda belum diverifikasi, silahkan cek email Anda",
    });

    await db.disconnect();
    return;
  }

  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      nis: user.nis,
      role: user.role,
      verified: user.verified,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  await db.disconnect();

  res.status(200).json({
    success: true,
    message: "Berhasil login",
    data: {
      refreshToken: token,
    },
  });
}

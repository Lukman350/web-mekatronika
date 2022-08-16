import { Schema } from "mongoose";

interface IUser {
  name: string;
  username: string;
  email: string;
  nis: number;
  password: string;
  role: string;
  verifyCode: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      default: "Unknown",
    },
    nis: {
      type: Number,
      default: 0,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    verifyCode: {
      type: String,
      default: "",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

export default UserSchema;

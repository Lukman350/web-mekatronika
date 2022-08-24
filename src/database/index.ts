import mongoose from "mongoose";
import chalk from "chalk";

export async function connect() {
  await mongoose
    .connect(process.env.MONGODB_HOST as string, {
      dbName: "meka69"
    })
    .catch((err) => console.log(chalk.red("error"), err));

  console.log(chalk.green("info"), "- Connected to MongoDB");
}

export async function disconnect() {
  await mongoose.connection.close();
  console.log(chalk.green("info"), "- Disconnected from MongoDB");
}

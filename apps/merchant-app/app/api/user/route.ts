import { NextResponse } from "next/server";
// import PrismaClient from "@repo/db/client";
import prisma from "@repo/db/client";

export const GET = async () => {
  // await prisma.user.create({
  //   data: {
  //     email: "asds@gmail.com",
  //     name: "adsads",
  //     number: "1234567891",
  //     password: "securepassword", // Required field
  //   },
  // });
  return NextResponse.json({
    message: "hi there",
  });
};

"use server";
import { connectDB } from "../lib/db";
import User from "../models/User";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleSignup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  await connectDB();
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    redirect("/login?error=User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, phone, password: hashedPassword });

  redirect("/login?success=Account successfully created");
}

export async function handleLogin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await connectDB();
  const user = await User.findOne({ email });
  if (!user) return { error: "No user found" };

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Wrong password" };

  const cookieStore = await cookies();
  cookieStore.set("session_name", user.name, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  cookieStore.set("session_email", user.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  redirect("/dashboard");
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("session_name");
  cookieStore.delete("session_email");
  redirect("/login");
}
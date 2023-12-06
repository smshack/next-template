"use client";
import Link from "next/link";
import Image from "next/image";
import nextjs from "@/../public/img/nextjs-logotype-light-background.png";
import BgPositionBtn from "../buttons/BgPositionBtn";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import InputLabel from "@/components/forms/InputLabel";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLogedin, setIsLogedin] = useState(false); // [TODO] 로그인 상태 확인하는 변수
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = useSession(); // [TODO] 로그인 상태 확인하는 라이브러리 내장 함수

  // [DONE] 로그인 상태 확인하는 변수 useSession은 프로바이더가 반드시 필요
  // 로그인 관련 컴포넌트는 utils/SessionProvider.tsx에 있음
  useEffect(() => {
    console.log(session);
    if (session !== null && session !== undefined) {
      setIsLogedin(true);
    } else {
      setIsLogedin(false);
    }
  }, [session]);

  async function handleLogin(e: any) {
    e.preventDefault();
    if (!isLogedin) {
      const requestedEmail = email;
      const requestedPassword = password;
      await signIn("credentials", {
        redirect: false,
        requestedEmail,
        requestedPassword,
      });
    } else {
      signOut();
    }
  }

  if (isLogedin) {
    return <div></div>;
  }

  return (
    <div className="z-10 absolute flex justify-center items-center top-0 left-0 bg-gray-500 bg-opacity-40 w-full h-full">
      <div className="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700 animate-fadeIn">
        <div className="space-y-2 text-center">
          <div className="flex justify-around gap-3 mb-5">
            <h1 className="text-3xl font-bold rounded-lg">Login</h1>
          </div>
          <h2 className="text-lg font-medium">
            {isLogin
              ? "Welcome! Pls login to your account."
              : "Thank you for joining us!"}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            You can check the&nbsp;
            <Link className="text-blue-400 hover:text-blue-700" href="#">
              privacy policy
            </Link>
            .
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="flex">
            <div className="flex flex-col grow gap-2">
              <InputLabel
                id="email"
                type="text"
                label="Email"
                required
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <InputLabel
                id="password"
                type="password"
                label="Password"
                required
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-24 px-2">
              <BgPositionBtn
                content={isLogedin ? "Logout" : "Login"}
                width="w-full"
                height="h-full"
              />
            </div>
          </div>
          <div className="text-center">
            If you have not account
            <Link className="text-blue-400 hover:text-blue-700" href="#">
              &nbsp;Join here
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
            <span className="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
            <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
          </div>
          <BgPositionBtn
            content={
              <div className="flex items-center justify-center">
                <svg
                  className=" w-5 h-5 mr-2"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" x2="12" y1="8" y2="8" />
                  <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
                  <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
                </svg>
                Login with Google
              </div>
            }
            width="w-full"
          />
        </form>
        <div className="w-full flex justify-end items-center gap-2">
          <div className="font-bold">Powered by</div>{" "}
          <Image
            src={nextjs}
            alt="v0_logo"
            className="animate-neon"
            width={60}
          />{" "}
        </div>
      </div>
    </div>
  );
}

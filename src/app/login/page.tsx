"use client";

import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import { useEffect } from "react";
import { RootState } from "@/GlobalRedux/store";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const authorized = useSelector(
    (state: RootState) => state.authorize.authorized
  );

  useEffect(() => {
    if (authorized) {
      redirect("/feed");
    }
  }, [authorized]);
  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;

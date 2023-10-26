"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";

const withAuth = (Component: any) => {
  const WithAuth = (props: any) => {
    const authorized = useSelector(
      (state: RootState) => state.authorize.authorized
    );
    useEffect(() => {
      if (!authorized) {
        redirect("/login");
      }
    }, []);

    if (!authorized) {
      return null;
    }

    return <Component {...props} />;
  };

  return WithAuth;
};

export default withAuth;

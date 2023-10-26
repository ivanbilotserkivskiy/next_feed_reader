"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const withAuth = (Component: any) => {
  const WithAuth = (props: any) => {
    const authorized = true;
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

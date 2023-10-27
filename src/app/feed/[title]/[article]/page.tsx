"use client";

import { RootState } from "@/GlobalRedux/store";
import withAuth from "@/HOCs/withAuth";
import { getFeedData } from "@/app/api/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Article = () => {
  const articles = useSelector((state: RootState) => state.feed.articles);
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  console.log(content);

  return <h1>Article</h1>;
};

export default withAuth(Article);

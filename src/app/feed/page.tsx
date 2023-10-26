"use client";

import withAuth from "@/HOCs/withAuth";
import { useEffect } from "react";

const FeedPage = () => {
  const getData = async () => {
    fetch("https://www.reddit.com/.rss").then((res) => console.log(res));
  };

  useEffect(() => {
    getData();
  }, []);

  return <h1>Feed Page</h1>;
};

export default withAuth(FeedPage);

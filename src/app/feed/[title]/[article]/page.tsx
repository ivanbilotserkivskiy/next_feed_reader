"use client";

import { RootState } from "@/GlobalRedux/store";
import withAuth from "@/HOCs/withAuth";
import { getFeedData } from "@/app/api/api";
import { FeedItem } from "@/types/FeedItem";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Article = () => {
  const articles = useSelector((state: RootState) => state.feed.articles);
  const searchParams = useSearchParams();
  const passedTitle = searchParams.get("content");
  const [currentArticle, setCurrentArticle] = useState<FeedItem | null>(null);

  useEffect(() => {
    setCurrentArticle(() => {
      return (
        articles.find((article) => {
          return article.title === passedTitle;
        }) || null
      );
    });
    console.log(articles);
  }, [articles, passedTitle]);
  return (
    <div className="min-h-screen bg-gray-100 flex p-10 justify-center">
      {currentArticle ? (
        <article className="bg-white p-8 rounded-lg shadow-md w-full max-w-screen-md">
          <h1 className="text-3xl font-bold mb-4">{currentArticle.title}</h1>
          <p className="text-gray-600 text-lg mb-4">
            {currentArticle.contentSnippet}
          </p>
          <p className="text-gray-600 text-sm">
            {currentArticle.author || currentArticle.creator}
          </p>
          <p className="text-gray-600 text-sm">{currentArticle.isoDate}</p>
        </article>
      ) : null}
    </div>
  );
};

export default withAuth(Article);

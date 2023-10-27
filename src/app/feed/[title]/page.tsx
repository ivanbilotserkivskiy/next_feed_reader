"use client";

import withAuth from "@/HOCs/withAuth";
import FeedArticleSnippet from "./components/FeedArticleSnippet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchByLink } from "@/GlobalRedux/Features/feed/feedSlice";

const FeedStream = () => {
  const articles = useSelector((state: RootState) => state.feed.articles);
  const dispatch = useDispatch();
  console.log(articles);
  const subscriptions = useSelector(
    (state: RootState) => state.feed.subscriptions
  );
  const searchParams = useSearchParams();
  const linkId = searchParams.get("feed") || "";

  const nextLink = subscriptions.find(
    (subscription) => subscription.id === linkId
  );

  const fetchLink = nextLink?.link || "";

  useEffect(() => {
    dispatch(fetchByLink(fetchLink) as any);
  }, [dispatch, fetchLink]);

  return (
    <div className="p-12">
      {articles.map((article) => (
        <FeedArticleSnippet
          key={article.isoDate}
          author={
            article.author
              ? article.author
              : article.creator
              ? article.creator
              : ""
          }
          time={article.isoDate}
          title={article.title}
          content={article.contentSnippet}
        />
      ))}
    </div>
  );
};

export default withAuth(FeedStream);

"use client";

import withAuth from "@/HOCs/withAuth";
import FeedArticleSnippet from "./components/FeedArticleSnippet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/GlobalRedux/store";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchByLink } from "@/GlobalRedux/Features/feed/feedSlice";
import { FeedItem } from "@/types/FeedItem";
import FeedArticle from "./components/FeedArticle";

const FeedStream = () => {
  const articles = useSelector((state: RootState) => state.feed.articles);
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state: RootState) => state.feed.subscriptions
  );
  const searchParams = useSearchParams();
  const linkId = searchParams.get("feed") || "";

  const nextLink = subscriptions.find(
    (subscription) => subscription.id === linkId
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<FeedItem | null>(null);

  const openModal = (article: FeedItem) => {
    setCurrentArticle(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentArticle(null);
    setShowModal(false);
  };

  const fetchLink = nextLink?.link || "";

  useEffect(() => {
    dispatch(fetchByLink(fetchLink) as any);
  }, [dispatch, fetchLink]);

  return (
    <>
      <div className="p-12">
        {articles.map((article) => (
          <FeedArticleSnippet
            key={article.isoDate}
            article={article}
            openModal={openModal}
          />
        ))}
      </div>
      {currentArticle ? (
        <FeedArticle
          currentArticle={currentArticle}
          showModal={showModal}
          closeModal={closeModal}
        />
      ) : null}
    </>
  );
};

export default withAuth(FeedStream);

"use client";

import { RootState } from "@/GlobalRedux/store";
import withAuth from "@/HOCs/withAuth";
import { FeedData } from "@/types/FeedData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFeedData } from "../api/api";
import FeedCard from "./components/FeedCard";
import { FeedCard as FeedCardType } from "@/types/FeedCard";

const FeedPage = () => {
  const subscriptions = useSelector(
    (state: RootState) => state.feed.subscriptions
  );

  const [feeds, setFeeds] = useState<FeedCardType[]>([]);

  const getData = async () => {
    try {
      const feedData = await getFeedData("/api/feed/", subscriptions);
      if (feedData.error) {
        return;
      }
      setFeeds(feedData.feeds);
    } catch {}
  };

  useEffect(() => {
    getData();
  }, [subscriptions.length]);

  return (
    <div className="p-4 flex flex-col items-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Feed Page</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {feeds.map((feed) => (
          <FeedCard
            key={feed.title}
            title={feed.title}
            time={feed.lastBuildDate}
          />
        ))}
      </div>
    </div>
  );
};

export default withAuth(FeedPage);

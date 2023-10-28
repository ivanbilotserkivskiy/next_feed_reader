"use client";

import { RootState } from "@/GlobalRedux/store";
import withAuth from "@/HOCs/withAuth";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserFeed,
  getFeedData,
  getUserFeeds,
  removeUserFeed,
  updateUserFeed,
} from "../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedCard from "./components/FeedCard";
import { FeedCard as FeedCardType } from "@/types/FeedCard";
import { subscribe } from "@/GlobalRedux/Features/feed/feedSlice";
import { UserFeed } from "@/types/UserFeed";
import UserFeedCard from "./components/UserFeedCard";
import UserArticle from "./components/UserArticle";
import UserFeedForm from "./components/UserFeedForm";
import Loader from "./components/Loader";
const FeedPage = () => {
  const subscriptions = useSelector(
    (state: RootState) => state.feed.subscriptions
  );
  const dispatch = useDispatch();

  const [feeds, setFeeds] = useState<FeedCardType[]>([]);
  const [newFeedURL, setNewFeedURL] = useState<string>("");
  const [userFeeds, setUserFeeds] = useState<UserFeed[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFormModal, setShowFormModal] = useState<boolean>(false);
  const [currentArticle, setCurrentArticle] = useState<UserFeed | null>(null);

  const notify = (message: string) => toast(message);
  const notifyError = (message: string) => toast.error(message);
  const openModal = (article: UserFeed) => {
    setCurrentArticle(article);
    setShowModal(true);
  };

  const closeModal = () => {
    setCurrentArticle(null);
    setIsEditing(false);
    setShowModal(false);
  };

  const updateUserFeedData = async (feed: UserFeed) => {
    try {
      await updateUserFeed(feed);
      const newUserFeeds = userFeeds.map((userFeed) => {
        if (feed.id === userFeed.id) {
          return feed;
        }

        return userFeed;
      });
      notify("User data updated");
      setUserFeeds(newUserFeeds);
      setIsEditing(false);
      setShowModal(false);
      setCurrentArticle(null);
    } catch {
      notifyError("An error occurred in updating user data");
    }
  };

  const getData = async () => {
    const subscriptionLinks = subscriptions.map(
      (subscription) => subscription.link
    );
    try {
      setIsLoading(true);
      const feedData = await getFeedData("/api/feed/", subscriptionLinks);
      if (feedData.error) {
        return;
      }
      setFeeds(feedData.feeds);
    } catch {
      notifyError("An error occurred in loading rss feeds");
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const feedData = await getUserFeeds("/api/user/");
      if (feedData.error) {
        return;
      }
      setUserFeeds(feedData.feeds);
    } catch {
      notifyError("An error occurred in loading user feeds");
    }
  };

  const changeFeedURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeedURL(event.target.value);
  };
  const addRssFeed = () => {
    dispatch(subscribe(newFeedURL));

    getData();
  };

  const startEditing = (article: UserFeed) => {
    setShowModal(true);
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const createFeed = async (newFeed: UserFeed) => {
    try {
      const userFeedIds = userFeeds.map((feed) => feed.id);
      const maxId = Math.max(...userFeedIds);
      const newFeedToServer = {
        ...newFeed,
        id: maxId + 1,
        userId: 1,
        lastBuildDate: `${new Date()}`,
      };
      await createUserFeed(newFeedToServer);
      setUserFeeds((prev) => [...prev, newFeedToServer]);
      notify("New User feed was created");
    } catch {
      notifyError("An error occurred in creating user feede");
    }
  };

  const removeFeed = async (id: number) => {
    try {
      await removeUserFeed(id);
      setUserFeeds((prev) => prev.filter((feed) => feed.id !== id));
      notify("You unsubscribed from user feed");
    } catch {
      notifyError("An error occurred in deleting user feed");
    }
  };

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getData();
  }, [subscriptions.length]);

  return (
    <div className="p-4 flex flex-col items-center h-screen">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Feed Page</h1>
      <form className="flex items-center p-6">
        <div className="flex flex-col">
          <label className="block text-gray-700" htmlFor="rss-link">
            Subscribe to new RSS feed
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="url"
            id="rss-link"
            placeholder="RSS url"
            name="username"
            onChange={changeFeedURL}
            value={newFeedURL}
          />
        </div>
        <button
          className="self-end ml-2 bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
          type="button"
          onClick={addRssFeed}
        >
          Subscribe
        </button>
      </form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? <Loader /> : null}
        {feeds.map((feed) => (
          <FeedCard
            key={feed.title}
            feedLink={feed.link}
            title={feed.title}
            time={feed.lastBuildDate}
          />
        ))}
      </div>
      <div className="p-4 flex flex-col items-center h-screen">
        <h1 className="text-2xl font-semibold mb-4">User Feeds</h1>
        <div>
          <button
            className="self-end ml-2 bg-green-500 text-white font-semibold p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring"
            onClick={() => setShowFormModal(true)}
          >
            Create Form
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userFeeds.map((feed) => (
            <UserFeedCard
              key={feed.id}
              feed={feed}
              removeUserFeed={removeFeed}
              openModal={openModal}
              startEditing={startEditing}
            />
          ))}
        </div>
      </div>
      <UserArticle
        currentArticle={currentArticle}
        showModal={showModal}
        isEditing={isEditing}
        closeModal={closeModal}
        updateUserFeedData={updateUserFeedData}
      />
      {showFormModal ? (
        <UserFeedForm closeModal={closeFormModal} createFeed={createFeed} />
      ) : null}
    </div>
  );
};

export default withAuth(FeedPage);

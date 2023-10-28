"use client";
import { getDateFromTime } from "@/utils/getDateFromTime";
import { UserFeed } from "@/types/UserFeed";
type Props = {
  feed: UserFeed;
  removeUserFeed: (id: number) => void;
  openModal: (article: UserFeed) => void;
  startEditing: (article: UserFeed) => void;
};

const UserFeedCard: React.FC<Props> = ({
  feed,
  removeUserFeed,
  openModal,
  startEditing,
}) => {
  const feedDate = getDateFromTime(feed.lastBuildDate);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center  transform transition-transform hover:scale-105 hover:cursor-pointer hover:text-blue-500">
      <h2
        className="text-center w-5/6 text-xl font-semibold mb-1"
        onClick={() => openModal(feed)}
      >
        {feed.title}
      </h2>
      <div>
        <p className="mb-3  ">
          <span className="mr-4 text-black dark:text-white">Last update: </span>
          <span className="text-gray-600 text-sm">{feedDate}</span>
        </p>
        <div className="flex justify-betweenmt-2">
          <button
            className=" bg-red-500 mr-6 text-white font-semibold p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring"
            onClick={() => removeUserFeed(feed.id)}
          >
            Unsubscribe
          </button>
          <button
            className="bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
            onClick={() => startEditing(feed)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedCard;

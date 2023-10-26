import { getDateFromTime } from "@/utils/getDateFromTime";

type Props = {
  title: string;
  time: string;
};

const FeedCard: React.FC<Props> = ({ title, time }) => {
  const feedDate = getDateFromTime(time);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:text-blue-500">
      <h2 className="text-center text-xl font-semibold mb-1">{title}</h2>
      <p className="">
        <span className="mr-4 text-black dark:text-white">Last update: </span>
        <span className="text-gray-600 text-sm">{feedDate}</span>
      </p>
    </div>
  );
};

export default FeedCard;

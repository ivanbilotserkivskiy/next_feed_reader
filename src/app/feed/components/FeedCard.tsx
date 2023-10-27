import { RootState } from "@/GlobalRedux/store";
import { getDateFromTime } from "@/utils/getDateFromTime";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchByLink,
  setArticles,
} from "@/GlobalRedux/Features/feed/feedSlice";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
type Props = {
  title: string;
  time: string;
  feedLink: string;
};

const FeedCard: React.FC<Props> = ({ title, time, feedLink }) => {
  const feedDate = getDateFromTime(time);
  const dispatch = useDispatch();
  const subscriptions = useSelector(
    (state: RootState) => state.feed.subscriptions
  );
  const nextLink = subscriptions.find(
    (subscription) => subscription.link === feedLink
  );
  const nextId = nextLink?.id || "";
  const pathname = usePathname();
  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center transform transition-transform hover:scale-105 hover:cursor-pointer hover:text-blue-500">
      <Link
        href={pathname + `/${title}` + "?" + createQueryString("feed", nextId)}
        target="_blank"
      >
        <h2 className="text-center text-xl font-semibold mb-1">{title}</h2>
        <p className="">
          <span className="mr-4 text-black dark:text-white">Last update: </span>
          <span className="text-gray-600 text-sm">{feedDate}</span>
        </p>
      </Link>
    </div>
  );
};

export default FeedCard;

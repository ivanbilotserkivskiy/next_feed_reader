import { fetchByLink } from "@/GlobalRedux/Features/feed/feedSlice";
import { RootState } from "@/GlobalRedux/store";
import { getDateFromTime } from "@/utils/getDateFromTime";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  author: string;
  content: string;
  time: string;
  title: string;
};

const FeedArticleSnippet: React.FC<Props> = ({
  author,
  content,
  time,
  title,
}) => {
  const date = getDateFromTime(time);
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
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transform transition-transform hover:scale-105 hover:cursor-pointer hover:text-blue-500">
      <Link
        href={
          pathname + `/article-details?content=${encodeURIComponent(content)}`
        }
        target="_blank"
      >
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">By {author}</p>
        <p className="text-sm text-gray-700 mb-4">{content}</p>
        <p className="text-sm text-gray-500">{date}</p>
      </Link>
    </div>
  );
};

export default FeedArticleSnippet;

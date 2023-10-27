import { FeedItem } from "@/types/FeedItem";
import { getDateFromTime } from "@/utils/getDateFromTime";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  article: FeedItem;
  openModal: (article: FeedItem) => void;
};

const FeedArticleSnippet: React.FC<Props> = ({ article, openModal }) => {
  const date = getDateFromTime(article.isoDate);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 transform transition-transform hover:scale-105 hover:cursor-pointer hover:text-blue-500">
      <Link
        href={`#/article-details/${article.title}`}
        onClick={() => openModal(article)}
      >
        <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          By {article.author || article.creator}
        </p>
        <p className="text-sm text-gray-500">{date}</p>
      </Link>
    </div>
  );
};

export default FeedArticleSnippet;

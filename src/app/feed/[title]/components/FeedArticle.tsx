"use client";
import { FeedItem } from "@/types/FeedItem";

type Props = {
  currentArticle: FeedItem;
  showModal: boolean;
  closeModal: () => void;
};

const FeedArticle: React.FC<Props> = ({
  currentArticle,
  showModal,
  closeModal,
}) => {
  return (
    <>
      {currentArticle && showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="modal-overlay absolute w-full h-full bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <article className="modal-container bg-white p-8 rounded-lg shadow-md max-w-screen-md relative z-10">
            <h1 className="text-3xl font-bold mb-4">{currentArticle.title}</h1>
            <p className="text-gray-600 text-lg mb-4">
              {currentArticle.contentSnippet}
            </p>
            <a
              className="text-blue-500 text-base hover:underline text-sm"
              href={currentArticle.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read all
            </a>
            <p className="text-gray-600 text-sm">
              {currentArticle.author || currentArticle.creator}
            </p>
            <p className="text-gray-600 text-sm">{currentArticle.isoDate}</p>
            <button
              className="modal-close mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </article>
        </div>
      )}
    </>
  );
};

export default FeedArticle;

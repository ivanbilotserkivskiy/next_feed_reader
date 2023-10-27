"use client";
import { UserFeed } from "@/types/UserFeed";
import { getDateFromTime } from "@/utils/getDateFromTime";
import { useState } from "react";

type Props = {
  currentArticle: UserFeed | null;
  showModal: boolean;
  isEditing: boolean;
  closeModal: () => void;
  updateUserFeedData: (article: UserFeed) => void;
};

const UserArticle: React.FC<Props> = ({
  currentArticle,
  showModal,
  isEditing,
  closeModal,
  updateUserFeedData,
}) => {
  const date = currentArticle
    ? getDateFromTime(currentArticle?.lastBuildDate)
    : "";

  const [formData, setFormData] = useState({
    title: currentArticle ? currentArticle.title : "",
    body: currentArticle ? currentArticle.body : "",
  });

  const changeFormData = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <>
      {!isEditing && currentArticle && showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="modal-overlay absolute w-full h-full bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <article className="modal-container bg-white p-8 rounded-lg shadow-md max-w-screen-md relative z-10">
            <h1 className="text-3xl font-bold mb-4">{currentArticle.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{currentArticle.body}</p>
            <p className="text-gray-600 text-sm">{date}</p>
            <button
              className="modal-close mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </article>
        </div>
      )}

      {isEditing && currentArticle && showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div
            className="modal-overlay absolute w-full h-full bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <article className="modal-container bg-white p-8 rounded-lg shadow-md w-1/2 max-w-screen-md relative z-10">
            <label className="block text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              autoComplete="current-password"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              type="text"
              id="title"
              placeholder="title"
              onChange={changeFormData}
              value={formData.title}
              name="title"
            />
            <label className="block text-gray-700" htmlFor="body">
              Content
            </label>
            <textarea
              autoComplete="current-password"
              className="w-full px-3 py-2 border h-64 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              id="body"
              placeholder="body"
              value={formData.body}
              onChange={changeFormData}
              name="body"
            />
            <p className="text-gray-600 text-sm">{date}</p>
            <div className="flex justify-between">
              <button
                className="modal-close mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="modal-close mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  const updatedData = {
                    ...currentArticle,
                    title: formData.title,
                    body: formData.body,
                  };
                  updateUserFeedData(updatedData);
                }}
              >
                Update
              </button>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default UserArticle;

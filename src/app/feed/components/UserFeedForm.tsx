"use client";
import { UserFeed } from "@/types/UserFeed";
import { useState } from "react";

type Props = {
  createFeed: (article: UserFeed) => void;
  closeModal: () => void;
};

const UserFeedForm: React.FC<Props> = ({ createFeed, closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const clearForm = () => {
    setFormData({
      title: "",
      body: "",
    });
  };

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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createFeed(formData as UserFeed);
    clearForm();
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="modal-overlay absolute w-full h-full bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <form
        onSubmit={handleSubmit}
        className="absolute bg-white shadow-md z-10 w-4/6 rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={changeFormData}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            className="w-full px-3 py-2 border w-96 h-64 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            id="body"
            name="body"
            placeholder="Content"
            value={formData.body}
            onChange={changeFormData}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFeedForm;

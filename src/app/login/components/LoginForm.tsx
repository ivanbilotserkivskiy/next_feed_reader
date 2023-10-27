"use client";
import { loginUser } from "@/app/api/api";
import { LoginData } from "@/types/LoginData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/GlobalRedux/Features/authrize/authorizeSlice";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatcher = useDispatch();

  const changeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitFormData = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setIsError(false);
      const loginStatus = await loginUser(
        "https://jsonplaceholder.typicode.com/users",
        formData
      );

      dispatcher(login());
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-1/2 mx-auto mt-10 p-4 border rounded-lg bg-white">
      <form onSubmit={submitFormData} className="space-y-4">
        <div>
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            autoComplete="username"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            onChange={changeFormData}
            value={formData.username}
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeFormData}
            name="password"
          />
        </div>
        <div>
          {isError ? (
            <p className="block text-red-700">
              Something went wrong with user login
            </p>
          ) : null}
        </div>
        <div>
          <button
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

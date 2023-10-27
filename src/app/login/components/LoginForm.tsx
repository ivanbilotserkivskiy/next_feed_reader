const LoginForm = () => {
  return (
    <div className="w-1/2 mx-auto mt-10 p-4 border rounded-lg bg-white">
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <div>
          <button
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

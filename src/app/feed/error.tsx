"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const error: React.FC<Props> = ({ error, reset }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline"> {error.message}</span>
      <button className="absolute top-0 right-0 px-4 py-3" onClick={reset}>
        Try Again
      </button>
    </div>
  );
};

export default error;

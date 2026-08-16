import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
      <p className="mb-8 text-lg text-gray-600">
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
      >
        Back to Home
      </Link>
    </div>
  );
}

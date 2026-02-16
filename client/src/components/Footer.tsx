export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Nicholas Milligan
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/nicholasmilligan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nicholasmilligan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

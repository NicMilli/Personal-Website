const FILE_ID = "1KudstNmXi4gJa-bg6_3bkgfHSwz-LPI9";
const PREVIEW_URL = `https://drive.google.com/file/d/${FILE_ID}/preview`;
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export default function ResumePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-10">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Resume</h1>
        <a
          href={DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Download PDF
        </a>
      </div>

      <iframe
        src={PREVIEW_URL}
        className="h-[80vh] w-full rounded-lg border border-gray-200 shadow-sm"
        title="Resume"
        allow="autoplay"
      />
    </div>
  );
}

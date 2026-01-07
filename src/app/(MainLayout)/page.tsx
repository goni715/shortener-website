import CreateUrlForm from "@/components/home/CreateUrlForm";

const HomePage = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-5.5rem)] bg-linear-to-b from-blue-900 via-teal-900 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-2xl p-8">
          <div className="flex gap-0 mb-8 border-b border-gray-200">
            <button className="pb-4 px-4 font-semibold text-gray-900 border-b-2 border-teal-600 text-sm">
              🔗 Shorten a Link
            </button>
          </div>
          <CreateUrlForm />
        </div>
      </div>
    </>
  );
};

export default HomePage;

import UrlList from "./../../../components/dashboard/UrlList";

const DashboardPage = () => {
  return (
    <>
      <div className="min-h-[calc(100vh-5.5rem)] bg-linear-to-b from-blue-900 via-teal-900 to-blue-900 p-4">
        <div className="bg-white rounded-md shadow w-full">
          <div className="w-full max-w-7xl mx-auto">
            <UrlList />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;


const TableLoading = () => {
    const loadingArray = [1,2,3,4, 5, 6,7, 8];
    
    return (
      <>
        <div className="bg-white w-full lg:w-7xl px-3 pb-6">
          <div className=" space-y-4 animate-pulse">
            {loadingArray?.map((item) => (
                <div
                  key={item}
                  className="bg-gray-300 h-10 text-white font-bold py-2 px-4 rounded-md"
                ></div>
            ))}
          </div>
        </div>
      </>
    );
};

export default TableLoading;
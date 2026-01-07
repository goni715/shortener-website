import React, { Suspense, useState } from "react";
import TableLoading from "../loader/TableLoading";
import UrlTable from "./UrlTable";
import UrlListHeader from "./UrlListHeader";
import { useGetUrlsQuery } from "@/redux/features/url/urlApi";


const UrlList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError } = useGetUrlsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
  ]);

  const urls = data?.data || [];
  const meta = data?.meta || {};


  let content: React.ReactNode;

  if (isLoading) {
    content = <TableLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <>   
        <Suspense fallback={<TableLoading/>}>
          <div className="flex-1 overflow-hidden">
            <UrlTable
              urls={urls}
              meta={meta}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              loading={isFetching}
            />
          </div>
        </Suspense>
      </>
    );
  }

  if (!isLoading && isError) {
    content = <h1>Something Went Wrong</h1>;
  }

  return (
    <>
      <UrlListHeader meta={meta} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {content}
    </>
  )

};

export default UrlList;

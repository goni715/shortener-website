import React, { useEffect } from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import { IUrl } from "@/types/url.type";
import getColorClassForDate from "@/utils/getColorClassForDate";
import DeleteUrlModal from "../modal/DeleteUrlModal";
import ViewUrlModal from "../modal/ViewUrlModal";
import { ExternalLink } from "lucide-react";

interface TProps {
  urls: IUrl[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

type TDataSource = IUrl & {
  key: number;
  serial: number;
};

const UrlTable: React.FC<TProps> = ({
  urls,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading,
}) => {
  //handle pagination after deleting last document of last page
  useEffect(() => {
    if (currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [currentPage, meta, setCurrentPage]);

  const dataSource: TDataSource[] = urls?.map((url, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: url?._id,
    originalUrl: url?.originalUrl,
    shortUrl: url?.shortUrl,
    shortCode: url?.shortCode,
    visits: url?.visits,
    createdAt: url?.createdAt,
  }));

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Original Url",
      dataIndex: "originalUrl",
      key: "originalUrl",
      width: 200,
      render: (val: string) => (
        <>
          <div className="flex gap-2 items-center">
            <p className="w-50 truncate">{val}</p>
            <ViewUrlModal url={val} />
          </div>
        </>
      ),
    },
    {
      title: "Short Url",
      dataIndex: "shortUrl",
      key: "shortUrl",
      width: 300,
      render: (val: string) => (
        <>
          <div className="flex gap-2 items-center">
            <p>{val}</p>
            <a
              href={val}
              target="_blank"
              className={`p-1 rounded-full cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700`}
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </>
      ),
    },
    {
      title: "Short Code",
      dataIndex: "shortCode",
      key: "shortCode",
      width: 150,
      align: "center" as const,
    },
    {
      title: "Total Visits",
      dataIndex: "visits",
      key: "visits",
      width: 150,
      align: "center" as const,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
      render: (val: string) => {
        const { bg, text, border } = getColorClassForDate(val.split("T")[0]);
        return (
          <button
            className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
          >
            {val.split("T")[0]}
          </button>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 100,
      render: (urlId: string) => <DeleteUrlModal urlId={urlId} />,
    },
  ];

  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#FEF3C7",
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6",
            borderColor: "#E5E7EB",
          },
        },
      }}
    >
      <div className="w-full overflow-auto px-4">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ x: "max-content" }}
          className="custom-table min-h-[calc(100vh-290px)]"
          loading={loading}
        />
      </div>
      {meta?.totalPages > 1 && (
        <div className="p-8 bg-white border-gray-200 border-t shadow-md flex justify-center">
          <Pagination
            onChange={handlePagination}
            current={currentPage}
            pageSize={pageSize}
            total={meta?.total}
          />
        </div>
      )}
    </ConfigProvider>
  );
};

export default UrlTable;

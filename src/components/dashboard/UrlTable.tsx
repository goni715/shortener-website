import React, { useEffect } from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import { IUrl } from "@/types/url.type";
import getColorClassForDate from "@/utils/getColorClassForDate";


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
}

const UrlTable : React.FC<TProps> = ({
  urls,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}) => {

  //handle pagination after deleting last document of last page
  useEffect(() => {
    if (currentPage > meta.totalPages) {
      setCurrentPage(meta.totalPages);
    }
  }, [currentPage, meta, setCurrentPage]);

  const dataSource: TDataSource[] = urls?.map((contact, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: contact?._id,
    email: contact?.email,
    message: contact?.message,
    phone: contact?.phone,
    replyText: contact?.replyText,
    createdAt: contact?.createdAt,
    replyAt: contact?.replyAt,
  }));

 
  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
     {
      title: "Contact Number",
      dataIndex: "phone",
      key: "phone",
      width: 200,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 250,
      render: (text: string) => (
        <>
          <p className="truncate text-md">{text}</p>
        </>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 130,
      render: (val: string) => {
        const { bg, text, border } = getColorClassForDate(val.split('T')[0]);
        return (
          <button
            className={`text-sm px-2 py-1 rounded ${bg} ${text} ${border} border cursor-default`}
          >
            {val.split('T')[0]}
          </button>
        );
      },
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
          scroll={{ y: "calc(100vh - 324px)" }}
          className="custom-table min-h-[calc(100vh-290px)]"
          loading={loading}
        />
      </div>
      {meta?.total > 0 && (
        <div className="p-8 bg-white border-t shadow-md flex justify-center">
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

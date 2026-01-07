import { Modal } from "antd"
import { useState } from "react"
import { Eye } from "lucide-react"

type TProps = {
  url: string
}

const ViewUrlModal = ({ url }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        disabled={!url}
        className={`p-1 rounded-full cursor-pointer transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700`}
      >
        <Eye size={14} />
      </button>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        maskClosable={false}
        footer={null}
        centered
        width={420}
        styles={{
          content: {
            borderRadius: "12px",
            padding: "32px",
          },
        }}
      >
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Original Url</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2">
               <code className="flex-1 text-sm font-mono text-gray-800 break-all leading-relaxed">
                {url}
              </code>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ViewUrlModal

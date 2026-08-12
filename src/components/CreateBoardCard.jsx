import { Button } from 'antd'

function CreateBoardCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-50 mt-5 cursor-pointer border-dashed border-2 items-center justify-center rounded-lg  border-gray-300 bg-gray-80 p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
    >
      <span className="text-lg font-semibold">
        + Create Board
      </span>
    </button>
  )
}

export default CreateBoardCard
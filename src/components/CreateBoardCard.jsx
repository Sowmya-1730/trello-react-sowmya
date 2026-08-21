import { Button } from 'antd'

function CreateBoardCard({ onClick }) {
  return (
    <Button
      type="default"
      onClick={onClick}
      className="mt-5! h-50! w-full! rounded-lg! border-2! border-dashed! border-gray-300! bg-gray-80! p-4! shadow-md!"
    >
      <span className="text-lg font-semibold">
        Create new board
      </span>
    </Button>
  )
}

export default CreateBoardCard
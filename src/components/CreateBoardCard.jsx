import { Button } from 'antd'

function CreateBoardCard({ onClick }) {
  return (
    <Button
      type="default"
      onClick={onClick}
      className="mt-5 flex h-50 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-80 p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
    >
      <span className="text-lg font-semibold">
        Create new board
      </span>
    </Button>
  )
}

export default CreateBoardCard
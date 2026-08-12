function BoardCard({ board }) {
  return (
    <article className="flex h-50 mt-5 cursor-pointer items-end rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800">
        {board.name}
      </h2>
    </article>
  )
}

export default BoardCard
import { useEffect, useState } from 'react'
import BoardCard from '../components/BoardCard'
import CreateBoardCard from '../components/CreateBoardCard'
import CreateBoardModal from '../components/CreateBoardModal'

import { getBoards } from '../api/trelloApi'
import { createBoard } from '../api/trelloApi'

function BoardsPage() {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)


  useEffect(() => {
      const fetchBoards = async () => {
          try {
              const response = await getBoards()

              setBoards(response.data)
            } catch (error) {
                console.error(error)
                setError('Failed to load boards.')
            } finally {
                setLoading(false)
            }
        }

        fetchBoards()
    }, [])

    const handleCreateBoard = async (name) => {
      try {
          setCreating(true)

          const response = await createBoard(name)
          setBoards((prevBoards) => [...prevBoards, response.data])
          setIsCreateModalOpen(false)
      } catch (error) {
          console.error(error)
      } finally {
          setCreating(false)
      }
  }
    return (
        <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Boards
      </h1>


      {loading && (
        <p className="text-gray-600">
          Loading boards...
        </p>
      )}

      {!loading && error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && boards.length === 0 && (
        <div>
          <p className="text-gray-600">
            No boards found.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {boards.map((board) => (
            <BoardCard
              key={board.id}
              board={board}
            />
          ))}

          <CreateBoardCard
            onClick={() => setIsCreateModalOpen(true)}
          />
        </div>
      )}

    <CreateBoardModal
      open={isCreateModalOpen}
      onCancel={() => setIsCreateModalOpen(false)}
      onCreate={handleCreateBoard}
      loading={creating}
    />
    </main>
  )
}

export default BoardsPage

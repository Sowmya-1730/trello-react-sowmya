import { useEffect, useState } from 'react'
import { message } from 'antd'
import { Helmet } from 'react-helmet-async'

import BoardCard from '../components/BoardCard'
import CreateBoardCard from '../components/CreateBoardCard'
import CreateBoardModal from '../components/CreateBoardModal'

import { deleteBoard, getBoards, createBoard } from '../api/trelloApi'

function BoardsPage() {
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [creatingBoard, setCreatingBoard] = useState(false)

  useEffect(() => {
      const fetchBoards = async () => {
          try {
              const response = await getBoards()

              setBoards(response.data)
            } catch {
                message.error('Failed to load boards.')
                setError('Failed to load boards.')
            } finally {
                setLoading(false)
            }
        }

        fetchBoards()
    }, [])

    const handleCreateBoard = async (name) => {
      try {
          setCreatingBoard(true)

          const response = await createBoard(name)
          setBoards((prevBoards) => [...prevBoards, response.data])
          setIsCreateModalOpen(false)
      } catch {
          message.error('Failed to create board.')
      } finally {
          setCreatingBoard(false)
      }
  }

  const handleDeleteBoard = async (boardId) => {
    try {
      await deleteBoard(boardId)
      const response = await getBoards()
      setBoards(response.data)
    } catch {
      message.error('Failed to delete board.')
    }
  }
    return (
      <>
        <Helmet>
          <title>Boards</title>
        </Helmet>
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
              onDelete={handleDeleteBoard}
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
      loading={creatingBoard}
    />
    </main>
  </>
  )
}

export default BoardsPage

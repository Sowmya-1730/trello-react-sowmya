import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CreateListModal from '../components/CreateListModal'
import ListCard from '../components/ListCard'

import {
  getBoard,
  getBoardLists,
  createList,
  updateBoard,
  updateListClosed,
  updateList,
} from '../api/trelloApi'

function BoardPage() {
  const { board_id } = useParams()

  const [board, setBoard] = useState(null)
  const [lists, setLists] = useState([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState('');

  const fetchBoard = async () => {
    try {
      const response = await getBoard(board_id)
      setBoard(response.data)
      setBoardName(response.data.name)
    } catch (error) {
      console.error('Error fetching board:', error)
    }
  }

  const fetchBoardLists = async () => {
    try {
      const response = await getBoardLists(board_id)
      setLists(response.data)
    } catch (error) {
      console.error('Error fetching board lists:', error)
    }
  }

  useEffect(() => {
    fetchBoard()
    fetchBoardLists()
  }, [board_id])

  const handleCreateList = async (name) => {
    try {
      setCreating(true)

      await createList(name, board_id)

      await fetchBoardLists()

      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error creating list:', error)
    } finally {
      setCreating(false)
    }
  }

  const handleRenameBoard = async (event) => {
    if(event.key !== 'Enter') {
      return
    }

    const newName = boardName.trim();
    if(!newName || newName === board.name) {
      setBoardName(board.name)
      setIsEditingBoardName(false)
      return
    }

    try {
      await updateBoard(board_id, newName)
      setBoard((prevBoard) => ({
        ...prevBoard,
        name: newName
      }))
      setIsEditingBoardName(false)
    } catch(error) {
      console.error('Error renaming board: ',error)
    }

  }


  const handleRenameList = async (listId, name) => {
    try {
      await updateList(listId, name)

      await fetchBoardLists()
    } catch (error) {
      console.error('Error renaming list:', error)
    }
  }

  const handleArchiveList = async (listId) => {
    try {
      await updateListClosed(listId, true)
      await fetchBoardLists()
    } catch(error) {
      console.error('Error archiving list: ',error)
    }
  }

  return (
    <main className="flex h-screen flex-col bg-gray-100">

      {/* Board Header */}
      <header className="shrink-0 px-8 py-5">
        {isEditingBoardName ? (
          <input
            type="text"
            value={boardName}
            onChange={(event) => setBoardName(event.target.value)}
            onKeyDown={handleRenameBoard}
            autoFocus
            className="w-full max-w-xl rounded-md border border-gray-300 bg-white px-2 py-1 text-3xl font-bold outline-none"
          />
        ) : (
          <h1
            onDoubleClick={() => setIsEditingBoardName(true)}
            className="cursor-pointer text-3xl font-bold"
          >
            {board ? board.name : 'Loading...'}
          </h1>
        )}
      </header>

      {/* Lists */}
      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-8 pb-4">
        <div className="flex h-full items-start gap-4">

          {lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onArchive={handleArchiveList}
              onRename={handleRenameList}
            />
          ))}

          {/* Create List Card */}
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-72 shrink-0 rounded-lg bg-white p-4 text-left font-semibold cursor-pointer shadow-md transition hover:bg-gray-50"
          >
            + Add another list
          </button>

        </div>
      </div>

      {/* Create List Modal */}
      <CreateListModal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateList}
        loading={creating}
      />

    </main>
  )
}

export default BoardPage
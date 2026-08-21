import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Button, message } from 'antd'
import { Helmet } from 'react-helmet-async'

import CreateListModal from '../components/CreateListModal'
import ListCard from '../components/ListCard'
import CardModal from '../components/CardModal'

import {
  getBoard,
  getBoardLists,
  createList,
  updateBoard,
  updateListClosed,
  updateList,
  getListCards,
  updateCard,
  updateCardClosed
} from '../api/trelloApi'

function BoardPage() {
  const { boardId } = useParams()

  const [board, setBoard] = useState(null)
  const [lists, setLists] = useState([])
  const [cards, setCards] = useState([])

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [creatingList, setCreatingList] = useState(false)

  const [isEditingBoardName, setIsEditingBoardName] = useState(false)
  const [boardName, setBoardName] = useState('')

  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedList, setSelectedList] = useState(null)


  const fetchBoardLists = useCallback(async () => {
    try {
      const response = await getBoardLists(boardId)
      setLists(response.data)

    const cardResponses = await Promise.all(
      response.data.map((list) => getListCards(list.id))
    )

    const cardsByList = {}

    response.data.forEach((list, index) => {
      cardsByList[list.id] = cardResponses[index].data
    })

    setCards(cardsByList)

      setCards(cardsByList)
    } catch {
      message.error('Failed to load board lists.')
    }
  }, [boardId])

  useEffect(() => {
    let ignore = false

    const fetchBoardData = async () => {
      try {
        const [boardResponse, listsResponse] = await Promise.all([
          getBoard(boardId),
          getBoardLists(boardId),
        ])

        const cardsByList = {}

        for (const list of listsResponse.data) {
          const cardResponse = await getListCards(list.id)
          cardsByList[list.id] = cardResponse.data
        }

        if (ignore) {
          return
        }

        setBoard(boardResponse.data)
        setBoardName(boardResponse.data.name)
        setLists(listsResponse.data)
        setCards(cardsByList)
      } catch {
        if (!ignore) {
          message.error('Failed to load board.')
        }
      }
    }

    fetchBoardData()

    return () => {
      ignore = true
    }
  }, [boardId])

  const handleCreateList = async (name) => {
    try {
      setCreatingList(true)

      await createList(name, boardId)

      await fetchBoardLists()

      setIsCreateModalOpen(false)
    } catch {
      message.error('Failed to create list.')
    } finally {
      setCreatingList(false)
    }
  }

  const handleRenameBoard = async (event) => {
    if (event.key !== 'Enter') {
      return
    }

    const newName = boardName.trim();
    if (!newName || newName === board.name) {
      setBoardName(board.name)
      setIsEditingBoardName(false)
      return
    }

    try {
      await updateBoard(boardId, newName)
      setBoard((prevBoard) => ({
        ...prevBoard,
        name: newName
      }))
      setIsEditingBoardName(false)
    } catch {
      message.error('Failed to rename board.')
    }

  }


  const handleRenameList = async (listId, name) => {
    try {
      await updateList(listId, name)

      await fetchBoardLists()
    } catch  {
      message.error('Failed to rename list.')
    }
  }

  const handleArchiveList = async (listId) => {
    try {
      await updateListClosed(listId, true)
      await fetchBoardLists()
    } catch {
      message.error('Failed to archive list.')
    }
  }

  const fetchCardsForList = async (listId) => {
    try {
      const response = await getListCards(listId)

      setCards((prevCards) => ({
        ...prevCards,
        [listId]: response.data,
      }))
    } catch {
      message.error('Failed to load cards.')
    }
  }

  const handleRenameCard = async (cardId, listId, name) => {
    try {
      await updateCard(cardId, name)
      await fetchCardsForList(listId)
    } catch {
      message.error('Failed to rename card.')
    }
  }

  const handleArchiveCard = async (cardId, listId) => {
    try {
      await updateCardClosed(cardId, true)
      await fetchCardsForList(listId)
    } catch {
      message.error('Failed to archive card.')
    }
  }

  const handleCardClick = (card, list) => {
    setSelectedCard(card)
    setSelectedList(list)
  }


  return (

    <>

    <Helmet>
      <title>
        {selectedCard
          ? selectedCard.name
          : board
            ? board.name
            : 'Trello'}
      </title>
    </Helmet>
    <main className="flex h-screen flex-col bg-gray-100">

      {/* Board Header */}
      <header className="shrink-0 px-8 py-5">
        {isEditingBoardName ? (
          <Input
            value={boardName}
            onChange={(event) => setBoardName(event.target.value)}
            onPressEnter={handleRenameBoard}
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
              cards={cards[list.id] || []}
              onArchive={handleArchiveList}
              onRename={handleRenameList}
              onRefreshCards={fetchCardsForList}
              onRenameCard={handleRenameCard}
              onArchiveCard={handleArchiveCard}
              onCardClick={handleCardClick}
            />
          ))}

          {/* Create List Card */}
          <Button
            type="default"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-72 shrink-0 text-left font-semibold shadow-md transition hover:bg-gray-50"
          >
            + Add another list
          </Button>

        </div>
      </div>

      {/* Create List Modal */}
      <CreateListModal
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateList}
        loading={creatingList}
      />

      <CardModal
        open={selectedCard !== null}
        onCancel={() => {
          setSelectedCard(null)
          setSelectedList(null)
        }}
        card={selectedCard}
        list={selectedList}
      />


    </main>
  </>
  )
}

export default BoardPage
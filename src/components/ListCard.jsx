import { useState } from 'react'
import { Button, Dropdown, Input, message } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

import { createCard } from '../api/trelloApi'


function ListCard({ list, cards, onArchive, onRename, onRefreshCards, onRenameCard, onArchiveCard, onCardClick }) {
  const [isEditing, setIsEditing] = useState(false)
  const [listName, setListName] = useState(list.name)

  const [isAddingCard, setIsAddingCard] = useState(false)
  const [cardName, setCardName] = useState('')
  const [creatingCard, setCreatingCard] = useState(false)

  const [editingCardId, setEditingCardId] = useState(null)
  const [editingCardName, setEditingCardName] = useState('')

  const handleRename = async (event) => {
    if (event.key !== 'Enter') {
      return
    }

    const newName = listName.trim()

    if (!newName || newName === list.name) {
      setListName(list.name)
      setIsEditing(false)
      return
    }

    await onRename(list.id, newName)

    setIsEditing(false)
  }

  const menuItems = [
    {
      key: 'archive',
      label: 'Archive list',
      danger: true,
      onClick: () => onArchive(list.id),
    },
  ]



  const handleCreateCard = async () => {
    const name = cardName.trim()

    if (!name) {
      return
    }

    try {
      setCreatingCard(true)

      await createCard(name, list.id)

      setCardName('')
      setIsAddingCard(false)

      await onRefreshCards(list.id)
    } catch {
      message.error('Failed to create card.')
    } finally {
      setCreatingCard(false)
    }
  }

  const handleCardRename = async (event, card) => {
    if (event.key !== 'Enter') {
      return
    }

    const newName = editingCardName.trim()

    if (!newName || newName === card.name) {
      setEditingCardId(null)
      setEditingCardName('')
      return
    }

    await onRenameCard(card.id, list.id, newName)

    setEditingCardId(null)
    setEditingCardName('')
  }

  const handleStartEditingCard = (card) => {
    setEditingCardId(card.id)
    setEditingCardName(card.name)
  }



  return (
    <article className="relative w-72 shrink-0 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <Input
            value={listName}
            onChange={(event) => setListName(event.target.value)}
            onPressEnter={handleRename}
            autoFocus
            className="w-full rounded-md border border-gray-300 px-2 py-1 font-semibold outline-none"
          />
        ) : (
          <h2
            onDoubleClick={() => setIsEditing(true)}
            className="cursor-pointer font-semibold"
          >
            {list.name}
          </h2>
        )}
        <div
          onClick={(event) => event.stopPropagation()}
        >
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </div>
      </div>



      <div className="mt-4 space-y-2">
        {cards.map((card) => {
          const cardMenuItems = [
            {
              key: 'edit',
              label: 'Edit card',
              onClick: () => handleStartEditingCard(card),
            },
            {
              key: 'archive',
              label: 'Archive card',
              danger: true,
              onClick: () => onArchiveCard(card.id, list.id),
            },
          ]

          return (
            <article
              key={card.id}
              onClick={() => onCardClick(card, list)}
              className="group relative rounded-md bg-gray-200 p-3 shadow-sm "
            >
              {editingCardId === card.id ? (
                <Input
                  value={editingCardName}
                  onChange={(event) => setEditingCardName(event.target.value)}
                  onPressEnter={(event) => handleCardRename(event, card)}
                  autoFocus
                />
              ) : (
                <p className="pr-8 text-sm font-medium text-gray-800">
                  {card.name}
                </p>
              )}

              <div
                className="rounded absolute right-1 top-1 hidden group-hover:block mt-1 bg-gray-400"
                onClick={(event) => event.stopPropagation()}
              >
                <Dropdown
                  menu={{ items: cardMenuItems }}
                  trigger={['click']}
                >
                  <Button
                    type="text"
                    size="small"
                    icon={<MoreOutlined />}
                  />
                </Dropdown>
              </div>
            </article>
          )
        })}
      </div>


        <div className="mt-3">
          {isAddingCard ? (
            <div className="space-y-2">
              <Input
                value={cardName}
                onChange={(event) => setCardName(event.target.value)}
                onPressEnter={handleCreateCard}
                placeholder="Enter card name"
                autoFocus
              />

              <div className="flex gap-2 mt-2">
                <Button
                  type="primary"
                  loading={creatingCard}
                  onClick={handleCreateCard}
                >
                  Add Card
                </Button>

                <Button
                  onClick={() => {
                    setCardName('')
                    setIsAddingCard(false)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="text"
              block
              className="justify-start! text-left!"
              onClick={() => setIsAddingCard(true)}
            >
              + Add a card
            </Button>
          )}
        </div>
    </article>
  )
}

export default ListCard
import { useEffect, useState } from 'react'
import { Modal, Button, Input, Dropdown } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import {
    getCardChecklists,
    createChecklist,
    updateChecklist,
    deleteChecklist,
    getChecklistItems,
    createChecklistItem,
    updateChecklistItemState,
    updateChecklistItem,
    deleteChecklistItem
} from '../api/trelloApi'

function CardModal({ open, onCancel, card, list }) {

    const [checklists, setChecklists] = useState([])

    const [isAddingChecklist, setIsAddingChecklist] = useState(false)
    const [checklistName, setChecklistName] = useState('')
    const [creatingChecklist, setCreatingChecklist] = useState(false)

    const [editingChecklistId, setEditingChecklistId] = useState(null)
    const [editingChecklistName, setEditingChecklistName] = useState('')

    const [checkItems, setCheckItems] = useState({})

    const [addingCheckItemId, setAddingCheckItemId] = useState(null)
    const [checkItemName, setCheckItemName] = useState('')
    const [creatingCheckItem, setCreatingCheckItem] = useState(false)

    const [editingCheckItemId, setEditingCheckItemId] = useState(null)
    const [editingCheckItemName, setEditingCheckItemName] = useState('')

  useEffect(() => {
    if (!open || !card) {
      return
    }

    const fetchChecklists = async () => {
      try {
        const response = await getCardChecklists(card.id)
        setChecklists(response.data)

        const itemsByChecklist = {}
        for(const checklist of response.data) {
            const itemResponse = await getChecklistItems(checklist.id)
            itemsByChecklist[checklist.id] = itemResponse.data
        }
        setCheckItems(itemsByChecklist)
      } catch (error) {
        console.error('Error fetching checklists:', error)
      }
    }

    fetchChecklists()
  }, [open, card])


  const handleCreateChecklist = async () => {
    const name = checklistName.trim()

    if (!name) {
        return
    }

    try {
        setCreatingChecklist(true)

        await createChecklist(card.id, name)

        const response = await getCardChecklists(card.id)
        setChecklists(response.data)

        setChecklistName('')
        setIsAddingChecklist(false)
    } catch (error) {
        console.error('Error creating checklist:', error)
    } finally {
        setCreatingChecklist(false)
    }
  }

  const handleRenameChecklist = async (event, checklist) => {
    if (event.key !== 'Enter') {
        return
    }

    const newName = editingChecklistName.trim()

    if (!newName || newName === checklist.name) {
        setEditingChecklistId(null)
        setEditingChecklistName('')
        return
    }

    try {
        await updateChecklist(checklist.id, newName)

        const response = await getCardChecklists(card.id)
        setChecklists(response.data)

        setEditingChecklistId(null)
        setEditingChecklistName('')
    } catch (error) {
        console.error('Error renaming checklist:', error)
    }
    }

  const handleStartEditingChecklist = (checklist) => {
    setEditingChecklistId(checklist.id)
    setEditingChecklistName(checklist.name)
  }


  const handleDeleteChecklist = async (checklist) => {
    try {
        await deleteChecklist(checklist.id)

        const response = await getCardChecklists(card.id)
        setChecklists(response.data)
    } catch (error) {
        console.error('Error deleting checklist:', error)
    }
    }


    const handleCreateCheckItem = async (checklistId) => {
    const name = checkItemName.trim()

    if (!name) {
        return
    }

    try {
        setCreatingCheckItem(true)

        await createChecklistItem(checklistId, name)

        const response = await getChecklistItems(checklistId)

        setCheckItems((previousItems) => ({
        ...previousItems,
        [checklistId]: response.data
        }))

        setCheckItemName('')
        setAddingCheckItemId(null)
    } catch (error) {
        console.error('Error creating check item:', error)
    } finally {
        setCreatingCheckItem(false)
    }
    }

    const handleToggleCheckItem = async (item) => {
        const newState =
            item.state === 'complete' ? 'incomplete' : 'complete'

        try {
            await updateChecklistItemState(
            card.id,
            item.id,
            newState
            )

            const response = await getChecklistItems(
            item.idChecklist
            )

            setCheckItems((previousItems) => ({
            ...previousItems,
            [item.idChecklist]: response.data
            }))
        } catch (error) {
            console.error('Error updating check item:', error)
        }
        }

    const handleRenameCheckItem = async (event, item) => {
        if (event.key !== 'Enter') {
            return
        }

        const newName = editingCheckItemName.trim()

        if (!newName || newName === item.name) {
            setEditingCheckItemId(null)
            setEditingCheckItemName('')
            return
        }

        try {
            await updateChecklistItem(
            card.id,
            item.id,
            newName
            )

            const response = await getChecklistItems(
            item.idChecklist
            )

            setCheckItems((previousItems) => ({
            ...previousItems,
            [item.idChecklist]: response.data
            }))

            setEditingCheckItemId(null)
            setEditingCheckItemName('')
        } catch (error) {
            console.error('Error renaming check item:', error)
        }
    }

    const handleStartEditingCheckItem = (item) => {
        setEditingCheckItemId(item.id)
        setEditingCheckItemName(item.name)
    }

    const handleDeleteCheckItem = async (item) => {
        try {
            await deleteChecklistItem(card.id, item.id)

            const response = await getChecklistItems(
                item.idChecklist
            )

            setCheckItems((previousItems) => ({
            ...previousItems,
            [item.idChecklist]: response.data
            }))
        } catch (error) {
            console.error('Error deleting check item:', error)
        }
    }

    const getChecklistProgress = (checklistId) => {
    const items = checkItems[checklistId] || []

    const totalItems = items.length

    if (totalItems === 0) {
        return 0
    }

    const completedItems = items.filter(
        (item) => item.state === 'complete'
    ).length

    return Math.round((completedItems / totalItems) * 100)
    }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      title={list?.name}
    >
      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-2xl font-bold">
          {card?.name}
        </h2>


        <div className="mt-4">

          <div className="space-y-4">
            {checklists.map((checklist) => (
            <div
                key={checklist.id}
                className="rounded-md border border-gray-200 p-4"
            >

                {/* Checklist Header */}
                <div className="flex items-center justify-between gap-4">
                {editingChecklistId === checklist.id ? (
                    <Input
                    value={editingChecklistName}
                    onChange={(event) =>
                        setEditingChecklistName(event.target.value)
                    }
                    onPressEnter={(event) =>
                        handleRenameChecklist(event, checklist)
                    }
                    autoFocus
                    />
                ) : (
                    <h4
                    onDoubleClick={() =>
                        handleStartEditingChecklist(checklist)
                    }
                    className="cursor-pointer font-semibold"
                    >
                    {checklist.name}
                    </h4>
                )}

                <Button
                    danger
                    onClick={() => handleDeleteChecklist(checklist)}
                >
                    Delete
                </Button>

                </div>

                <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                        {getChecklistProgress(checklist.id)}%
                    </span>
                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                        <div
                            className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                            style={{
                                width: `${getChecklistProgress(checklist.id)}%`
                            }}
                        />
                    </div>

                </div>

                {/* Check Items */}
                <div className="mt-3 space-y-2">
                {checkItems[checklist.id]?.map((item) => (
                    <div
                    key={item.id}
                    className="flex items-center gap-2"
                    >
                    <input
                        type="checkbox"
                        checked={item.state === 'complete'}
                        onChange={() => handleToggleCheckItem(item)}
                    />

                    <div className="flex-1">
                        {editingCheckItemId === item.id ? (
                        <Input
                            value={editingCheckItemName}
                            onChange={(event) =>
                            setEditingCheckItemName(event.target.value)
                            }
                            onPressEnter={(event) =>
                            handleRenameCheckItem(event, item)
                            }
                            autoFocus
                        />
                        ) : (
                        <span
                            onDoubleClick={() =>
                            handleStartEditingCheckItem(item)
                            }
                            className={`cursor-pointer ${
                            item.state === 'complete'
                                ? 'line-through text-gray-400'
                                : ''
                            }`}
                        >
                            {item.name}
                        </span>
                        )}
                    </div>

                    <Dropdown
                        menu={{
                        items: [
                            {
                            key: 'delete',
                            label: 'Delete Item',
                            onClick: () => handleDeleteCheckItem(item),
                            },
                        ],
                        }}
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button
                        type="text"
                        icon={<MoreOutlined />}
                        />
                    </Dropdown>
                    </div>
                ))}
                </div>

                {/* Create a Check Item */}
                <div className="mt-3">
                    {addingCheckItemId === checklist.id ? (
                        <div className="space-y-2">
                        <Input
                            value={checkItemName}
                            onChange={(event) =>
                            setCheckItemName(event.target.value)
                            }
                            onPressEnter={() =>
                            handleCreateCheckItem(checklist.id)
                            }
                            placeholder="Enter check item"
                            autoFocus
                        />

                        <div className="flex gap-2 mt-2">
                            <Button
                            type="primary"
                            loading={creatingCheckItem}
                            onClick={() =>
                                handleCreateCheckItem(checklist.id)
                            }
                            >
                            Add Item
                            </Button>

                            <Button
                            onClick={() => {
                                setCheckItemName('')
                                setAddingCheckItemId(null)
                            }}
                            >
                            Cancel
                            </Button>
                        </div>
                        </div>
                    ) : (
                        <Button
                        type="text"
                        onClick={() => {
                            setAddingCheckItemId(checklist.id)
                            setCheckItemName('')
                        }}
                        >
                        + Add an item
                        </Button>
                    )}
                    </div>

            </div>
            ))}





          <div className="mb-4">
            {isAddingChecklist ? (
                <div className="space-y-2 mt-2">
                    <Input
                        value={checklistName}
                        onChange={(event) => setChecklistName(event.target.value)}
                        onPressEnter={handleCreateChecklist}
                        placeholder="Enter checklist name"
                        autoFocus
                    />

                    <div className="flex gap-2 mt-2">
                        <Button
                        type="primary"
                        loading={creatingChecklist}
                        onClick={handleCreateChecklist}
                        >
                        Add Checklist
                        </Button>

                        <Button
                        onClick={() => {
                            setChecklistName('')
                            setIsAddingChecklist(false)
                        }}
                        >
                        Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <Button
                type="text"
                onClick={() => setIsAddingChecklist(true)}
                >
                + Add a checklist
                </Button>
            )}
            </div>
          </div>

        </div>
      </div>
    </Modal>
  )
}

export default CardModal
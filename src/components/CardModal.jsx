import { useEffect, useState } from 'react'
import { Modal, Button, Input } from 'antd'
import { getCardChecklists, createChecklist, updateChecklist, deleteChecklist } from '../api/trelloApi'

function CardModal({ open, onCancel, card, list }) {
  const [checklists, setChecklists] = useState([])

  const [isAddingChecklist, setIsAddingChecklist] = useState(false)
  const [checklistName, setChecklistName] = useState('')
  const [creatingChecklist, setCreatingChecklist] = useState(false)

  const [editingChecklistId, setEditingChecklistId] = useState(null)
  const [editingChecklistName, setEditingChecklistName] = useState('')

  useEffect(() => {
    if (!open || !card) {
      return
    }

    const fetchChecklists = async () => {
      try {
        const response = await getCardChecklists(card.id)
        setChecklists(response.data)
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
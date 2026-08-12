import { useState } from 'react'
import { Button, Dropdown } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

function ListCard({ list, onArchive, onRename }) {
  const [isEditing, setIsEditing] = useState(false)
  const [listName, setListName] = useState(list.name)

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

  return (
    <article className="relative w-72 shrink-0 rounded-lg bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            value={listName}
            onChange={(event) => setListName(event.target.value)}
            onKeyDown={handleRename}
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
    </article>
  )
}

export default ListCard
import { useNavigate } from "react-router-dom";
import { Button, Dropdown} from "antd";
import { MoreOutlined } from "@ant-design/icons";

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/boards/${board.id}`);
  };

  const menuItems = [
    {
      key: "delete",
      label: "Delete Board",
      danger: true,
      onClick: () => onDelete(board.id),
    },
  ];

  return (
    <article
      onClick={handleClick}
      className="relative mt-5 flex h-50 cursor-pointer items-end rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        {board.name}
      </h2>

      <div
        className="absolute right-2 top-2"
        onClick={(event) => event.stopPropagation()}
      >
        <Dropdown
          menu={{ items: menuItems }}
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
          />
        </Dropdown>
      </div>
    </article>
  );
}

export default BoardCard;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBoardLists, getBoard } from "../api/trelloApi";

function BoardPage() {

    const { board_id } = useParams();
    const [board, setBoard] = useState(null);
    const [lists, setLists] = useState([]);


    useEffect(() => {
        const fetchBoard = async() => {
            try {
                const response = await getBoard(board_id);
                setBoard(response.data);
            } catch(error) {
                console.error("Error fetching board:", error);
            }
        }

        fetchBoard();
    }, [board_id]);

    useEffect(() => {
        const fetchBoardLists = async() => {
            try {
                const response = await getBoardLists(board_id);
                setLists(response.data);
            } catch(error) {
                console.error("Error fetching board lists:", error);
            }
        }

        fetchBoardLists();
    }, [board_id]);

    return (
    <main className="flex h-screen flex-col bg-gray-100">
      <header className="shrink-0 px-8 py-5">
        <h1 className="text-3xl font-bold">
          {board ? board.name : "Loading..."}
        </h1>
      </header>

      <div className="min-h-0 flex-1 overflow-x-auto overflow-y-hidden px-8 pb-4">
        <div className="flex h-full items-start gap-4">
          {lists.map((list) => (
            <article
              key={list.id}
              className="w-72 shrink-0 rounded-lg bg-white p-4 shadow-md"
            >
              <h2 className="font-semibold">
                {list.name}
              </h2>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}




export default BoardPage;
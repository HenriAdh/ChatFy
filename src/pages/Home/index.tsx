import { useCallback, useEffect, useState } from "react";
import Empty from "./components/Empty";
import Chat from "./components/Chat";
import { IChat } from "../../types/ChatTypes";

export default function Home() {
  const [chats, setChats] = useState<IChat[]>([]);

  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  const listChats = useCallback(async () => {
    setChats([
      { id: 1, name: "teste1" },
      { id: 2, name: "teste2" },
      { id: 3, name: "teste3" },
      { id: 4, name: "teste4" },
    ]);
  }, []);

  useEffect(() => {
    listChats();
  }, [listChats]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setSelectedChat(null);
      }
    });
  }, []);

  return (
    <div className="flex rounded-md outline-1 p-8 xl:w-6xl lg:w-4xl md:w-2xl sm:w-xl space-x-4">
      <div className="flex flex-col flex-3/12">
        {chats.map((chat, key) => (
          <div
            key={key}
            className="rounded-md outline-1 px-4 py-2 hover:bg-indigo-900 hover:cursor-pointer my-0.5"
            onClick={() => setSelectedChat(chat)}
          >
            <span className="text-2xl">{chat.name}</span>
          </div>
        ))}
      </div>

      <div className="w-[1px] bg-gray-100"></div>

      <div className="flex flex-9/12 h-[80dvh]">
        {!selectedChat ? <Empty /> : <Chat data={selectedChat} />}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import Empty from "./components/Empty";
import Chat from "./components/Chat";
import { IChat } from "../../types/ChatTypes";
import api from "../../services/api";

export default function Home() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [createChat, setCreateChat] = useState<string>("");
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

  const newChat = () => {
    api
      .post("/new-chat", { name: createChat.trim() })
      .then(({ data }) => setChats((p) => [...p, data]))
      .catch((err) => console.log(err));
    setCreateChat("");
  };

  const listChats = useCallback(async () => {
    api
      .get("/list-chats")
      .then(({ data }) => setChats(data))
      .catch((err) => console.log("Erro:", err));
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
    <div className="flex rounded-md outline-1 p-8 xl:w-6xl lg:w-4xl md:w-2xl sm:w-xl space-x-8">
      <div className="flex flex-col flex-3/12">
        <div className="grow">
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

        <div className="flex flex-col space-y-2">
          <input
            type="text"
            placeholder="Novo chat..."
            className="text-2xl px-2 outline-1 rounded-md py-1 w-full"
            onChange={(e) => setCreateChat(e.target.value)}
            value={createChat}
          />

          <input
            type="button"
            value="Criar"
            className="outline-1 px-4 py-1 rounded-md hover:bg-indigo-900 hover:cursor-pointer"
            onClick={newChat}
          />
        </div>
      </div>

      <div className="w-[1px] bg-gray-100"></div>

      <div className="flex flex-9/12 h-[80dvh]">
        {!selectedChat ? <Empty /> : <Chat data={selectedChat} />}
      </div>
    </div>
  );
}

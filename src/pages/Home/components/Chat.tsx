// import { useAppContext } from "../../../contexts/AppContext";
import { useEffect, useRef, useState } from "react";
import { IChat } from "../../../types/ChatTypes";
import socket from "../../../services/socket";
import api from "../../../services/api";
import { useAppContext } from "../../../contexts/AppContext";

interface IChatProps {
  data: IChat;
}

interface IMessages {
  text: string;
  userSend: string;
}

export default function Chat({ data }: IChatProps) {
  const { user } = useAppContext();

  const [messages, setMessages] = useState<IMessages[]>([]);
  const [message, setMessage] = useState<string>("");

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const receiveMessageEvent = `receive-message-${data.id}`;
    const receiveMessage = function (message: IMessages) {
      setMessages((p) => [...p, message]);
    };

    socket.on(receiveMessageEvent, receiveMessage);

    return () => {
      socket.removeListener(receiveMessageEvent, receiveMessage);
      setMessages([]);
    };
  }, [data.id]);

  const sendMessage = () => {
    if (!message.length) {
      return alert("Mensagem vazia.");
    }
    api
      .post(`/new-message/${data.id}`, { message, user })
      .then(() => setMessage(""));
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 py-2 rounded-md outline-1">
        <span className="text-2xl font-bold">{data.name}</span>
      </div>

      <div
        className="grow my-2 py-1 space-y-2 overflow-y-auto px-4 flex-col-reverse"
        ref={messageContainerRef}
      >
        {[...messages].map((message, index) => (
          <div
            key={index}
            className={
              "outline-1 w-fit py-1 px-4 rounded-sm " +
              (message.userSend === user
                ? "justify-self-end"
                : "justify-self-start")
            }
          >
            <div>
              <span
                className={
                  message.userSend === user
                    ? "text-indigo-300"
                    : "text-green-300"
                }
              >
                {message.userSend}
              </span>
            </div>
            <div>
              <span className="text-xl">{message.text}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between space-x-4 mt-2">
        <input
          type="text"
          placeholder="Digite..."
          className="text-2xl px-2 outline-1 rounded-md py-1 w-full"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          value={message}
        />

        <input
          type="button"
          value="Enviar"
          className="outline-1 px-4 rounded-md hover:bg-indigo-900 hover:cursor-pointer"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}

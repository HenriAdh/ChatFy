// import { useAppContext } from "../../../contexts/AppContext";
import { IChat } from "../../../types/ChatTypes";

interface IChatProps {
  data: IChat;
}

export default function Chat({ data }: IChatProps) {
  // const { user } = useAppContext();

  return (
    <div className="w-full flex flex-col">
      <div className="px-4 py-2 rounded-md outline-1">
        <span className="text-2xl font-bold">{data.name}</span>
      </div>

      <div className="grow"></div>

      <div className="flex flex-row justify-between space-x-4 mt-2">
        <input
          type="text"
          placeholder="Digite..."
          className="text-2xl px-2 outline-1 rounded-md py-1 w-full"
        />

        <input
          type="button"
          value="Enviar"
          className="outline-1 px-4 rounded-md hover:bg-indigo-900 hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

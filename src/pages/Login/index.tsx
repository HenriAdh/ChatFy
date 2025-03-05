import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { STORAGE_USER } from "../../settings";

export default function Login() {
  const { setUser, user } = useAppContext();
  const navigate = useNavigate();

  const handleClickLogin = () => {
    window.localStorage.setItem(STORAGE_USER, user);

    navigate("home");
  };

  return (
    <div className="flex rounded-md outline-1 xl:w-6xl lg:w-4xl md:w-2xl sm:w-xl p-8">
      <div className="flex-4/12">
        <h1>ChatFy</h1>
      </div>

      <div className="flex-8/12 justify-center flex flex-col space-y-4">
        <label htmlFor="email" className="text-2xl">
          Nome
        </label>

        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          required
          className="block rounded-md px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />

        <input
          type="button"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:cursor-pointer"
          value="Iniciar"
          onClick={handleClickLogin}
        />
      </div>
    </div>
  );
}

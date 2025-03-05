import { createContext, useContext } from "react";

// Definição dos tipos do contexto
interface AppContextType {
  user: string;
  setUser: (user: string) => void;
}

// Criando o contexto com um valor padrão
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Criando um hook para facilitar o uso do contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
}

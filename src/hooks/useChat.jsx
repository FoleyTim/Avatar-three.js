import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [playAudio, setPlayaudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scriptNumber, setScriptNumber] = useState(1);
  const chat = async (message) => {
    console.log(scriptNumber);
    setPlayaudio(true);
  };
  return (
    <ChatContext.Provider
      value={{
        chat,
        playAudio,
        loading,
        setScriptNumber,
        scriptNumber,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

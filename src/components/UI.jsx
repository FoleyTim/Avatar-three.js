import { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";

export const UI = ({ hidden, ...props }) => {
  const { chat, setScriptNumber, scriptNumber } = useChat();

  const [listening, setListening] = useState(false);
  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="text-center items-center self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">Brewella</h1>
          <br />
          <img width="100px" src="/textures/starbucks.png" />
        </div>
        <div className="w-full flex flex-col items-end justify-center gap-4"></div>
        <div className="flex items-center pointer-events-auto  justify-center">
          <button
            className={
              listening
                ? "pointer-events-auto bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full border-white border-2 animate-icon"
                : "pointer-events-auto bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full border-white border-2"
            }
            onClick={() => {
              setListening(true);
              setTimeout(() => {
                setListening(false);

                chat();
              }, "6000");
            }}
          >
            {listening ? (
              <img width="42px" src="/textures/waveform.png" />
            ) : (
              <img width="42px" src="/textures/microphone.png" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

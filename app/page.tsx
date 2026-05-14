"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const scenes = [
  {
    title: "Midnight Alley",
    text: "비가 내리는 새벽 1시. 당신은 낯선 골목 끝 작은 바 앞에 서 있습니다.",
    choices: [
      { text: "바 안으로 들어간다", next: 1 },
      { text: "그냥 지나친다", next: 2 },
    ],
  },
  {
    title: "Blue Exit",
    text: "재즈 음악이 흐르고 있습니다. 바텐더는 당신을 알고 있는 표정입니다.",
    choices: [
      { text: "바텐더에게 말을 건다", next: 3 },
      { text: "조용히 앉는다", next: 4 },
    ],
  },
  {
    title: "Rainy Street",
    text: "비가 더 거세집니다. 누군가 뒤에서 당신 이름을 부릅니다.",
    choices: [
      { text: "뒤돌아본다", next: 3 },
      { text: "도망친다", next: 5 },
    ],
  },
  {
    title: "Old Theater",
    text: "폐극장 안에는 당신만을 위한 영화가 상영되고 있습니다.",
    choices: [
      { text: "스크린 앞으로 걸어간다", next: 6 },
      { text: "극장을 떠난다", next: 5 },
    ],
  },
  {
    title: "Silent Drink",
    text: "당신은 아무 말 없이 술을 마십니다. 시간이 멈춘 듯합니다.",
    choices: [
      { text: "옆 사람을 바라본다", next: 6 },
      { text: "눈을 감는다", next: 5 },
    ],
  },
  {
    title: "Ending",
    text: "당신은 결국 이 도시를 떠났습니다. 하지만 어떤 장면들은 평생 잊히지 않을 것입니다.",
    choices: [],
  },
  {
    title: "Final Scene",
    text: "스크린 속 인물들이 모두 당신을 바라봅니다. 이제 당신이 이 영화의 주인공입니다.",
    choices: [],
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);

  const currentScene = scenes[sceneIndex];

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 overflow-hidden">
      {!started ? (
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-6xl font-black mb-6 tracking-tight">
            POV CINEMA
          </h1>

          <p className="text-zinc-400 text-xl mb-10 leading-relaxed">
            영화를 보는 것이 아니라,
            <br />
            영화 속을 살아가는 인터랙티브 POV 경험.
          </p>

          <button
            onClick={() => setStarted(true)}
            className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition"
          >
            영화 속으로 입장하기
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={sceneIndex}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl w-full"
          >
            <div className="rounded-[2rem] border border-white/10 bg-zinc-900 p-8 md:p-12 shadow-2xl">
              <div className="text-sm text-zinc-500 mb-3">
                Scene {sceneIndex + 1}
              </div>

              <h2 className="text-4xl font-black mb-6">
                {currentScene.title}
              </h2>

              <p className="text-zinc-300 text-xl leading-relaxed mb-10">
                {currentScene.text}
              </p>

              <div className="grid gap-4">
                {currentScene.choices.length > 0 ? (
                  currentScene.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSceneIndex(choice.next)}
                      className="w-full text-left rounded-2xl border border-white/10 bg-black hover:bg-white hover:text-black transition p-5 text-lg"
                    >
                      {choice.text}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => {
                      setStarted(false);
                      setSceneIndex(0);
                    }}
                    className="bg-white text-black px-6 py-4 rounded-2xl font-bold hover:scale-105 transition"
                  >
                    다시 시작하기
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </main>
  );
}

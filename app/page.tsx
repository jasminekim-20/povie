"use client";

import React, { useMemo, useState } from "react";

type StatKey = "product" | "growth" | "trust" | "equity" | "reputation" | "legal";

type Stats = Record<StatKey, number>;

type Choice = {
  text: string;
  line: string;
  next: number;
  effects: Partial<Stats>;
};

type Scene = {
  id: number;
  chapter: string;
  location: string;
  time: string;
  objective: string;
  pov: string;
  narration: string;
  visual: string;
  choices: Choice[];
};

const initialStats: Stats = {
  product: 35,
  growth: 20,
  trust: 45,
  equity: 60,
  reputation: 30,
  legal: 10,
};

const scenes: Scene[] = [
  {
    id: 0,
    chapter: "CHAPTER 1",
    location: "Ivy League Dorm Room",
    time: "02:13 AM",
    objective: "Build the first version before sunrise.",
    pov: "You sit in front of three monitors. Empty cans, hoodie sleeves, keyboard glow. Outside, the campus is asleep.",
    narration:
      "A message thread is open. Someone dismissed your idea. The cursor blinks like it is daring you to respond with code instead of words.",
    visual: "from-slate-950 via-blue-950 to-black",
    choices: [
      {
        text: "밤새 프로토타입을 만든다",
        line: "Words are slow. Shipping is faster.",
        next: 1,
        effects: { product: 25, growth: 5, trust: -5 },
      },
      {
        text: "친구에게 서버 비용을 부탁한다",
        line: "I need scale before I need permission.",
        next: 2,
        effects: { product: 10, trust: 15, equity: -8 },
      },
      {
        text: "비슷한 아이디어를 들은 선배들의 메일을 무시한다",
        line: "Ideas are cheap. Execution is the receipt.",
        next: 3,
        effects: { growth: 15, legal: 25, reputation: -5 },
      },
    ],
  },
  {
    id: 1,
    chapter: "CHAPTER 2",
    location: "Campus Network Dashboard",
    time: "04:47 AM",
    objective: "Handle unexpected traffic.",
    pov: "Your screen floods with requests. The fan screams. The campus directory keeps refreshing. You can feel the product becoming real.",
    narration:
      "Traffic is climbing too fast. This could become the thing everyone talks about by breakfast, or the thing that gets you dragged into an office by noon.",
    visual: "from-black via-zinc-950 to-emerald-950",
    choices: [
      {
        text: "서버를 더 공격적으로 열어둔다",
        line: "If it breaks, at least it broke loudly.",
        next: 4,
        effects: { growth: 30, product: -5, legal: 15 },
      },
      {
        text: "접근을 제한하고 안정성을 챙긴다",
        line: "A product that survives the night can own the morning.",
        next: 4,
        effects: { product: 20, growth: -5, reputation: 5 },
      },
      {
        text: "익명으로 퍼뜨린다",
        line: "No founder. No fingerprints. Just velocity.",
        next: 5,
        effects: { growth: 25, legal: 20, trust: -10 },
      },
    ],
  },
  {
    id: 2,
    chapter: "CHAPTER 2",
    location: "Dining Hall Table",
    time: "08:20 AM",
    objective: "Convince your closest friend this is bigger than a prank.",
    pov: "Across the table, your friend watches you explain the product through half-finished sentences and impossible numbers.",
    narration:
      "He believes in you, but he wants clarity. You want speed. The company is not born yet, but the first crack in the friendship is already possible.",
    visual: "from-stone-950 via-slate-900 to-amber-950",
    choices: [
      {
        text: "공동창업자 지위를 확실히 약속한다",
        line: "You are in. Not helping. In.",
        next: 4,
        effects: { trust: 30, equity: -18, reputation: 5 },
      },
      {
        text: "돈만 받고 역할은 모호하게 둔다",
        line: "Let’s not slow this down with titles.",
        next: 5,
        effects: { product: 15, equity: 8, trust: -25, legal: 10 },
      },
      {
        text: "문서로 정리하자고 한다",
        line: "If this matters, we write it down.",
        next: 4,
        effects: { trust: 10, legal: -8, product: -5 },
      },
    ],
  },
  {
    id: 3,
    chapter: "CHAPTER 2",
    location: "Old Campus Hallway",
    time: "11:03 AM",
    objective: "Respond to the people claiming you owe them something.",
    pov: "Three students wait outside a lecture hall. They smile like partners. They speak like future plaintiffs.",
    narration:
      "They say you understood the idea from them. You say you understood the weakness in their execution. Both statements can be true. Only one will sound good later.",
    visual: "from-neutral-950 via-red-950 to-black",
    choices: [
      {
        text: "협업하는 척 시간을 번다",
        line: "Sure. Send me more details.",
        next: 5,
        effects: { growth: 15, legal: 20, reputation: -10 },
      },
      {
        text: "명확히 거절한다",
        line: "I’m building something different.",
        next: 4,
        effects: { legal: -5, trust: 5, growth: -5 },
      },
      {
        text: "아이디어는 누구나 낼 수 있다고 말한다",
        line: "You had a concept. I have a product.",
        next: 5,
        effects: { reputation: 10, legal: 18, trust: -5 },
      },
    ],
  },
  {
    id: 4,
    chapter: "CHAPTER 3",
    location: "First Investor Meeting",
    time: "09:30 PM",
    objective: "Turn campus chaos into a company.",
    pov: "A sleek office. Glass walls. Someone in a black shirt asks how big this can get. For the first time, the answer feels obvious: everyone.",
    narration:
      "The investor does not care about your dorm-room drama. He cares about speed, ownership, and whether you are ruthless enough to win.",
    visual: "from-zinc-950 via-indigo-950 to-black",
    choices: [
      {
        text: "성장 수치를 과감하게 부풀려 말한다",
        line: "By next semester, every campus will know us.",
        next: 6,
        effects: { reputation: 25, growth: 20, legal: 8 },
      },
      {
        text: "친구의 기여를 공개적으로 인정한다",
        line: "I didn’t get here alone.",
        next: 6,
        effects: { trust: 25, reputation: 5, equity: -5 },
      },
      {
        text: "지분 방어를 최우선으로 한다",
        line: "Control is not a detail. It is the company.",
        next: 7,
        effects: { equity: 25, trust: -15, reputation: 10 },
      },
    ],
  },
  {
    id: 5,
    chapter: "CHAPTER 3",
    location: "Campus Newspaper Office",
    time: "01:15 PM",
    objective: "Control the story before it controls you.",
    pov: "A recorder is placed in front of you. The journalist asks one clean question. The truth would take too long.",
    narration:
      "This is no longer just a product. It is a narrative. Whoever defines the origin story may end up owning the company’s soul.",
    visual: "from-black via-purple-950 to-slate-950",
    choices: [
      {
        text: "천재 창업자 이미지를 밀어붙인다",
        line: "I saw the future and built it in a night.",
        next: 7,
        effects: { reputation: 30, trust: -20, legal: 10 },
      },
      {
        text: "팀 프로젝트였다고 말한다",
        line: "The product moved because people believed in it.",
        next: 6,
        effects: { trust: 20, reputation: 5, equity: -8 },
      },
      {
        text: "인터뷰를 중단한다",
        line: "Print whatever gets clicks.",
        next: 7,
        effects: { reputation: -10, legal: -5, product: 10 },
      },
    ],
  },
  {
    id: 6,
    chapter: "CHAPTER 4",
    location: "New Office, New Coast",
    time: "03:40 AM",
    objective: "Decide what kind of founder you are becoming.",
    pov: "Whiteboards. Pizza boxes. New engineers. Your old friend calls again. You watch the phone vibrate until it stops.",
    narration:
      "The company is finally moving at the speed you wanted. The problem is that people are not built to be version-controlled.",
    visual: "from-slate-950 via-cyan-950 to-black",
    choices: [
      {
        text: "친구에게 다시 전화한다",
        line: "We need to talk before this gets bigger than us.",
        next: 8,
        effects: { trust: 25, legal: -10, growth: -5 },
      },
      {
        text: "성장만 보고 달린다",
        line: "Feelings do not scale. Networks do.",
        next: 8,
        effects: { growth: 30, product: 15, trust: -25 },
      },
      {
        text: "새로운 조언자의 말을 따른다",
        line: "Move faster. Clean up later.",
        next: 8,
        effects: { growth: 20, reputation: 15, legal: 20, equity: 10 },
      },
    ],
  },
  {
    id: 7,
    chapter: "CHAPTER 4",
    location: "Legal Deposition Room",
    time: "10:00 AM",
    objective: "Survive the story you created.",
    pov: "A glass of water. A long table. Lawyers on both sides. Every sentence you ever said is now evidence.",
    narration:
      "They ask if you betrayed anyone. You want to answer with metrics. The room wants a confession.",
    visual: "from-neutral-950 via-zinc-900 to-red-950",
    choices: [
      {
        text: "모든 선택은 회사 생존을 위한 것이었다고 말한다",
        line: "I made decisions the product required.",
        next: 8,
        effects: { reputation: 10, legal: 15, trust: -10 },
      },
      {
        text: "일부 잘못을 인정한다",
        line: "I was right about the product. Not always about people.",
        next: 8,
        effects: { trust: 20, legal: -15, reputation: 5 },
      },
      {
        text: "감정적 질문에 침묵한다",
        line: "...",
        next: 8,
        effects: { legal: -5, reputation: -10, equity: 5 },
      },
    ],
  },
  {
    id: 8,
    chapter: "FINAL",
    location: "Empty Office",
    time: "02:28 AM",
    objective: "Face what you built.",
    pov: "The office is quiet. The product is alive everywhere else. On your screen, one pending friend request waits like a verdict.",
    narration:
      "You wanted to connect everyone. The question is whether you disconnected yourself to do it.",
    visual: "from-black via-slate-950 to-blue-950",
    choices: [],
  },
];

function clamp(value: number) {
  return Math.max(0, Math.min(100, value));
}

function applyEffects(stats: Stats, effects: Partial<Stats>): Stats {
  return {
    product: clamp(stats.product + (effects.product ?? 0)),
    growth: clamp(stats.growth + (effects.growth ?? 0)),
    trust: clamp(stats.trust + (effects.trust ?? 0)),
    equity: clamp(stats.equity + (effects.equity ?? 0)),
    reputation: clamp(stats.reputation + (effects.reputation ?? 0)),
    legal: clamp(stats.legal + (effects.legal ?? 0)),
  };
}

function getEnding(stats: Stats) {
  if (stats.legal >= 70) {
    return {
      title: "The Lawsuit Founder",
      subtitle: "당신은 회사를 키웠지만, 모든 선택이 증거가 되었습니다.",
    };
  }
  if (stats.growth >= 75 && stats.trust <= 30) {
    return {
      title: "The Empire Builder",
      subtitle: "당신은 네트워크를 얻었지만, 가장 가까운 사람들을 잃었습니다.",
    };
  }
  if (stats.trust >= 65 && stats.product >= 65) {
    return {
      title: "The Reluctant Leader",
      subtitle: "당신은 느렸지만 무너지지 않는 회사를 만들었습니다.",
    };
  }
  if (stats.equity >= 75) {
    return {
      title: "The Control Architect",
      subtitle: "당신은 끝까지 통제권을 지켰습니다. 대신 모두가 당신을 경계합니다.",
    };
  }
  return {
    title: "The Ambiguous Genius",
    subtitle: "당신은 옳았고, 틀렸고, 결국 기억될 사람이 되었습니다.",
  };
}

const statLabels: Record<StatKey, string> = {
  product: "Product",
  growth: "Growth",
  trust: "Trust",
  equity: "Equity",
  reputation: "Reputation",
  legal: "Legal Risk",
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [log, setLog] = useState<string[]>([]);
  const [lastLine, setLastLine] = useState("Tonight, you are not watching the founder. You are the founder.");

  const scene = scenes[sceneIndex];
  const ending = useMemo(() => getEnding(stats), [stats]);
  const isFinal = scene.choices.length === 0;

  function choose(choice: Choice) {
    setStats((prev) => applyEffects(prev, choice.effects));
    setLastLine(choice.line);
    setLog((prev) => [`${scene.location}: ${choice.text}`, ...prev].slice(0, 5));
    setSceneIndex(choice.next);
  }

  function reset() {
    setStarted(false);
    setSceneIndex(0);
    setStats(initialStats);
    setLog([]);
    setLastLine("Tonight, you are not watching the founder. You are the founder.");
  }

  return (
    <main className={`min-h-screen bg-gradient-to-br ${scene.visual} text-white overflow-hidden`}>
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_22%),radial-gradient(circle_at_80%_70%,rgba(80,120,255,0.28),transparent_25%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-6">
        <header className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.35em] text-white/50">POV FOUNDER SIMULATOR</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight md:text-4xl">Inside The Network</h1>
          </div>
          <button onClick={reset} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur hover:bg-white/20">
            Reset
          </button>
        </header>

        {!started ? (
          <div className="grid flex-1 place-items-center">
            <div className="max-w-3xl text-center">
              <div className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/70 backdrop-blur">
                1인칭 창업자 POV · 선택형 시뮬레이션 · 영화적 의사결정 게임
              </div>
              <h2 className="text-5xl font-black leading-tight md:text-7xl">Build the platform. Lose the room.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                명문대 기숙사에서 시작된 작은 서비스가 거대한 네트워크가 됩니다. 당신의 말과 행동은 제품, 성장, 우정, 지분, 평판, 법적 위험을 바꿉니다.
              </p>
              <button onClick={() => setStarted(true)} className="mt-9 rounded-2xl bg-white px-8 py-4 text-lg font-black text-black transition hover:scale-105">
                Start POV
              </button>
            </div>
          </div>
        ) : (
          <div className="grid flex-1 gap-5 lg:grid-cols-[1fr_380px]">
            <div className="relative min-h-[620px] overflow-hidden rounded-[2rem] border border-white/10 bg-black/35 shadow-2xl backdrop-blur">
              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 blur-sm" />
                <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-black via-black/70 to-transparent" />
                <div className="absolute left-8 top-8 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur">
                  <p className="text-xs text-white/45">{scene.chapter}</p>
                  <p className="font-bold">{scene.time}</p>
                </div>
                <div className="absolute right-8 top-8 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-right backdrop-blur">
                  <p className="text-xs text-white/45">LOCATION</p>
                  <p className="font-bold">{scene.location}</p>
                </div>
              </div>

              <div className="relative flex h-full min-h-[620px] flex-col justify-between p-6 md:p-9">
                <div className="mx-auto mt-20 max-w-3xl text-center">
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200/70">Current Objective</p>
                  <h2 className="text-3xl font-black leading-tight md:text-5xl">{scene.objective}</h2>
                  <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{scene.pov}</p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
                  <p className="mb-4 text-lg leading-relaxed text-white/80">{scene.narration}</p>
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-100/50">Inner Voice</span>
                    <p className="mt-1 font-semibold">“{lastLine}”</p>
                  </div>

                  {isFinal ? (
                    <div className="mt-5 rounded-2xl bg-white p-5 text-black">
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/45">Ending</p>
                      <h3 className="mt-2 text-3xl font-black">{ending.title}</h3>
                      <p className="mt-2 text-black/70">{ending.subtitle}</p>
                    </div>
                  ) : (
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                      {scene.choices.map((choice, index) => (
                        <button
                          key={index}
                          onClick={() => choose(choice)}
                          className="rounded-2xl border border-white/10 bg-white/10 p-4 text-left font-bold transition hover:scale-[1.02] hover:bg-white hover:text-black"
                        >
                          {choice.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <aside className="grid gap-5 content-start">
              <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur">
                <h3 className="mb-4 text-xl font-black">Founder HUD</h3>
                <div className="grid gap-4">
                  {(Object.keys(stats) as StatKey[]).map((key) => (
                    <div key={key}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-white/65">{statLabels[key]}</span>
                        <span className="font-bold">{stats[key]}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-white" style={{ width: `${stats[key]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-2xl backdrop-blur">
                <h3 className="mb-4 text-xl font-black">Recent Choices</h3>
                {log.length === 0 ? (
                  <p className="text-sm text-white/45">아직 선택 기록이 없습니다.</p>
                ) : (
                  <div className="grid gap-3">
                    {log.map((item, index) => (
                      <div key={index} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-sm text-white/75">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 text-sm leading-relaxed text-white/60 backdrop-blur">
                실제 영화명, 실존 인물명, 원작 대사·장면을 그대로 쓰지 않고, “명문대 창업자 네트워크 드라마”로 추상화한 MVP입니다. 나중에 라이선스를 확보하면 특정 영화 모드로 확장할 수 있습니다.
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./connections.module.css";
import {
  categoryColors,
  placeholderPuzzle,
  type ConnectionsCategory,
  type ConnectionsPuzzle,
} from "./puzzle";

const MAX_MISTAKES = 4;

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function wordToCategory(
  word: string,
  categories: ConnectionsCategory[]
): ConnectionsCategory {
  const found = categories.find((c) => c.words.includes(word));
  if (!found) throw new Error(`Word "${word}" not found in any category`);
  return found;
}

type Status = "playing" | "won" | "lost";

export default function ConnectionsGame({
  puzzle = placeholderPuzzle,
}: {
  puzzle?: ConnectionsPuzzle;
}) {
  const allWords = useMemo(
    () => puzzle.categories.flatMap((c) => c.words),
    [puzzle]
  );

  // Size every tile off the single longest word in the puzzle (plus a little
  // horizontal padding) so all tiles share one uniform width with no overflow.
  // Measured from real rendered DOM nodes (below) rather than estimated with
  // `ch` units, since `ch` is unreliable to reproduce identically across
  // separate elements once font-weight/letter-spacing are involved. If the
  // ideal width doesn't fit the current viewport (narrow phones), both the
  // tile width and font size are scaled down together so the whole board
  // always fits on screen instead of overflowing.
  const measureRef = useRef<HTMLDivElement>(null);
  const [tileWidthPx, setTileWidthPx] = useState(140);
  const [tileFontPx, setTileFontPx] = useState(16);
  useEffect(() => {
    function measure() {
      const container = measureRef.current;
      if (!container) return;

      const viewportWidth = window.innerWidth;
      const baseFontPx = viewportWidth >= 640 ? 16 : 14;
      container.style.fontSize = `${baseFontPx}px`;

      let max = 0;
      container.querySelectorAll("span").forEach((el) => {
        max = Math.max(max, el.getBoundingClientRect().width);
      });
      if (max <= 0) return;

      const idealTileWidth = Math.ceil(max) + 32;
      const pagePadding = 32; // px-4 on each side of the page container
      const gapTotal = 24; // 3 gaps of 8px between 4 tiles
      const maxTileWidth = Math.floor(
        (viewportWidth - pagePadding - gapTotal) / 4
      );

      const scale = Math.min(1, maxTileWidth / idealTileWidth);
      setTileWidthPx(Math.floor(idealTileWidth * scale));
      setTileFontPx(Math.floor(baseFontPx * scale));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [allWords]);
  const tileWidth = `${tileWidthPx}px`;
  // 4 tiles plus the 3 gaps (gap-2 = 0.5rem = 8px) between them.
  const boardWidthPx = tileWidthPx * 4 + 3 * 8;
  const boardWidth = `${boardWidthPx}px`;
  // The whole page is sized to exactly fit the board (plus its own side
  // padding) so there's never leftover space for the grid (CSS Grid,
  // centers via justify-content) and the solved bars (Flexbox, centers via
  // margin:auto) to handle differently — they only disagree when there's
  // slack to distribute.
  const pagePaddingPx = 32; // px-4 on each side
  const pageMaxWidthPx = Math.max(boardWidthPx + pagePaddingPx, 320);

  // Start in a deterministic (unshuffled) order so server and client render
  // the same markup, then shuffle client-side after mount to avoid a
  // hydration mismatch from Math.random() running during SSR.
  const [order, setOrder] = useState<string[]>(allWords);
  useEffect(() => {
    setOrder(shuffle(allWords));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [solved, setSolved] = useState<ConnectionsCategory[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [shakingWords, setShakingWords] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("playing");
  const [wrongGuessKeys, setWrongGuessKeys] = useState<Set<string>>(
    new Set()
  );

  function keyFor(words: string[]) {
    return [...words].sort().join("|");
  }

  const solvedKeys = new Set(solved.map((c) => c.key));
  const remainingWords = order.filter((w) => {
    const cat = wordToCategory(w, puzzle.categories);
    return !solvedKeys.has(cat.key);
  });

  function toggleSelect(word: string) {
    if (status !== "playing") return;
    setMessage(null);
    setSelected((prev) => {
      if (prev.includes(word)) return prev.filter((w) => w !== word);
      if (prev.length >= 4) return prev;
      return [...prev, word];
    });
  }

  function deselectAll() {
    setSelected([]);
    setMessage(null);
  }

  function shuffleRemaining() {
    setOrder((prev) => {
      const remaining = prev.filter((w) => {
        const cat = wordToCategory(w, puzzle.categories);
        return !solvedKeys.has(cat.key);
      });
      const solvedWords = prev.filter((w) => {
        const cat = wordToCategory(w, puzzle.categories);
        return solvedKeys.has(cat.key);
      });
      return [...solvedWords, ...shuffle(remaining)];
    });
  }

  function endGameAsLost() {
    const remainingCategories = puzzle.categories.filter(
      (c) => !solvedKeys.has(c.key)
    );
    setSolved((prev) => [...prev, ...remainingCategories]);
    setStatus("lost");
    setSelected([]);
  }

  function submit() {
    if (selected.length !== 4 || status !== "playing") return;
    if (wrongGuessKeys.has(keyFor(selected))) return;

    const firstCategory = wordToCategory(selected[0], puzzle.categories);
    const correctCount = selected.filter(
      (w) => wordToCategory(w, puzzle.categories).key === firstCategory.key
    ).length;

    if (correctCount === 4) {
      const newSolved = [...solved, firstCategory];
      setSolved(newSolved);
      setSelected([]);
      setMessage(null);
      if (newSolved.length === puzzle.categories.length) {
        setStatus("won");
      }
      return;
    }

    const newMistakes = mistakes + 1;
    setMistakes(newMistakes);
    setWrongGuessKeys((prev) => new Set(prev).add(keyFor(selected)));
    setShakingWords(selected);
    setTimeout(() => setShakingWords([]), 400);
    if (correctCount === 3) {
      setMessage("One away...");
      setTimeout(() => setMessage(null), 1200);
    } else {
      setMessage(null);
    }

    if (newMistakes >= MAX_MISTAKES) {
      // slight delay so the shake can play before the board resolves
      setTimeout(endGameAsLost, 350);
    }
  }

  function playAgain() {
    setOrder(shuffle(allWords));
    setSolved([]);
    setSelected([]);
    setMistakes(0);
    setMessage(null);
    setStatus("playing");
    setWrongGuessKeys(new Set());
  }

  const mistakesLeft = MAX_MISTAKES - mistakes;

  return (
    <div
      className="w-full mx-auto px-4 py-6 flex flex-col items-center gap-4 select-none"
      style={{ maxWidth: `${pageMaxWidthPx}px` }}
    >
      <div className="text-center mt-3">
        <h1 className="text-4xl font-black tracking-wide text-black">
          Connectegories
        </h1>
        <p className="text-base text-black mt-1">
          Create four groups of four!
        </p>
      </div>

      <div className="flex items-center gap-2 text-base font-bold text-black">
        <span>Mistakes remaining:</span>
        <div className="flex gap-1.5">
          {Array.from({ length: MAX_MISTAKES }).map((_, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full border border-black transition-opacity duration-500 ease-out"
              style={{
                backgroundColor: "#000000",
                opacity: i < mistakesLeft ? 1 : 0,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-2">
        <div
          ref={measureRef}
          aria-hidden="true"
          className="absolute flex gap-0 pointer-events-none"
          style={{ top: -9999, left: -9999, visibility: "hidden" }}
        >
          {allWords.map((w) => (
            <span key={w} className="font-black tracking-wide whitespace-nowrap">
              {w}
            </span>
          ))}
        </div>

        {solved.map((cat) => {
          const colors = categoryColors[cat.key];
          return (
            <div
              key={cat.key}
              className={`${styles.pop} mx-auto rounded-xl flex flex-col items-center justify-center gap-1 py-4 px-3 text-center`}
              style={{
                backgroundColor: colors.bg,
                color: colors.text,
                width: boardWidth,
                fontSize: tileFontPx,
              }}
            >
              <span className="font-black tracking-wide">{cat.title}</span>
              <span className="font-normal tracking-normal">
                {cat.words.join(", ")}
              </span>
            </div>
          );
        })}

        {remainingWords.length > 0 && (
          <div
            className="grid gap-2 justify-center font-black tracking-wide"
            style={{
              gridTemplateColumns: `repeat(4, ${tileWidth})`,
              fontSize: tileFontPx,
            }}
          >
            {remainingWords.map((word) => {
              const isSelected = selected.includes(word);
              return (
                <button
                  key={word}
                  onClick={() => toggleSelect(word)}
                  className={`${
                    shakingWords.includes(word) ? styles.shake : ""
                  } aspect-[4/3] rounded-xl flex items-center justify-center text-center font-black tracking-wide leading-tight whitespace-nowrap transition-colors cursor-pointer border`}
                  style={{
                    backgroundColor: isSelected ? "#000000" : "#fdfafa",
                    color: isSelected ? "#fdfafa" : "#000000",
                    borderColor: "#000000",
                  }}
                >
                  {word}
                </button>
              );
            })}
          </div>
        )}

        {message && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div
              key={message}
              className={`${styles.toast} px-5 py-3 rounded-xl font-bold text-base whitespace-nowrap`}
              style={{
                backgroundColor: "#000000",
                color: "#fdfafa",
              }}
            >
              {message}
            </div>
          </div>
        )}
      </div>

      {status === "playing" && (
        <div className="flex items-center gap-3">
          <button
            onClick={shuffleRemaining}
            className="px-4 py-2 rounded-full border border-black font-semibold text-sm bg-[#fdfafa] text-black cursor-pointer"
          >
            Shuffle
          </button>
          <button
            onClick={deselectAll}
            disabled={selected.length === 0}
            className="px-4 py-2 rounded-full border border-black font-semibold text-sm bg-[#fdfafa] text-black cursor-pointer disabled:opacity-40 disabled:cursor-default"
          >
            Deselect
          </button>
          <button
            onClick={submit}
            disabled={
              selected.length !== 4 || wrongGuessKeys.has(keyFor(selected))
            }
            className="px-4 py-2 rounded-full font-semibold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-default"
            style={{ backgroundColor: "#000000", color: "#fdfafa" }}
          >
            Submit
          </button>
        </div>
      )}

      {status !== "playing" && (
        <div className="w-full flex flex-col items-center gap-3 text-center mt-2">
          <p className="text-base font-bold text-black">
            {status === "won" ? "You solved it!" : "Nice try!"}
          </p>
          {status === "won" && (
            <p className="text-base text-black">
              {`Solved with ${mistakes} mistake${mistakes === 1 ? "" : "s"}.`}
            </p>
          )}
          <button
            onClick={playAgain}
            className="px-6 py-3 rounded-full font-bold text-base cursor-pointer"
            style={{ backgroundColor: "#000000", color: "#fdfafa" }}
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}

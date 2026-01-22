"use client";

import { useEffect, useState, useCallback } from "react";

interface SnakeGameProps {
  onExit: (score: number) => void;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 1;
const INITIAL_SPEED = 150;

export default function SnakeGame({ onExit }: SnakeGameProps) {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 10 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y,
      )
    );
    return newFood;
  }, [snake]);

  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 10 });
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) {
        if (e.key === "r" || e.key === "R") {
          resetGame();
        } else if (e.key === "q" || e.key === "Q" || e.key === "Escape") {
          onExit(score);
        }
        return;
      }

      if (e.key === "p" || e.key === "P") {
        setIsPaused((prev) => !prev);
        return;
      }

      if (e.key === "q" || e.key === "Q" || e.key === "Escape") {
        onExit(score);
        return;
      }

      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowLeft: "LEFT",
        ArrowRight: "RIGHT",
        w: "UP",
        s: "DOWN",
        a: "LEFT",
        d: "RIGHT",
        W: "UP",
        S: "DOWN",
        A: "LEFT",
        D: "RIGHT",
      };

      const newDirection = keyMap[e.key];
      if (newDirection) {
        e.preventDefault();
        const opposites: Record<Direction, Direction> = {
          UP: "DOWN",
          DOWN: "UP",
          LEFT: "RIGHT",
          RIGHT: "LEFT",
        };
        if (opposites[newDirection] !== direction) {
          setDirection(newDirection);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameOver, score, onExit, resetGame]);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case "UP":
            head.y -= CELL_SIZE;
            break;
          case "DOWN":
            head.y += CELL_SIZE;
            break;
          case "LEFT":
            head.x -= CELL_SIZE;
            break;
          case "RIGHT":
            head.x += CELL_SIZE;
            break;
        }

        // Check wall collision
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (
          prevSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y,
          )
        ) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(
      moveSnake,
      INITIAL_SPEED - Math.min(score, 100),
    );
    return () => clearInterval(interval);
  }, [direction, food, gameOver, isPaused, score, generateFood]);

  // Render game board as ASCII
  const renderBoard = () => {
    const board: string[][] = [];

    // Initialize empty board
    for (let y = 0; y < GRID_SIZE; y++) {
      board[y] = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        board[y][x] = "·";
      }
    }

    // Place food
    board[food.y][food.x] = "◉";

    // Place snake
    snake.forEach((segment, index) => {
      if (
        segment.y >= 0 &&
        segment.y < GRID_SIZE &&
        segment.x >= 0 &&
        segment.x < GRID_SIZE
      ) {
        board[segment.y][segment.x] = index === 0 ? "▓" : "█";
      }
    });

    return board;
  };

  const board = renderBoard();

  return (
    <div className="font-mono text-green-500">
      <div className="mb-2 text-white">
        ╔══════════════════════════════════════════╗
      </div>
      <div className="text-white">
        ║ SNAKE GAME Score: {score.toString().padStart(4, "0")} ║
      </div>
      <div className="mb-2 text-white">
        ╚══════════════════════════════════════════╝
      </div>

      <div className="border border-gray-600 inline-block p-1 bg-black">
        {board.map((row, y) => (
          <div key={y} className="leading-none">
            {row.map((cell, x) => (
              <span
                key={`${x}-${y}`}
                className={
                  cell === "◉"
                    ? "text-red-500"
                    : cell === "▓"
                      ? "text-green-400"
                      : cell === "█"
                        ? "text-green-600"
                        : "text-gray-800"
                }
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 text-gray-400 text-sm">
        {gameOver ? (
          <div>
            <div className="text-red-500 font-bold mb-1">GAME OVER!</div>
            <div>Press R to restart • Q to quit</div>
          </div>
        ) : isPaused ? (
          <div className="text-yellow-500">PAUSED - Press P to resume</div>
        ) : (
          <div>
            <div>Arrow keys or WASD to move</div>
            <div>P to pause • Q to quit</div>
          </div>
        )}
      </div>
    </div>
  );
}

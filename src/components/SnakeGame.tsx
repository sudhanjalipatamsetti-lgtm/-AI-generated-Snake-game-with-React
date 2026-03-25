import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const SPEED = 150;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!gameOver && !isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, gameOver, isPaused]);

  return (
    <div className="flex flex-col items-center gap-6 p-8 neon-border bg-black relative overflow-hidden border-t-8 border-t-[var(--neon-cyan)]">
      <div className="flex justify-between items-end w-full font-mono text-[var(--neon-cyan)] border-b border-[var(--neon-cyan)]/20 pb-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-[var(--neon-magenta)] uppercase tracking-[0.3em] font-bold mb-1">DATA_HARVEST_SEQUENCE</span>
          <span className="glitch-text text-7xl leading-none tracking-tighter font-bold" data-text={`SCORE: ${score}`}>SCORE: {score}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] opacity-40 uppercase mb-1">PROCESS_STATUS</span>
          <span className={`text-xl font-bold ${gameOver ? 'text-red-500 animate-pulse' : 'text-[var(--neon-cyan)]'}`}>
            {gameOver ? 'CRITICAL_FAILURE' : isPaused ? 'STANDBY_MODE' : 'CORE_ACTIVE'}
          </span>
        </div>
      </div>

      <div 
        className="grid bg-black/50 border border-[var(--neon-magenta)]/30"
        style={{ 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '300px',
          height: '300px'
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div 
              key={i}
              className={`w-full h-full border-[0.5px] border-white/5 ${
                isHead ? 'bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]' :
                isSnake ? 'bg-[var(--neon-cyan)]/60' :
                isFood ? 'bg-[var(--neon-magenta)] animate-pulse shadow-[0_0_15px_var(--neon-magenta)]' : ''
              }`}
            />
          );
        })}
      </div>

      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-10">
          <h2 className="text-4xl font-mono text-[var(--neon-magenta)] glitch-text mb-4">GAME OVER</h2>
          <button 
            onClick={resetGame}
            className="px-6 py-2 neon-border-magenta text-[var(--neon-magenta)] font-mono hover:bg-[var(--neon-magenta)] hover:text-black transition-colors"
          >
            REBOOT_SYSTEM
          </button>
        </div>
      )}

      {isPaused && !gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 pointer-events-none">
          <button 
            onClick={() => setIsPaused(false)}
            className="px-6 py-2 neon-border text-[var(--neon-cyan)] font-mono pointer-events-auto hover:bg-[var(--neon-cyan)] hover:text-black transition-colors"
          >
            RESUME_PROCESS
          </button>
        </div>
      )}

      <div className="text-[10px] font-mono text-white/40 mt-2">
        [ ARROWS ] TO MOVE | [ SPACE ] TO PAUSE
      </div>
    </div>
  );
};

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Mode = "cli" | "gui";

interface ModeState {
  mode: Mode | null;
  isLoading: boolean;
  showModeSelector: boolean;
  commandHistory: string[];
  currentPath: string;
  soundEnabled: boolean;
  setMode: (mode: Mode) => void;
  setIsLoading: (loading: boolean) => void;
  setShowModeSelector: (show: boolean) => void;
  addToHistory: (command: string) => void;
  clearHistory: () => void;
  setCurrentPath: (path: string) => void;
  toggleSound: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: null,
      isLoading: true,
      showModeSelector: false,
      commandHistory: [],
      currentPath: "/home/riyaz",
      soundEnabled: false,
      setMode: (mode) => set({ mode, showModeSelector: false }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setShowModeSelector: (showModeSelector) => set({ showModeSelector }),
      addToHistory: (command) =>
        set((state) => ({
          commandHistory: [...state.commandHistory.slice(-49), command],
        })),
      clearHistory: () => set({ commandHistory: [] }),
      setCurrentPath: (currentPath) => set({ currentPath }),
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: "portfolio-session-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        mode: state.mode,
        commandHistory: state.commandHistory,
        currentPath: state.currentPath,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);

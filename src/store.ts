import { proxy } from "valtio";

interface CardState {
  code: number;
  defense: boolean;
}

interface MatState {
  monsters: CardState[];
  magics: CardState[];
  move: () => void;
}

export const store = proxy<MatState>({
  monsters: [
    { code: 10000, defense: false },
    { code: 10000, defense: false },
  ],
  magics: [
    { code: 10000, defense: false },
    { code: 10000, defense: false },
    { code: 10000, defense: false },
  ],
  move() {
    const moved = store.monsters.pop();
    if (moved) {
      store.magics.push(moved);
    }
  },
});

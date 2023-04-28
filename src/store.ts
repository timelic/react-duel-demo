import { proxy } from "valtio";

interface CardState {
  code: number;
  defense: boolean;
}

interface MatState {
  monsters: CardState[];
  magics: CardState[];
  move: (reverse?: boolean) => void;
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
  move(reverse?: boolean) {
    if (reverse) {
      const moved = store.magics.pop();
      if (moved) {
        store.monsters.push(moved);
      }
    } else {
      const moved = store.monsters.pop();
      if (moved) {
        store.magics.push(moved);
      }
    }
  },
});

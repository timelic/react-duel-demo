import { proxy } from "valtio";
import { devtools } from "valtio/utils";

const MONSTER_ZONE = 3;
const MAGIC_ZONE = 4;

interface CardState {
  code: number;
  zone: number;
  defense: boolean;
}

interface MatState {
  monsters: CardState[];
  magics: CardState[];
  move: (reverse?: boolean) => void;
}

export const store = proxy<MatState>({
  monsters: [
    { code: 10000, zone: MONSTER_ZONE, defense: false },
    { code: 10001, zone: MONSTER_ZONE, defense: false },
  ],
  magics: [
    { code: 10002, zone: MAGIC_ZONE, defense: false },
    { code: 10003, zone: MAGIC_ZONE, defense: false },
    { code: 10004, zone: MAGIC_ZONE, defense: false },
  ],
  move(reverse?: boolean) {
    if (reverse) {
      const moved = store.magics.pop();
      if (moved) {
        moved.zone = MONSTER_ZONE;
        store.monsters.push(moved);
      }
    } else {
      const moved = store.monsters.pop();
      if (moved) {
        moved.zone = MAGIC_ZONE;
        store.magics.push(moved);
      }
    }
  },
});

devtools(store, { name: "valtio store", enabled: true });

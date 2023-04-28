import { proxy } from "valtio";

interface CardState {
  code: number;
  transform: {
    r: number;
    c: number;
    h: number;
  };
  defense: boolean;
}

interface MatState {
  monsters: CardState[];
  magics: CardState[];
}

export const store = proxy<MatState>({
  monsters: [
    { code: 10000, transform: { r: 0, c: 1, h: 10 }, defense: false },
    { code: 10000, transform: { r: 0, c: 1, h: 10 }, defense: false },
  ],
  magics: [],
});

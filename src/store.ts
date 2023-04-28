import { proxy } from "valtio";

interface CardState {
  code: number;
  transform: {
    zone: number;
  };
  defense: boolean;
}

interface MatState {
  monsters: CardState[];
  magics: CardState[];
}

export const store = proxy<MatState>({
  monsters: [
    { code: 10000, transform: { zone: 3 }, defense: false },
    { code: 10000, transform: { zone: 3 }, defense: false },
  ],
  magics: [
    { code: 10000, transform: { zone: 4 }, defense: false },
    { code: 10000, transform: { zone: 4 }, defense: false },
    { code: 10000, transform: { zone: 4 }, defense: false },
  ],
});

/// <reference types="vite/client" />

export type Item = {
  id: string;
  item: string;
};

export type StateGrocery = {
  isEditing: boolean;
  idItemEdit: string;
};

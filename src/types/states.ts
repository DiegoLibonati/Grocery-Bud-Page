import type { Item } from "@/types/app";

export interface ItemState extends Record<string, unknown> {
  items: Item[];
  idItemEdit: string;
}

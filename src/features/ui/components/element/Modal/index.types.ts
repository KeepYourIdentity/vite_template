import { z } from "zod";

import type { ReactNode } from "react";

const ModalType = ["TAMBAH", "EDIT", "HAPUS", "BLOKIR"] as const;
export const ModalTypeSchema = z.enum(ModalType);
/** "TAMBAH"|"EDIT"|...dan sisa nilai dari dalam array ModalType */
export type ModalType = z.infer<typeof ModalTypeSchema> | null;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  maxWidth?: string;
}

export interface ModalState<TData = unknown> {
  isOpen: boolean;
  type: ModalType;
  data: TData | null;
}

export interface UseModalReturn<TData = unknown> {
  isOpen: boolean;
  type: ModalType;
  data: TData | null;
  openModal: (type: ModalType, data?: TData) => void;
  closeModal: () => void;
}

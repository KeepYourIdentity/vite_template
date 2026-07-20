import { useCallback, useState } from "react";

import type { ModalState, ModalType, UseModalReturn } from "./index.types";

export function useModal<TData = unknown>(): UseModalReturn<TData> {
  const [modalState, setModalState] = useState<ModalState<TData>>({
    isOpen: false,
    type: null,
    data: null,
  });

  const openModal = useCallback((type: ModalType, data: TData | null = null) => {
    setModalState({ isOpen: true, type, data });
  }, []);

  // cukup satu setState — AnimatePresence yang mengurus
  // komponen tetap mounted sampai animasi exit selesai
  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    ...modalState,
    openModal,
    closeModal,
  };
}

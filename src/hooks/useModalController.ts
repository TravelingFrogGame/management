import {useState} from "react";


export default function useModalController<T = any>() {
  const [data, setData] = useState<T | undefined>();
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }
  function openModal(newData?: T) {
    setData(newData);
    setOpen(true);
  }


  return {
    open,
    data,
    openModal,
    closeModal
  }
}

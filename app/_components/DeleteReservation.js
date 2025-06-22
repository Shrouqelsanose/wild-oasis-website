"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId, onDelete }) {
  const [isPending, startTransition] = useTransition();
  function handleDelete() {
    if (confirm("Are you sure you want to delete tis reservation?"))
      startTransition(() => onDelete(bookingId));
  }
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-[var(--color-accent-600)] transition-colors hover:text-[var(--color-primary-900)]">
      {!isPending ? (
        <>
          {" "}
          <TrashIcon className="h-5 w-5 text-[var(--color-primary-600)] group-hover:text-[var(--color-primary-800)] transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <SpinnerMini />
      )}
    </button>
  );
}

export default DeleteReservation;

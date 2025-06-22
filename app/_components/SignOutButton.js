import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button className="py-3 px-5 hover:bg-[var(--color-primary-900)] hover:text-[var(--color-primary-100)] transition-colors flex items-center gap-4 font-semibold text-[var(--color-primary-200)] w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-[var(--color-primary-600)]" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;

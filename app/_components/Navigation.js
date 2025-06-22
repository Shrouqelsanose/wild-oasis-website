import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="z-10 text-lg md:text-xl">
      <ul className="flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-[var(--color-accent-400)] transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-[var(--color-accent-400)] transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-[var(--color-accent-400)] transition-colors flex items-center gap-3 md:gap-4">
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.image}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-[var(--color-accent-400)] transition-colors">
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col md:flex-row border border-[var(--color-primary-800)]">
      {/* Image section */}
      <div className="relative w-full md:flex-1">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover md:border-r border-[var(--color-primary-800)]"
        />
      </div>

      {/* Content section */}
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-5 md:px-7 bg-[var(--color-primary-950)]">
          <h3 className="text-[var(--color-accent-500)] font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>

          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-[var(--color-primary-600)]" />
            <p className="text-lg text-[var(--color-primary-200)]">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex flex-wrap gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-[var(--color-primary-600)]">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-[var(--color-primary-200)]">/ night</span>
          </p>
        </div>

        <div className="bg-[var(--color-primary-950)] border-t border-t-[var(--color-primary-800)] text-right">
          <Link
            href={`/cabins/${id}`}
            className="block border-l border-[var(--color-primary-800)] py-4 px-6 hover:bg-[var(--color-accent-600)] transition-all hover:text-primary-900">
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;

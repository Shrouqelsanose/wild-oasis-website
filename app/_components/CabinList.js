import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";
async function CabinList({ filter }) {
  // noStore();
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let displayCabins;
  if (filter === "all") displayCabins = cabins;
  if (filter === "small")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 7);
  if (filter === "large")
    displayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  return (
    <div>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {displayCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CabinList;

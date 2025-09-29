"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SortProduct = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedSort = searchParams.get("sort") || "newest";

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-end items-center my-6 gap-2 text-sm text-gray-500">
      <span>Sort by</span>
      <select
        name="sort"
        id="sort"
        className="ring ring-gray-300 rounded-md px-2 py-1 shadow-md p-1"
        onChange={e => handleSortChange(e.target.value)}
        value={selectedSort}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortProduct;

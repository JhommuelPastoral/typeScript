import QuickSortSandBox from "./QuickSortSandBox";
export default function QuickSort() {

  return (
  <section className="w-full">
    <header>
      <p className="text-lg font-semibold">5.) Quick Sort</p>
      <p>
        Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays — one with elements less than the pivot and one with elements greater than the pivot. It then recursively applies the same strategy to the sub-arrays.
      </p>
      <p className="text-lg font-semibold">Complexity Analysis of Quick Sort:</p>
      <p>Time Complexity: Best & Avg - O(n log n), Worst - O(n²)</p>
      <p>Space Complexity: O(log n) (in-place with recursion stack)</p>
      <p>Stability: Not Stable (can be made stable with modifications)</p>
      <p>
        When to use: Ideal for large datasets when average-case performance matters and you want an in-place sort. It's faster than most other algorithms in practice, especially for arrays.
      </p>
    </header>
    <main className="w-full max-w-full mt-4">
      <QuickSortSandBox />
    </main>
  </section>

  )
}

import SelectionSandBox from "./SelectionSandBox";
export default function SelectionSort() {

  return (
    <section className="w-full">
      <header>
        <p className="text-lg font-semibold">2.) Selection Sort</p>
        <p>
          Selection Sort is a simple comparison-based sorting algorithm. It repeatedly selects the smallest (or largest) element from the unsorted part of the array and swaps it with the first unsorted element. This process continues until the entire array is sorted.
        </p>
        <p className="text-lg font-semibold">Complexity Analysis of Selection Sort:</p>
        <p>Time Complexity: O(n²)</p>
        <p>Space Complexity: O(1)</p>
        <p>Stability: Not Stable (can be made stable with extra logic)</p>
        <p>
          When to use: Useful when the number of swaps needs to be minimized (e.g., memory writes are costly), or for small datasets where performance is not critical.
        </p>
      </header>
      <main className="w-full max-w-full mt-4">
        <SelectionSandBox/>
      </main>
    </section>
  )
}

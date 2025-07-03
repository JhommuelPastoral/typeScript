import SelectionSandBox from "./InsertionSandBox";
export default function InsertionSort() {

  return (
    <section className="w-full">
      <header>
        <p className="text-lg font-semibold">3.) Insertion Sort</p>
        <p>
          Insertion Sort is a simple and intuitive sorting algorithm that builds the final sorted array one element at a time. It works similarly to how you might sort playing cards: by picking each element and inserting it into its correct position in the already sorted portion.
        </p>
        <p className="text-lg font-semibold">Complexity Analysis of Insertion Sort:</p>
        <p>Time Complexity: O(n²)</p>
        <p>Best Case (nearly sorted): O(n)</p>
        <p>Space Complexity: O(1)</p>
        <p>Stability: Stable</p>
        <p>
          When to use: Best for small arrays or arrays that are already nearly sorted. Performs better than Bubble and Selection in these cases. It's also useful in real-time systems where data arrives over time.
        </p>
      </header>

      <main className="w-full max-w-full mt-4">
        <SelectionSandBox/>
      </main>
    </section>
  )
}

import Sandbox from "./BubbleSandbox";
export default function BubbleSort() {

  return (
    <section className="w-full">
      <header>
        <p className="text-lg font-semibold">1.) Bubble Sort </p>
        <p className=""> Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares two adjacent items, and swaps them if they’re in the wrong order. </p>
        <p className="text-lg font-semibold"> Complexity Analysis of Bubble Sort: </p>
        <p className="">Time Complexity: O(n^2)</p>
        <p>Space Complexity: O(1)</p>
        <p>Stability: Stable</p>
        <p>  When to use: Best for small datasets or nearly sorted arrays. Avoid it for large datasets due to its poor performance.</p>
      </header>
      <main className="w-full max-w-full mt-4">
        <Sandbox/>
      </main>
    </section>
  )
}

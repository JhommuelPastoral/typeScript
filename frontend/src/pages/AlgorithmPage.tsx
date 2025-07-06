import BubbleSort from "@/sortingComponents/bubble/BubbleSort"
import SelectionSort from "@/sortingComponents/selection/SelectionSort"
import InsertionSort from "@/sortingComponents/insertion/InsertionSort"
import MergeSort from "@/sortingComponents/merge/MergeSort"
export default function AlgorithmPage() {
  return (
    <>
      <header className="w-full p-2 lg:p-5 font-Rubik">
        <h4 className="text-xl font-semibold tracking-tight scroll-m-20">
          Sorting Algorithms
        </h4>
      </header>

      <main className="w-full p-2 space-y-5 lg:p-5 font-Rubik">
        <BubbleSort/>
        <SelectionSort/>
        <InsertionSort/>
        <MergeSort/>
      </main>

    </>
  )
}

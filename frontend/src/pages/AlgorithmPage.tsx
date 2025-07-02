import BubbleSort from "@/sortingComponents/BubbleSort"
export default function AlgorithmPage() {
  return (
    <>
      <header className="w-full p-2 lg:p-5 font-Rubik">
        <h4 className="text-xl font-semibold tracking-tight scroll-m-20">
          Sorting Algorithms
        </h4>
      </header>

      <main className="w-full p-2 lg:p-5 font-Rubik">
        <BubbleSort/>
      </main>

    </>
  )
}

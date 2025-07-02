import { Input } from "@/components/ui/input"
import { useState } from "react"
export default function BubbleSort() {

  const [arrayValues, setArrayValues] = useState<string>('');
  const [unsortedArray, setUnsortedArray] = useState<number[]>([]);

  const handleValueArray = (e : React.ChangeEvent<HTMLInputElement>)=>{
    
    setArrayValues(e.target.value);
    const parts = e.target.value.split(',').map((p) => p.trim());
    const isValid = parts.every((p) => !isNaN(Number(p)) && p !== '');

    if (!isValid) { 
      return
    }
    const numberArray = parts.map(Number);
    setUnsortedArray(numberArray);
  }

  const sortedArray = ()=>{
    const sortedArray = [...unsortedArray];
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = 0; j < sortedArray.length - i - 1; j++) {
        if (sortedArray[j] > sortedArray[j + 1]) {
          const temp = sortedArray[j];
          sortedArray[j] = sortedArray[j + 1];
          sortedArray[j + 1] = temp;
        }
      }
    }
    return sortedArray
  }
  return (
    <section>
      <header>
        <p className="text-lg font-semibold">1.) Bubble Sort </p>
        <p className=""> Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares two adjacent items, and swaps them if they’re in the wrong order. </p>
        <p className="text-lg font-semibold"> Complexity Analysis of Bubble Sort: </p>
        <p className="">Time Complexity: O(n^2)</p>
      </header>

      <main className="w-full mt-4">
        <div className="grid items-start grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Code */}
          <div className="">
            <div className="flex items-center gap-2">
              <p>TypeScirpt Code:</p>
              <Input type="text" className="flex-1" placeholder="Enter Unsorted Array (No Space): eg: 3,5,3,11,1" onChange={handleValueArray} value={arrayValues} />

            </div>
            <code>    
              <pre>
{`const unsortedArray: number[] = [${arrayValues.length === 0 ? "3,5,3,11,1" : unsortedArray}];

for(let i =0; i<unsortedArray.length -1 ; i++){
    let isSwap:boolean = false;
    for(let j=0; j < unsortedArray.length -1 -i; j++){
        if(unsortedArray[j] > unsortedArray[j +1] ){
            isSwap = true;
            const temp:number =  unsortedArray[j];
            // Swap
            unsortedArray[j] = unsortedArray[j +1];
            unsortedArray[j +1] = temp;
        }
        
        
      }
    // If there is no swap, the array is already sorted
    if(!isSwap) {
        break;
    };
    
}`
}
                </pre>     
            </code>
          </div>
          {/* Visual */}
          <div className="flex flex-col items-start justify-start ">
            <p>Output Code:</p>
            <div className="flex flex-wrap gap-1">
              {sortedArray().map((item, index, arr) => (
                <div className="flex items-center gap-1" key={index}>
                  <p>{item}</p>
                  {index !== arr.length - 1 && <p>,</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

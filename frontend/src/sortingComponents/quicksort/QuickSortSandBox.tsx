import { Sandpack } from "@codesandbox/sandpack-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const defaultFiles = {
  "/App.tsx": {
        code: `
import { useState, useEffect } from "react";
export default function App() {
// Change the Values of the Unsorted Array:
const[unsortedArray, setUnsortedArray] = useState<number[]>([]);
const[sortedArray, setsortedArray] = useState<number[]>([]);
const[inputValue, setInputValue] = useState<string>("");


const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  const newValue = e.target.value;
  setInputValue(newValue);

  const parsedNumbers = newValue
    .split(",")
    .map((str) => str.trim())
    .map(Number)
    .filter((num) => !isNaN(num));

  setUnsortedArray(parsedNumbers);
};

const pivot = (arr:number, left:number, right:number) => {
    const pi = arr[right];
    let i = left -1;

    for(let j = left; j<right; j++){
      if(arr[j] < pi){
        i++;
        swap(arr, i, j);
      }
    }
    swap(arr, i+1, right);
    return i +1;
}

const swap = (arr:number[], i:number, j:number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
  
const quickSort = (arr:number[], left:number, right:number) => {
  if(left >= right) return;
  const pi = pivot(arr, left, right);
  quickSort(arr, left, pi-1);
  quickSort(arr, pi+1, right);
}
const handleSort = () => {
  const arrCopy  = [...unsortedArray];
  quickSort(arrCopy , 0, unsortedArray.length - 1);
  setsortedArray(arrCopy);
}

return (
  <div>
    <h1 >Quick Sort</h1>
    <input style={{display: "block", width: "300px"}} type="text" onChange={handleChangeInput} value={inputValue} placeholder="Enter numbers separated by commas eg: 1,2,3" />
    <p>Unsorted Array: [{unsortedArray.join(',')}]</p>
    <button onClick={handleSort}>Sort</button>
    <p>Sorted Array: [{sortedArray.join(',')}]</p>
  </div>
);
}
`}
}
export default function QuickSortSandBox() {
  const [files, setFiles] = useState(defaultFiles);
  return (
    <div className="flex flex-col gap-3" >
      <div className="flex items-end justify-end">
        <Button className="cursor-pointer" onClick={() => setFiles({...defaultFiles})}>Reset To Default</Button>
      </div>
      <Sandpack
        files={files} 
        theme="dark" 
        template="react-ts"
        options={{
        showLineNumbers: true, // default - true
        showInlineErrors: true, // default - false
        wrapContent: true, // default - false
        editorHeight: 400, // default - 300
        editorWidthPercentage: 50, // default - 50
      }}
      />

    </div>
  )  
}

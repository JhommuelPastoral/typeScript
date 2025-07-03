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

const bubbleSort = () => {
  const arr = [...unsortedArray]; // Make a copy of the Array
  for(let i = 0; i < arr.length-1; i++) {
    let isSwap:boolean = false;
    for(let j = 0; j < arr.length-1-i; j++) {
      if(arr[j] > arr[j+1]) {
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
        isSwap = true
      }
    }
    if(!isSwap) { // If there is no swap in inner Loop, it means the array is already Sorted.
      break;
    }
  } 
  setsortedArray(arr);

}

return (
  <div>
    <h1 >Bubble Sort</h1>
    <input style={{display: "block", width: "300px"}} type="text" onChange={handleChangeInput} value={inputValue} placeholder="Enter numbers separated by commas eg: 1,2,3" />
    <p>Unsorted Array: [{unsortedArray.join(',')}]</p>
    <button onClick={bubbleSort}>Sort</button>
    <p>Sorted Array: [{sortedArray.join(',')}]</p>
  </div>
);
}
`}
}
export default function Sandbox() {
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

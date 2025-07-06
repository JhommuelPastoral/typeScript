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

const merge = (arr:number[], left:number, mid:number, right:number) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  let i = 0, j=0;
  let k = left; 

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }
  
  while(i < n1){
    arr[k] = L[i];
    i++;
    k++;
  }

  while(j < n2){
    arr[k] = R[j];
    j++;
    k++;
  }
  
  }
  
const mergeSort = (arr:number[], left:number, right:number) => {
  if(left >= right) return;
  
  const mid = Math.floor(left +  ((right - left) / 2));

  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}
const handleSort = () => {
  const arrCopy  = [...unsortedArray];
  mergeSort(arrCopy , 0, unsortedArray.length - 1);
  setsortedArray(arrCopy);
}

return (
  <div>
    <h1 >Merge Sort</h1>
    <input style={{display: "block", width: "300px"}} type="text" onChange={handleChangeInput} value={inputValue} placeholder="Enter numbers separated by commas eg: 1,2,3" />
    <p>Unsorted Array: [{unsortedArray.join(',')}]</p>
    <button onClick={handleSort}>Sort</button>
    <p>Sorted Array: [{sortedArray.join(',')}]</p>
  </div>
);
}
`}
}
export default function MergeSandBox() {
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

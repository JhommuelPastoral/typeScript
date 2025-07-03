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

const InsertionSort = () => {
  const arr = [...unsortedArray]; // Make a copy of the Array
  for (let i =1; i<arr.length; i++){
    let key = arr[i];
    let j = i-1;
    while(j>=0 && arr[j] >key){
      arr[j+1] = arr[j];
      j--;
    }
    arr[j+1] = key;
  }   
  setsortedArray(arr);

  }

return (
  <div>
    <h1 >Insetion Sort</h1>
    <input style={{display: "block", width: "300px"}} type="text" onChange={handleChangeInput} value={inputValue} placeholder="Enter numbers separated by commas eg: 1,2,3" />
    <p>Unsorted Array: [{unsortedArray.join(',')}]</p>
    <button onClick={InsertionSort}>Sort</button>
    <p>Sorted Array: [{sortedArray.join(',')}]</p>
  </div>
);
}
`}
}
export default function InsertionSandBox() {
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

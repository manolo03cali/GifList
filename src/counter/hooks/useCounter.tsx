import { useState } from "react";
interface CounterState {
  counter: number;
  handleAdd: () => void;
  handleSubtract: () => void;
  handleReset: () => void;
}

export const useCounter = (initialValue: number = 5): CounterState => {
  const [counter, setCounter] = useState(initialValue);
  const handleAdd = () => {
    setCounter(counter + 1);
  };
  const handleSubtract = () => {
    setCounter(counter - 1);
  };
  const handleReset = () => {
    setCounter(initialValue);
  };
  return {
    //Properties o values
    counter,

    //method /action
    handleAdd,
    handleSubtract,
    handleReset,
  };
};

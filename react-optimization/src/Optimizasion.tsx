import React, { FC, memo, useCallback, useMemo, useState } from "react";

const obj1 = { name: "js", info: "frontend" };
const array1 = [1, 2, 3, 4, 5];
const fn1 = () => {
  console.log("fn");
};
interface IAge {
  age?: number;
}
const fn2 = () => {
  const arr = [1, 2];
  console.log("fn inside");
};
const Optimizasion: FC<IAge> = memo(({ age = 25 }) => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [sname, setSname] = useState("");
  const [newArr, setNewArr] = useState<string[]>([]);
  const obj = useMemo(
    () => ({
      name: name ?? "John",
      age,
    }),
    [age, name]
  );
  console.log("outer age", age);

  const fn = useCallback(
    (value: string = "Hello") => {
      console.log("inside age", age);
      const arr = [name, age];
      const str = (name ?? "John  ") + age + value;
      return str;
    },
    [name, age]
  );

  //rare cases
  const twiceArr = useMemo(() => {
    const arr = [1, 2, 3];
    const newArr = arr.map((el) => el + sname);
    return newArr;
  }, [sname]);
//perfarmance>>>
  const handleChangeSname = useCallback((e: any) => {
    setSname(e.target.value);
    const arr = [1, 2, 3];
    const copyArr = arr.map((el) => el + sname);
    setNewArr([...copyArr]);
  }, []);
  /*               
 1==>const fn=()=>{const arr=[undefined,26] const str=undefined ?? "John  " +26  return "John 26" } 
 2==>setName("a") ==>  fn=()=>{const arr=["a",26] const str=undefined ?? "John  " +26  return "John 26" } 
 */

  /*
1==> const obj = {name: "John", age:26}    const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
2==> setSname("a")===>  const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
3==> setSname("al")===>  const fn = () => {const arr = [1, 2]; console.log("fn inside");}; , const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
4==> setName("e")==>  const obj = {name: "John", age:26} , const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
5==> const obj = {name: "e", age:26} ,const fn = () => {const arr = [1, 2]; console.log("fn inside");}; , const obj = {name: "el", age:26},const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
6===><App/>==>age changed age=3 ==>const obj = {name: "John", age:3}    const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
7==> <App/>==>age changed age=20==> const obj = {name: "John", age:2}   const fn = () => {const arr = [1, 2]; console.log("fn inside");};  const obj = {name: "John", age:20}    const fn = () => {const arr = [1, 2]; console.log("fn inside");}; 
*/ 
//gabriage collector set,map===>
  console.log("Optimization re-render");

  return (
    <div className="App">
      <h1>{JSON.stringify(obj)}</h1> <br />
      <h2>{fn()}</h2>
      name:
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <br />
      sname:
      <input type="text" value={sname} onChange={(e) => handleChangeSname(e)} />
      <p>{JSON.stringify(twiceArr)}</p>
      <p>{JSON.stringify(newArr)}</p>
    </div>
  );
});

export default Optimizasion;

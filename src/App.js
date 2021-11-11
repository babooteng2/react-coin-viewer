import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (e) => setKeyword(e.target.value);

  useEffect(() => {
    console.log("I run only once. ");
  }, []);
  useEffect(() => {
    console.log("I run when 'keywod' changes ", keyword);
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes ");
  }, [counter]);
  useEffect(() => {
    console.log("I run when 'counter' & 'keyword' changes ");
  }, [counter, keyword]);

  return (
    <div>
      <input
        value={keyword}
        type="text"
        placeholder="Search here..."
        onChange={onChange}
      />
      <div>{counter}</div>
      <button onClick={onClick}>click me</button>
    </div>
  );
}

export default App;

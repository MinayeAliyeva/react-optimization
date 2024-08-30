import React, { useState } from "react";

import "./App.css";
import Optimizasion from "./Optimizasion";

function App() {
  const [state, setState] = useState({ age: 26, info: "" });
  console.log("App RE-RENDER");
  return (
    <div className="App">
      age:<input
        value={state.age}
        onChange={(e) => setState({ ...state, age: +e.target.value })}
      />
      <br />
    
      info:<input
        value={state.info}
        onChange={(e) => setState({ ...state, info: e.target.value })}
      />
      <hr />
      <Optimizasion age={state?.age} />
    </div>
  );
}

export default App;
//ilkin renderde ==> obj={name:"john"}
//setSname('a')
//setSname('Amanov')

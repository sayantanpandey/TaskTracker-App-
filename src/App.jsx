// import { useState } from "react";
// import TaskTrackerApp from "./component/TaskTrackerApp";
// import "./App.css";
// import React from 'react';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <TaskTrackerApp />
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import TaskTrackerApp from "./component/TaskTrackerApp";
import "./App.css";
import React from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TaskTrackerApp />
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import CheckBoxes from "./components/CheckBoxes";
const data = [
  {
    id: 1,
    name: "Grand Parent",
    children: [
      {
        id: 2,
        name: "Parent 1",
        children: [
          { id: 6, name: "Child 1", children: [] },
          { id: 7, name: "Child 2", children: [] },
          {
            id: 8,
            name: "Child 3",
            children: [
              { id: 9, name: "Grand Child 1", children: [] },
              { id: 10, name: "Grand Child 2", children: [] },
            ],
          },
        ],
      },
      { id: 3, name: "Parent 2", children: [] },
      { id: 4, name: "Parent 3", children: [] },
      { id: 5, name: "Parent 4", children: [] },
    ],
  },
];
function App() {
  const [status, setStatus] = useState({});
  const handleCheck = (node, value) => {
    setStatus((prev) => {
      const newStatus = { ...prev };
      updateNode(node, value, newStatus);
      // check parent if all it's children are checked, must use bottom up approach
      data.map((node) => verifyChildren(node, newStatus));
      return newStatus;
    });
  };
  const updateNode = (node, value, status) => {
    status[node.id] = value;
    if (node.children.length) {
      node.children.map((c) => updateNode(c, value, status));
    }
  };
  const verifyChildren = (node, status) => {
    // don't change it if it has no children
    if (node.children.length === 0) return;

    // first verify children, bottom up approach
    node.children.map((child) => verifyChildren(child, status));
    let allChecked = true;

    node.children.map((child) => {
      if (!status[child.id]) allChecked = false;
    });
    if (allChecked) {
      status[node.id] = true;
    } else {
      status[node.id] = false;
    }
  };
  return (
    <div className="app">
      <h1>Nested Checkboxes</h1>
      <div className="checkboxes-container">
        <CheckBoxes data={data} status={status} handleCheck={handleCheck} />
      </div>
    </div>
  );
}

export default App;

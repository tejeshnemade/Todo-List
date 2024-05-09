import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState(() => localdata());
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  function localdata() {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : [];
  }

  const handleData = (e) => {
    setInput(e.target.value);
  };

  const handleList = () => {
    if (input.trim() !== "") {
      setList([...list, input]);
      setInput("");
    }
  };

  const handleDelete = (i) => {
    const filter = list.filter((element, index) => index !== i);
    setList(filter);
  };

  const handleUpdate = (i) => {
    const updatedList = [...list];
    const newValue = prompt("Enter new value", list[i]);
    if (newValue !== null) {
      updatedList[i] = newValue;
      setList(updatedList);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Todo App</h1>
      <div className="container contain py-3 mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            value={input}
            onChange={handleData}
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary "
            onClick={handleList}
            type="button"
            id="button-addon2"
          >
            Add to List
          </button>
        </div>
        <div className="mt-5">
          <ul className="list-group">
            {list.map((item, i) => (
              <li
                key={i}
                className="list-group-item li list-group-item-success "
              >
                {item}
                <div>
                  <button
                    className="btn btn-danger mx-5"
                    onClick={() => handleUpdate(i)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger del mx-5"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

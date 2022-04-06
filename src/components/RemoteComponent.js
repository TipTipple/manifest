import React, { Component, useState } from "react";

const style = {
  padding: 20,
  outline: "1px dashed blue",
  marginBottom: "10px",
};

const RemoteComponent = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);

  const setToZero = () => setCounter(0);

  return (
    <div style={style}>
      <div>{counter}</div>
      <button onClick={increaseByOne}> увеличить</button>
      <button onClick={setToZero}> сбросить</button>
    </div>
  );
};

export default RemoteComponent;

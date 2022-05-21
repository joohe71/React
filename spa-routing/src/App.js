import React from "react";
import styled from "styled-components";
import UserLogin from "./UserLogin";

function App() {
  return (
    <Div className="App">
      <div className="app-container">
        <UserLogin />
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .app-container {
    padding: 10px;
    border: solid 1px gray;
    height: 50vh;
    width: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
}
  }
`;
export default App;

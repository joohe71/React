import UserTableApp from "./UserTableApp";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <UserTableApp />
    </Container>
  );
}

export default App;

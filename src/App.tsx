import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import { darkTheme } from "./styles/theme";
import ToDoList from "./ToDoList";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToDoList />
    </ThemeProvider>
  );
}

export default App;

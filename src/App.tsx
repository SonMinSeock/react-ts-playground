import { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyle } from "./styles/globalStyle";
import { lightTheme, darkTheme } from "./styles/theme";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleDark = () => setIsDark((prev) => !prev);
  return (
    <div>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <button onClick={toggleDark}>Toggle Mode</button>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;

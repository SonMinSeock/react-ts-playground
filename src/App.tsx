import styled, { ThemeProvider } from "styled-components";
import Router from "./Router";
import { GlobalStyle } from "./styles/globalStyle";
import { lightTheme, darkTheme } from "./styles/theme";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

const ModeBtn = styled.div`
  position: fixed;
  bottom: 14px;
  left: 10px;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.cardBgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    color: #ffeb3b;
  }
`;

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleDark = () => setIsDark((prev) => !prev);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ModeBtn onClick={toggleDark} theme={isDark ? darkTheme : lightTheme}>
        {isDark ? <IoMdSunny size={20} /> : <FaMoon size={20} />}
      </ModeBtn>
      <GlobalStyle />
      <Router isDark={isDark} />
    </ThemeProvider>
  );
}

export default App;

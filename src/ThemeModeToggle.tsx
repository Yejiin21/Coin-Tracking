import styled from "styled-components";
import { lightTheme } from "./style/theme";

const ThemeModeWrapper = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: ${(props) => props.theme.boxColor};
`;

export const ThemeModeButton = ({ Toggle, themeMode }) => {
  return (
    <ThemeModeWrapper onClick={Toggle}>
      {themeMode === lightTheme ? "🌝" : "🌚"}
    </ThemeModeWrapper>
  );
};

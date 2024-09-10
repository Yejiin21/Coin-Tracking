import { useState } from "react";
import styled from "styled-components";

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

interface IThemePrpos {
  toggle: () => void;
}

const [themeMode, setThemeMode] = useState(true);

export const ThemeModeButton = ({ toggle }: IThemePrpos) => {
  return (
    <ThemeModeWrapper onClick={toggle}>
      {themeMode === true ? "🌝" : "🌚"}
    </ThemeModeWrapper>
  );
};

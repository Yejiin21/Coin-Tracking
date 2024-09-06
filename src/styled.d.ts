import styled from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    colors: {
      colorMain: string;
      colorBg: string;
      colorMainFont: string;
      colorSkyBlue: string;
      colorBlue: string;
      colorDisabled: string;
      colorGray: string;
      colorDarkGray: string;
      colorWhite: string;
      colorRed: string;
      colorDiRed: string;
      colorShadow: string;
      colorDarkShadow: string;
    };
  }
}

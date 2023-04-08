import { ThemeShadesInterface } from "./ThemeShadesInterface";

export interface ThemePaletteInterface {
  primary: {
    main: ThemeShadesInterface;
  };
  secondary: {
    main: ThemeShadesInterface;
  };
  neutral: {
    dark: ThemeShadesInterface;
    main: ThemeShadesInterface;
    light: ThemeShadesInterface;
  };
}

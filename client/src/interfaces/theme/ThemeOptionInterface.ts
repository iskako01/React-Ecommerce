import { PaletteOptions } from "@mui/material";
import { ThemePaletteInterface } from "./ThemePaletteInterface";
import { ThemeTypographyInterface } from "./ThemeTypographyInterface";

export interface ThemeOptionInterface {
  palette: PaletteOptions & ThemePaletteInterface;
  typography: ThemeTypographyInterface;
}

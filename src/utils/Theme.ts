export const darkTheme = {
  bg: '#181818',
  bgLight: '#202020',
  bgLighter: '#505050',
  text: 'white',
  textDark: '#aaaaaa',
  soft: '#373737',
};

export const lightTheme = {
  bg: '#f9f9f9',
  bgLight: 'white',
  bgLighter: '#e0e0e0',
  text: 'black',
  textDark: '#606060',
  soft: '#f5f5f5',
};

export interface ThemeType {
  readonly bg: string;
  readonly bgLight: string;
  readonly bgLighter: string;
  readonly text: string;
  readonly textDark: string;
  readonly soft: string;
}

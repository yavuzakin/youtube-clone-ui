import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './Theme';

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  ::-webkit-scrollbar {
    width: 1rem;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.textDark};
    border-radius: 2rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.bgLighter};
  }
`;

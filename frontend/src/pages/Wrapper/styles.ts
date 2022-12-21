import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

interface ContentProps {
  scrollaActive: boolean;
}

export const Content = styled.div<ContentProps>`
  width: 100%;
  flex: 1;
  padding: 0 1.6125rem 0 2rem;
  ${({ scrollaActive }) =>
    scrollaActive &&
    `
    overflow-y: scroll;
    `}
  overflow-x: hidden;
  position: relative;
  /* width */
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

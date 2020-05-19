import styled from "@emotion/styled";

export const Arrow = styled("div")<{ background: string }>`
  height: 1rem;
  position: absolute;
  width: 1rem;
  shadow: var(--swui-shadow-popover);

  &[data-placement*="bottom"] {
    height: 1rem;
    left: 0;
    margin-top: -0.4rem;
    top: 0;
    width: 1rem;
    &::before {
      border-color: transparent transparent ${({ background }) => background}
        transparent;
      border-width: 0 0.5rem 0.4rem 0.5rem;
      position: absolute;
      top: -1px;
    }
    &::after {
      border-color: transparent transparent ${({ background }) => background}
        transparent;
      border-width: 0 0.5rem 0.4rem 0.5rem;
    }
  }
  &[data-placement*="top"] {
    bottom: 0;
    height: 1rem;
    left: 0;
    margin-bottom: -1rem;
    width: 1rem;
    &::before {
      border-color: ${({ background }) => background} transparent transparent
        transparent;
      border-width: 0.4rem 0.5rem 0 0.5rem;
      position: absolute;
      top: 1px;
    }
    &::after {
      border-color: ${({ background }) => background} transparent transparent
        transparent;
      border-width: 0.4rem 0.5rem 0 0.5rem;
    }
  }
  &[data-placement*="right"] {
    height: 1rem;
    left: 0;
    margin-left: -0.7rem;
    width: 1rem;
    &::before {
      border-color: transparent ${({ background }) => background} transparent
        transparent;
      border-width: 0.5rem 0.4rem 0.5rem 0;
    }
    &::after {
      border-color: transparent ${({ background }) => background} transparent
        transparent;
      border-width: 0.5rem 0.4rem 0.5rem 0;
      left: 6px;
      top: 0;
    }
  }
  &[data-placement*="left"] {
    height: 1rem;
    margin-right: -0.7rem;
    right: 0;
    width: 1rem;
    &::before {
      border-color: transparent transparent transparent
        ${({ background }) => background};
      border-width: 0.5rem 0 0.5rem 0.4em;
    }
    &::after {
      border-color: transparent transparent transparent
        ${({ background }) => background};
      border-width: 0.5rem 0 0.5rem 0.4em;
      left: 3px;
      top: 0;
    }
  }
  &::before {
    border-style: solid;
    content: "";
    display: block;
    height: 0;
    margin: auto;
    width: 0;
  }
  &::after {
    border-style: solid;
    content: "";
    display: block;
    height: 0;
    margin: auto;
    position: absolute;
    width: 0;
  }
`;

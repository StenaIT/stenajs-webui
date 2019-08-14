import styled from "@emotion/styled";

export const Arrow = styled("div")`
  height: 1rem;
  position: absolute;
  width: 1rem;

  &[data-placement*="bottom"] {
    height: 1rem;
    left: 0;
    margin-top: -0.4rem;
    top: 0;
    width: 1rem;
    &::before {
      border-color: transparent transparent silver transparent;
      border-width: 0 0.5rem 0.4rem 0.5rem;
      position: absolute;
      top: -1px;
    }
    &::after {
      border-color: transparent transparent white transparent;
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
      border-color: silver transparent transparent transparent;
      border-width: 0.4rem 0.5rem 0 0.5rem;
      position: absolute;
      top: 1px;
    }
    &::after {
      border-color: white transparent transparent transparent;
      border-width: 0.4rem 0.5rem 0 0.5rem;
    }
  }
  &[data-placement*="right"] {
    height: 1rem;
    left: 0;
    margin-left: -0.7rem;
    width: 1rem;
    &::before {
      border-color: transparent silver transparent transparent;
      border-width: 0.5rem 0.4rem 0.5rem 0;
    }
    &::after {
      border-color: transparent white transparent transparent;
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
      border-color: transparent transparent transparent silver;
      border-width: 0.5rem 0 0.5rem 0.4em;
    }
    &::after {
      border-color: transparent transparent transparent white;
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

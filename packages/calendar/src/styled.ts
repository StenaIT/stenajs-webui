import _styled, { CSSObject, CreateStyled } from "@emotion/styled";

// emotion/styled has bad cjs export: https://github.com/emotion-js/emotion/issues/2730
let styled = _styled;
if ((_styled as any).default)
  styled = (styled as any).default as any as CreateStyled;

export type { CSSObject };
export { styled };

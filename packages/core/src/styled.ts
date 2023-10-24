import _styled, { CSSObject, CreateStyled } from "@emotion/styled";
import _isPropValid from "@emotion/is-prop-valid";

// emotion/is-prop-valid has bad cjs export: https://github.com/emotion-js/emotion/issues/2730
let isPropValid = _isPropValid;
if ((_isPropValid as any).default) {
  isPropValid = (_isPropValid as any).default as any as typeof _isPropValid;
}

// emotion/styled has bad cjs export: https://github.com/emotion-js/emotion/issues/2730
let styled = _styled;
if ((_styled as any).default) {
  styled = (styled as any).default as any as CreateStyled;
}

export type { CSSObject };
export { styled, isPropValid };

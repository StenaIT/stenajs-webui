import * as React from "react";
import { BaseHeader, BaseHeaderProps } from "../header/BaseHeader";

export interface CardHeaderProps extends BaseHeaderProps {}

export const CardHeader: React.FC<CardHeaderProps> = ({
  variant = "relaxed",
  ...props
}) => {
  return <BaseHeader variant={variant} {...props} />;
};

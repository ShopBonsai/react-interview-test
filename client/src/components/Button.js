import React from "react";
import { Button as ReactButton, Spinner } from "reactstrap";

export const Button = ({
  className,
  block = true,
  color,
  disabled,
  onClick,
  loading,
  children,
  text,
}) => {
  return (
    <ReactButton
      className={className}
      block={block}
      color={color}
      disabled={disabled || loading}
      onClick={() => {
        if (!disabled && !loading && onClick) onClick();
      }}
    >
      {loading ? (
        <Spinner style={{ width: "1rem", height: "1rem" }} />
      ) : (
        text || children
      )}
    </ReactButton>
  );
};

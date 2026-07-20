import { Button } from "../";

import type { ReactElement } from "react";
import type { ICardProps } from "./index.types";

export default function CardButton({
  animated = true,
  onClick,
  className,
  children,
  TopSide,
  BottomSide,
  title,
  "aria-disabled": ariaDisabled,
}: ICardProps): ReactElement {
  return (
    <Button
      needAnimation={animated}
      onClick={onClick}
      title={title}
      aria-disabled={ariaDisabled}
      className={`group flex flex-col items-start justify-start text-left size-full bg-white border rounded-2xl! p-6! transition-all duration-300 shadow-lg ${className}`.trim()}
    >
      {children === undefined ? (
        <>
          <div className="flex flex-row w-full justify-between items-start mb-6">{TopSide}</div>
          <div className="flex flex-col gap-2">{BottomSide}</div>
        </>
      ) : (
        children
      )}
    </Button>
  );
}

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from "./primitive";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: string | number | ReactNode;
};

export const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipRoot delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
};

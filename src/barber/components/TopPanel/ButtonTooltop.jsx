import React from "react";
import {Tooltip, Button} from "@nextui-org/react";

export default function ButtonWithTooltip({ props }) {
  return (
    <div className="flex gap-2">
      <Tooltip color="warning" content="Tooltip 1" delay={1000}>
        <Button color="warning" variant="flat" >
          Delay Open (1000ms)
        </Button>
      </Tooltip>
    </div>
  );
}

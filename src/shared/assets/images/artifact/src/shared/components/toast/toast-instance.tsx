import type { ToastInstanceProps } from "./toast.types.tsx";
import { normalizeProps, useMachine } from "@zag-js/react";
import * as toast from "@zag-js/toast";

export const ToastInstance = (props: ToastInstanceProps) => {
  const { actor, index, parent } = props;
  const composedProps = { ...actor, index, parent };

  const service = useMachine(toast.machine, composedProps);
  const api = toast.connect(service, normalizeProps);

  return (
    <div {...api.getRootProps()}>
      <div className="wrapper-content">
        <div {...api.getTitleProps()}>{api.title}</div>
        <div {...api.getDescriptionProps()}>{api.description}</div>
      </div>
    </div>
  );
};

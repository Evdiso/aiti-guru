import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine, Portal } from "@zag-js/react";
import { useId, type PropsWithChildren } from "react";
import type { OpenChangeDetails } from "@zag-js/dialog";
import styles from "./styles.module.css";
type ModalProps = {
  open: boolean;
  closeOnInteractOutside?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (details: OpenChangeDetails) => void;
};

export const Modal = ({
  children,

  ...props
}: PropsWithChildren<ModalProps>) => {
  const service = useMachine(dialog.machine, {
    role: "dialog",
    open: props.open,
    id: useId(),
    onOpenChange: props.onOpenChange,
    closeOnInteractOutside: props.closeOnInteractOutside,
    closeOnEscape: props.closeOnEscape,
  });

  const api = dialog.connect(service, normalizeProps);

  return (
    <Portal>
      <div className={styles.backdrop} {...api.getBackdropProps()} />
      <div className={styles.positioner} {...api.getPositionerProps()}>
        <div className={styles.content} {...api.getContentProps()}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

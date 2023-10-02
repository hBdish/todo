import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface DndPreviewPortalProps {
  children: ReactNode;
  display: boolean;
}

const createDndElement = () => {
  const el = document.createElement("div");
  el.className = "dnd-item";
  return el;
};

export const DndPreviewPortal = ({
  children,
  display,
}: DndPreviewPortalProps) => {
  const el = useRef(createDndElement()).current;
  useEffect(() => {
    display ? document.body.appendChild(el) : document.body.removeChild(el);
  }, [display, el]);

  useEffect(() => {
    return () => {
      document.body.removeChild(el);
    };
  }, [el]);

  if (!display) {
    return null;
  }

  return createPortal(children, el);
};

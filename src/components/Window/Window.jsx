import { useRef } from "react";
import Draggable from "react-draggable";

function Window({
  id,
  title,
  x,
  y,
  z,
  active,
  onFocus,
  onClose,
  onMoveStop,
  children,
}) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      defaultPosition={{ x, y }}
      onStart={() => onFocus(id)}
      onStop={(e, data) => onMoveStop(id, data.x, data.y)}
    >
      <div
        ref={nodeRef}
        style={{ zIndex: 2000 + z, position: "absolute" }}
        className="w-250 bg-[#132135] text-white border-4 border-white/50 rounded-md shadow-md"
        onMouseDown={() => onFocus(id)}
      >
        <div className="window-titlebar bg-[#171717] flex items-center justify-between px-3 py-2 border-b rounded-t-md border-black/10 select-none">
          <div className="font-semibold text-sm text-white">{title}</div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              className="text-xs px-2 py-1 rounded bg-black/10 hover:bg-black/20"
            >
              X
            </button>
          </div>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </Draggable>
  );
}

export default Window;

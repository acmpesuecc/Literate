import { useEffect, useRef } from "react";

const itemStyle = {
  padding: "6px 8px",
  borderRadius: "5px",
  cursor: "pointer",
};
export default function Menu({ top, left, onClose, onHighlight }) {
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top,
        left,
        background: "#1e1e1e",
        color: "#fff",
        borderRadius: "8px",
        padding: "8px",
        width: "180px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        zIndex: 1000,
      }}
    >
      <div style={{ fontSize: "12px", opacity: 0.6, marginBottom: "6px" }}>
        Actions
      </div>

      <div
        style={itemStyle}
        onClick={() => {
          onHighlight();
          onClose();
        }}
      >
        Highlight
      </div>

      <div
        style={itemStyle}
        onClick={() => {
          navigator.clipboard.writeText(window.getSelection().toString());
          onClose();
        }}
      >
        Copy
      </div>
    </div>
  );
}

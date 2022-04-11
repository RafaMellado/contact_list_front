import React from "react";

import "./Styles/Content.css";

interface ContentProps {
  children: React.ReactChild;
}

export function Content({ children }: ContentProps) {
  return <div className="content">{children}</div>;
}

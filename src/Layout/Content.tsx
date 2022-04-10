import React from "react";
import { Container } from "react-bootstrap";

interface ContentProps {
  children: React.ReactChild;
}

export function Content({ children }: ContentProps) {
  return (
    <Container>
      <div>{children}</div>
    </Container>
  );
}

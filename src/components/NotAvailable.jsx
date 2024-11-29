import React from "react";
import styled from "styled-components";

export default function NotAvailable() {
  return (
    <Container>
      <div className="uh-oh not-available">
        <h1>No movies available for selected genre.</h1>
      </div>
    </Container>
  );
}

const Container = styled.div``;

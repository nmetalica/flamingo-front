import React from "react"

import styled from 'styled-components'

const StyledDiv = styled.div`
  height: calc(100vh - 4rem);
`;

const Page = ({ children }) => (
  <StyledDiv className="overflow-auto">
    {children}
  </StyledDiv>
)

export default Page;

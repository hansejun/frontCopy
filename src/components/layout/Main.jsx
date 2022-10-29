import styled from "styled-components";

function Main({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Main;

const Wrapper = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px; /* 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    height: 20%; /* 스크롤바의 길이 */
    background: rgba(0, 0, 0, 0.2); /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: inherit;
  }
`;

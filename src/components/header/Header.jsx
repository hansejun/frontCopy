import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FlexAlignBox, FlexCenterBox } from "../../shared/styles/flex";
import BellSvg from "../../static/svg/BellSvg";
import BottomArrowSvg from "../../static/svg/BottomArrowSvg";
import ListSvg from "../../static/svg/ListSvg";
import Magnify from "../../static/svg/Magnify";

function Header({ title, isHome = false }) {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <nav>
        <RightNavItem style={{ top: 3 }}>
          {title}
          {isHome ? <BottomArrowSvg /> : null}
        </RightNavItem>

        <LeftNavItem>
          <li>
            <Magnify />
          </li>
          <li onClick={() => navigate("/categories")}>
            <ListSvg />
          </li>
          <li>
            <BellSvg />
          </li>
        </LeftNavItem>
      </nav>
    </Wrapper>
  );
}
export default Header;

const Wrapper = styled.div`
  width: 100%;
  max-width: 425px;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor.lightGray};
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 1rem;
  }
`;

const LeftNavItem = styled.ul`
  display: flex;
  align-items: center;
  cursor: pointer;
  li {
    ${FlexCenterBox};
    margin-left: 0.7rem;
    &:hover {
      color: ${(props) => props.theme.fontColor.lightGray};
    }
  }
  svg {
    width: 1.8rem;
  }
  li:first-child svg {
    width: 1.5rem;
  }
`;

const RightNavItem = styled.span`
  ${FlexAlignBox};
  position: relative;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
  transition: color 0.2s linear;
  &:hover {
    color: ${(props) => props.theme.fontColor.lightGray};
  }
  svg {
    width: 1.2rem;
    margin-top: -0.1rem;
    margin-left: 0.3rem;
  }
`;

import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { queryClient } from "../..";
import { toggleWish } from "../../apis/query/postApi";
import Button from "../../elements/Button";
import { FlexAlignBox } from "../../shared/styles/flex";
import EmptyHeartSvg from "../../static/svg/EmptyHeartSvg";
import HeartSvg from "../../static/svg/HeartSvg";

// 채팅방 ID 받아야함
function PriceFooter({ post, id }) {
  const navigate = useNavigate();
  const { mutate: toggleWishFn } = useMutation(() => toggleWish(id), {
    onSuccess: () => queryClient.invalidateQueries(["posts", "detail"]),
  });
  return (
    <Wrapper>
      <FooterContainer isWish={post.isWish}>
        <div>
          <span onClick={toggleWishFn}>
            {post.isWish ? <HeartSvg /> : <EmptyHeartSvg />}
          </span>
          <strong>{post?.price}원</strong>
        </div>
        <Button _onClick={() => navigate("/chats/1")}>채팅하기</Button>
      </FooterContainer>
    </Wrapper>
  );
}
export default PriceFooter;

PriceFooter.defaultProps = {
  _onClick: () => {},
};

const Wrapper = styled.div`
  width: 100%;
  ${FlexAlignBox}
`;

const FooterContainer = styled.div`
  padding: 0 1rem;
  ${FlexAlignBox};
  justify-content: space-between;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 60px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);

  div {
    ${FlexAlignBox};
    span {
      padding-right: 1rem;
      border-right: 1px solid ${(props) => props.theme.borderColor.gray};
      cursor: pointer;
      &:hover {
        svg {
          color: ${(props) =>
            props.isWish
              ? props.theme.btnColor.darkOrange
              : props.theme.fontColor.black};
        }
      }
    }
    svg {
      width: 1.5rem;
      color: ${(props) =>
        props.isWish
          ? props.theme.btnColor.orange
          : props.theme.fontColor.lightGray};
    }
    strong {
      padding-left: 1rem;
      font-weight: 600;
      font-size: 1.2rem;
    }
  }
  /* @media (max-width: 400px) {
    height: 90px;
    padding-bottom: 20px;
  } */
`;

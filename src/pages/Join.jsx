import React, { useState } from "react";
import DetailHeader from "../components/header/DetailHeader";
import Layout from "../components/layout/Layout";
import { set, useForm } from "react-hook-form";
import Footer from "../components/footer/Footer";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { emailDup, nicknameDup, signUp } from "../apis/query/userApi";
import LocationModal from "../components/modal/LocationModal";
import { AnimatePresence } from "framer-motion";
import { useRecoilState } from "recoil";
import { showLocationAtom } from "../shared/atoms/modalAtoms";
import getLocation from "../utils/getLocation";
import Swal from "sweetalert2";

/* 배포 URL / 인스턴스 IP주소 */

const Join = () => {
  const navigate = useNavigate();
  const [dups, setDups] = useState({ nickname: false, email: false });
  const [locationId, setLocationId] = useState(0);
  const [showLocation, setShowLocation] = useRecoilState(showLocationAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    setFocus,
  } = useForm();

  const onSubmit = async (inputs) => {
    if (inputs.password !== inputs.confirm) {
      setError(
        "confirm",
        { message: "비밀번호가 일치하지 않습니다" },
        { shouldFocus: true }
      );
      return;
    }

    try {
      const response = await signUp({
        ...inputs,
        locationId,
      });
      if (response.data.ok) {
        alert(response.data.message);
        return navigate("/login");
      } else {
        alert(response.data.message);
        return;
      }
    } catch (e) {
      return Swal.fire({
        title: "회원가입 실패",
        confirmButtonColor: "#ff6f06",
        icon: "error",
        confirmButtonText: "확인",
        width: 320,
      });
    }
  };

  const onEmailDup = async (e) => {
    e.preventDefault();
    const reg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    const email = watch("email");
    const testing = reg.test(email);
    try {
      if (!testing) {
        setFocus("email");
        return alert("이메일을 확인해주세요");
      }
      const response = await emailDup({ email });
      if (response.data.ok) {
        alert(response.data.message);
        setDups((prev) => ({ ...prev, nickname: true }));
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      console.log(e);
      return Swal.fire({
        text: "이미 사용 중인 이메일입니다",
        confirmButtonColor: "#ff6f06",
        icon: "warning",
        confirmButtonText: "확인",
        width: 320,
      });
    }
  };

  const onNicknameDup = async (e) => {
    e.preventDefault();
    const nickname = watch("nickname");
    try {
      const response = await nicknameDup({ nickname });
      if (response.data.ok) {
        alert(response.data.message);
        setDups((prev) => ({ ...prev, nickname: true }));
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      console.log(e);
      return Swal.fire({
        text: "이미 사용 중인 닉네임입니다",
        confirmButtonColor: "#ff6f06",
        icon: "warning",
        confirmButtonText: "확인",
        width: 320,
      });
    }
  };

  return (
    <Layout>
      <DetailHeader title={"회원가입"} />
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>회원정보를 설정해주세요</h1>
          <label>이메일</label>
          <Email>
            <Input
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                  message: "잘못된 이메일 형식입니다",
                },
              })}
              placeholder="Email"
            />
            <DupButton onClick={onEmailDup}>Check</DupButton>
          </Email>
          <span>{errors.email?.message}</span>
          <label>비밀번호</label>
          <Inputs
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: /^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,16}$/,
                message: "최소 8자 최대 16자의 비밀번호를 입력해주세요",
              },
            })}
            type="password"
            placeholder="Password"
          />
          <span>{errors.password?.message}</span>
          <label>비밀번호 확인</label>
          <Inputs
            {...register("confirm", {
              required: "비밀번호 확인을 입력해주세요",
            })}
            type="password"
            placeholder="Confirm Password"
          />
          <span>{errors.confirm?.message}</span>
          <label>동네 설정</label>
          <SelectTown onClick={() => setShowLocation(true)}>
            <Blank>
              {locationId === 0 ? "동네 설정" : getLocation(locationId)}
            </Blank>
            <SelectButton>
              <IoIosArrowDown />
            </SelectButton>
          </SelectTown>
          <label>닉네임</label>
          <Nickname>
            <Input
              {...register("nickname", {
                required: "닉네임을 10자 이내로 입력해주세요",
              })}
              placeholder="NickName"
              maxLength="10"
            />
            <DupButton onClick={onNicknameDup}>Check</DupButton>
          </Nickname>
          <span>{errors.nickname?.message}</span>
          {watch("email") === "" &&
          watch("password") === "" &&
          watch("confirm") === "" &&
          watch("nickname") === "" ? (
            <Button style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              로그인
            </Button>
          ) : (
            <Button style={{ backgroundColor: "#ff6f06" }}>로그인</Button>
          )}
        </div>
      </JoinForm>
      <Footer />
      <AnimatePresence>
        {showLocation ? <LocationModal setLocation={setLocationId} /> : null}
      </AnimatePresence>
    </Layout>
  );
};

export default Join;

const JoinForm = styled.form`
  padding: 0 2rem;
  width: 100%;
  overflow-x: hidden;
  margin: auto 0;

  & > div {
    display: flex;
    flex-direction: column;
  }

  h1 {
    margin-bottom: 1.5rem;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
  }

  label {
    margin-top: 0.7rem;
    margin-bottom: 0.5rem;
    padding: 0 0.4rem;
  }
  span {
    width: 83%;
    margin-top: 5px;
    padding: 0 0.4rem;
    color: #fb3131;
    font-size: 0.8rem;
  }

  overflow: hidden;
`;

const Inputs = styled.input`
  width: 100%;
  height: 4vh;
  margin: 0 auto;
  padding: 0.8rem 1rem;
  font-size: 15px;
  border: 1px solid ${(props) => props.theme.fontColor.lightGray};
  border-radius: 10px;
  &:focus {
    border-color: #fb3131;
  }
`;

const Input = styled.input`
  padding: 0 1rem;
  height: 4vh;
  border-radius: 9px 9px 9px 9px;
  border: white;
  font-size: 15px;
  width: 98%;
  border: 1px solid ${(props) => props.theme.fontColor.lightGray};
  &:focus {
    border: 1px solid #fb3131;
  }
`;

const Button = styled.button`
  border-radius: 10px;
  width: 100%;
  height: 6vh;
  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 10px;
  color: white;
  font-size: 18px;
`;

const Email = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px;
  border-radius: 10px;
`;

const DupButton = styled.button`
  background-color: #ff6f06;
  border-radius: 5px;
  /* line-height: 1.2; */
  width: 100%;
  height: 4vh;
  color: white;
  border-radius: 9px 9px 9px px;
  /* margin: 5px 5px 5px -5px; */
`;

const Nickname = styled(Email)``;

const Blank = styled.div`
  background-color: white;
  border-radius: 5px;
  border-radius: 10px 5px 5px 10px;
  width: 100%;
  margin: 0 auto;
  height: 4vh;
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  font-size: 15px;
`;

const SelectTown = styled(Email)`
  border: 1px solid ${(props) => props.theme.fontColor.lightGray};
  &:focus {
    border-color: #fb3131;
  }
  margin-bottom: 0.25rem;
`;

const SelectButton = styled.button``;

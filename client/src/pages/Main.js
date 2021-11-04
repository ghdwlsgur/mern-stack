import React from 'react';
import styled from 'styled-components';
import MainDescription1 from 'assests/MainBoard.png';
import MainDescription2 from 'assests/MainBoard2.png';
import MainDescription3 from 'assests/MainBoard3.png';

const Main = () => {
  return (
    <>
      <MainTitle>
        세상 모든 개발자의, 경영학과를 졸업한 신입개발자에 의한, 웹개발자를 위한
        웹사이트
      </MainTitle>
      <MainBox>
        <MainImg src={MainDescription1} />
        <MainImg2 src={MainDescription2} />
        <MainImg3 src={MainDescription3} />
      </MainBox>
    </>
  );
};

export default Main;

const MainTitle = styled.h2`
  font-size: 25px;
  font-weight: 500;
  color: gray;
  width: 1000px;
  margin-bottom: 20px;
  margin-left: 200px;
  text-shadow: 2px 3px 4px gray;
`;

const MainImg = styled.img`
  width: 600px;
  height: 600px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const MainImg2 = styled.img`
  width: 600px;
  height: 600px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 100;
  position: relative;
  top: 80px;
  left: -300px;
`;

const MainImg3 = styled.img`
  width: 600px;
  height: 600px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 101;
  position: relative;
  top: 0px;
  left: -400px;
`;

const MainBox = styled.div`
  display: flex;
`;

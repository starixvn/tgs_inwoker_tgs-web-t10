import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import { AppHistory } from "../../../../history/History";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 1280px;
  color: #fff;
  padding: 40px 0;
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const Image = styled.img`
  height: auto;
  max-width: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.3s;
  z-index: 1;
  border-radius: 13px;
  display: none;
`;

const ImageHolder = styled.div`
  position: relative;
  cursor: pointer;
  :hover{
    ${Overlay}{ 
  
      display: block;
       
  }
`;

const CustomButton = styled.div`
  background: ${({ theme }) => theme.primary};
  width: max-content;
  color: #000;
  padding: 10px 20px;
  position: absolute;
  left: 45%;
  bottom: 20px;
  border-radius: 10px;
`;

const data = ["1-1", "1-2"];

const ImageComponent = ({ data }) => {
  return (
    <ImageHolder>
      <Image
        src={process.env.PUBLIC_URL + `/assets/images/pcHomePage/${data}.png`}
        alt={data}
      />
      <Overlay>
        <CustomButton
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            AppHistory.push(`/slots`);
          }}
        >
          {i18n.t("withdrawal.checkDetails")}
        </CustomButton>
      </Overlay>
    </ImageHolder>
  );
};

const AnotherFirstSection = () => {
  return (
    <ScrollAnimation animateIn="fadeInUp" duration={1} animateOnce={true}>
      <Container>
        <Content>
          <ImageWrapper>
            {data.map((data, index) => {
              return <ImageComponent data={data} key={index} />;
            })}
          </ImageWrapper>
        </Content>
      </Container>
    </ScrollAnimation>
  );
};

export default AnotherFirstSection;

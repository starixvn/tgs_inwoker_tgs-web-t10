import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import styled from "styled-components";

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
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.3s;
  z-index: 1;
  border-radius: 13px;
`;

const ImageHolder = styled.div`
  position: relative;
  cursor: pointer;
  :hover{
    ${Overlay}{ 
        background-color: rgba(0, 0, 0, 0.5);
  }
`;

const data = ["1-1", "1-2"];

const ImageComponent = ({ data }) => {
  return (
    <ImageHolder>
      <Image
        src={process.env.PUBLIC_URL + `/assets/images/pcHomePage/${data}.png`}
        alt={data}
      />
      <Overlay />
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

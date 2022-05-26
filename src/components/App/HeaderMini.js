// import React from "react";

// import styled from "styled-components";
// import "react-sticky-header/styles.css";
// import StickyHeader from "react-sticky-header";
// import { withRouter } from "react-router-dom";
// import { Link } from "react-router-dom";
// import LogoPNG from "../../assets/images/logo.png";

// const Container = styled.div`
//   background-image: linear-gradient(to top, #060d0f, #1b213f, #29356c);
//   height: 100px;
//   position: relative;
//   overflow: visible;
// `;
// const InnerWrap = styled.div`
//   margin: 0 auto;
//   width: 1280px;
//   font-size: 14px;
// `;

// const CustomLink = styled(Link)`
//   color: #f6f6f6;

//   &:hover {
//     color: #fde73f;
//     text-decoration: underline;
//   }
// `;

// const BottomContainer = styled.div`
//   height: 103px;
// `;
// const LogoContainer = styled.div`
//   float: left;
//   height: 100%;
//   display: table;
// `;
// const CustomLogoLink = styled(CustomLink)`
//   vertical-align: middle;
//   display: table-cell;
// `;

// function HeaderMini() {
//   return (
//     <StickyHeader
//       headerOnly={true}
//       header={
//         <Container>
//           <InnerWrap>
//             <BottomContainer>
//               <LogoContainer>
//                 <CustomLogoLink to="/">
//                   <img src={LogoPNG} alt=""></img>
//                 </CustomLogoLink>
//               </LogoContainer>
//             </BottomContainer>
//           </InnerWrap>
//         </Container>
//       }
//     ></StickyHeader>
//   );
// }

// export default withRouter(HeaderMini);

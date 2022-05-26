import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";

import config from "../../config/config";
import i18n from "../../utils/i18n";

const Container = styled.div`
  width: 100%;

  display: ${({ hide }) => {
    return hide ? "none" : "block";
  }}
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
`;

const MiddleContainer = styled.div`
  padding: 20px 0;
  width: 100%;
  border-bottom: solid 1px ${(props) => props.theme.primaryGradient};
  border-top: solid 1px ${(props) => props.theme.primaryGradient};
`;
const MiddleInnerWrap = styled.div`
  display: block;
  margin: 0 auto;
  width: 1280px;
  overflow-x: auto;
`;

const BottomContainer = styled.div`
  height: 70px;
  width: 1280px;
  padding-top: 16px;
  margin: 0 auto;
  color: #f6f6f6;
`;
const CopyRightLine1 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const CopyRightLine2 = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;
const Version = styled.span`
  font-size: 12px;

  margin: 0 auto;
  display: block;
  text-align: center;
`;

const BrandsImage = styled.div`
  opacity: 1;
  height: 80px;
  width: 150px;
  background: url(${(props) => props.img}) no-repeat center;
  background-size: contain;
`;

const ThirdPartyLogoHolder = styled.div`
  display: flex !important;
  justify-content: center;
  width: 150px;
`;
const settings = {
  className: "footer",
  dots: false,
  arrows: false,
  slidesToShow: 6,
  slidesToScroll: 6,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
  cssEase: "linear",

  infinite: true,
};
function Footer(props) {
  return (
    <Container hide={props.hide}>
      {/*     
      <InnerWrap>
        <TopContainer>
          <TopLeftContainer>
            <TopLeftContent>
              <TopLeftContentTopContainer>
                <RestricContainer>
                  <RestricImage src={FooterHandIconPNG}></RestricImage>
                  <RestricImage src={FooterArrowIconPNG}></RestricImage>
                  <RestricImage src={Footer18plusIconPNG}></RestricImage>
                </RestricContainer>
              </TopLeftContentTopContainer>
              <TopLeftContentBottomContainer language={i18n.language}>
                {i18n
                  .t("web.footer.cautionText")
                  .replace(/{brand}/g, config.brand)}
              </TopLeftContentBottomContainer>
            </TopLeftContent>
          </TopLeftContainer>
          <TopCenterContainer>
            <FooterATag
              onClick={() => {
                AppHistory.push("/" + i18n.language + "/download");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <FooterColumn>
                <FooterIcon1></FooterIcon1>
                <FooterLabelCotanier>
                  {i18n.t("web.footer.appDownload")}
                  <br />
                  {i18n.t("web.footer.appDownloadLine2")}
                </FooterLabelCotanier>
              </FooterColumn>

              <QRContainerVisit>
                <QRImg>
                  <QRCode
                    value={`${window.location.protocol}//${window.location.hostname}`}
                    size={70}
                  />
                </QRImg>
                <QRRedTitle>{i18n.t("web.footer.wapQRCodeDesc")}</QRRedTitle>
              </QRContainerVisit>

              <QRContainerVisit>
                <QRDownloadImg
                  src={`${process.env.PUBLIC_URL}/assets/images/qrcode/appdownload-qr-soon.png`}
                >
                  {i18n.t("common.comingSoon")}
                </QRDownloadImg>
                <QRRedTitle>{i18n.t("web.footer.appQRCodeDesc")}</QRRedTitle>
              </QRContainerVisit>
            </FooterATag>
          </TopCenterContainer>
          <TopRightContainer>
            <AffContainer onClick={() => alert(i18n.t("common.comingSoon"))}>
              <AffImg img={FooterAffIconPNG}></AffImg>
              <AffCSRightContent
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <AffRightContentLine1>
                  {i18n.t("web.footer.affiliateCampaign")}
                </AffRightContentLine1>
                <AffRightContentLine2>
                  {i18n.t("web.footer.affiliateCampaignLine2")}
                </AffRightContentLine2>
              </AffCSRightContent>
            </AffContainer>
            <CSContainer>
              <CSImg img={Footer24CSIconPNG}></CSImg>
              <AffCSRightContent
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <AffCSRightContentLine1>
                  {i18n.t("common.csPhoneNumber")}
                </AffCSRightContentLine1>
                <AffCSRightContentLine2>
                  {i18n.t("web.footer.customerServiceHotline")}
                </AffCSRightContentLine2>
              </AffCSRightContent>
            </CSContainer>
          </TopRightContainer>
        </TopContainer>
      </InnerWrap> */}

      <MiddleContainer>
        <MiddleInnerWrap>
          <Slider {...settings}>
            {(() => {
              return props.game.providerList
                .filter(
                  (a) =>
                    a.abbreviation.toLowerCase() !== "wgfm" &&
                    a.abbreviation.toLowerCase() !== "wgvia"
                )
                .filter((gp) => {
                  if (gp.abbreviation.includes("TCG")) {
                    return gp.abbreviation === "TCG_SEA";
                  } else {
                    return gp;
                  }
                })
                .map((item, index) => {
                  return (
                    <ThirdPartyLogoHolder>
                      <BrandsImage
                        img={
                          process.env.PUBLIC_URL +
                          `/assets/images/provider/${item.abbreviation.toLowerCase()}.png`
                        }
                      />
                    </ThirdPartyLogoHolder>
                  );
                });
            })()}
          </Slider>
          {/* <ProductUL>
           
            <ProductLI>
              <ProductImg src={Provider1PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider2PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider3PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider4PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider5PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider6PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider7PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider8PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider9PNG}></ProductImg>
            </ProductLI>
            <ProductLI>
              <ProductImg src={Provider10PNG}></ProductImg>
            </ProductLI> 
          </ProductUL>*/}
        </MiddleInnerWrap>
      </MiddleContainer>
      <BottomContainer>
        <CopyRightLine1>{i18n.t("web.footer.copyright")}</CopyRightLine1>
        <CopyRightLine2>
          {i18n
            .t("web.footer.copyrightLine2")
            .replace(/{brand}/g, config.brandName)}
        </CopyRightLine2>
        <Version>Version {process.env.REACT_APP_VERSION}</Version>
      </BottomContainer>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return {
    game: state.game,
  };
};
export default connect(mapStateToProps, null)(withRouter(Footer));

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Component representing the header section of the certificate.
 *
 * @component
 * @returns {JSX.Element} - The rendered CertificateHeader component.
 */
const CertificateHeader = () => {
  return (
    <div>
      <CertificateHeaderWrapper>
        <LogoContainer>
          <Image src="/flag.webp" alt="South Sudan Flag logo" />
        </LogoContainer>

        <TextContainer>
          <h2>Republic of South Sudan</h2>
          <h2>Ministry of Health</h2>
          <h2>Birth Notifications Certificate</h2>
        </TextContainer>

        <MinistryLogoContainer>
          <Image src="/ministry.jpg" alt="Ministry of Health logo" />
        </MinistryLogoContainer>
      </CertificateHeaderWrapper>
    </div>
  );
};

CertificateHeader.propTypes = {};

export default CertificateHeader;

const CertificateHeaderWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 50%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TextContainer = styled.div`
  text-align: center;
  color: black.900;
`;

const MinistryLogoContainer = styled.div`
  width: 50%;
  height: 150px;
  overflow: hidden;
`;

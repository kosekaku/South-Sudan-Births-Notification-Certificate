import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import QRCode from "qrcode.react";
import { attributesData } from "../../helpers/attributesData";

const CertificateQrcCode = ({ data }) => {
  if (!data) return <p>undefined</p>;

  const {
    fullNames,
    motherName,
    fatherName,
    dateOfBirth,
    placeOfBirth,
    natureOfBirth,
    gender,
  } = (data && attributesData(data)) || {};

  const url = window.location.origin;

  const checkUndefined = (data) => (data ? data : "");

  return (
    <div>
      <StyledSpan>Scan to Validate</StyledSpan>
      <QRCodeContainer>
        <QRCode
          value={`
            Identification number: ${checkUndefined(data.trackedEntityInstance)}
            Full name: ${checkUndefined(fullNames)}
            Date of Birth: ${checkUndefined(dateOfBirth)}
            Gender: ${checkUndefined(gender)}
            Mother Name: ${checkUndefined(motherName)}
            Father Name: ${checkUndefined(fatherName)}
            Nature of Birth: ${checkUndefined(natureOfBirth)}
            Place of Birth: ${checkUndefined(placeOfBirth)}
  
            ${url}
          `}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          imageSettings={{
            src: "/ministry.jpg",
            x: null,
            y: null,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </QRCodeContainer>
      <div style={{ textAlign: "center" }}>
        <StyledParagraph>
          This document is digitally generated by the Ministry of Health and
          therefore does not require a signature.
        </StyledParagraph>
        <StyledParagraph>
          You may confirm this certificate by scanning the QR code.
        </StyledParagraph>
      </div>
    </div>
  );
};

CertificateQrcCode.propTypes = {
  data: PropTypes.object,
};

export default CertificateQrcCode;

const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0% 47% 1% 45%;
`;

const StyledSpan = styled.span`
  padding-top: 2%;
  margin-left: 45%;
`;

const StyledParagraph = styled.p`
  text-align: center;
`;

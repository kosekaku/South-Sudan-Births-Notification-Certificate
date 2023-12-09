import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import CertificateBio from "./CertificateBio";
import CertififcateHeader from "./CertificateHeader";
import CertificateQrcCode from "./CertificateQrcCode";
import { useReactToPrint } from "react-to-print";
import { Button } from "@dhis2/ui";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/**
 * Component representing the main certificate view.
 *
 * @component
 * @returns {JSX.Element} - The rendered MainCertificate component.
 */
const MainCertificate = React.forwardRef((_, ref) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const [teiData, setTeiData] = useState();

  /**
   * Effect hook to fetch data when the component mounts.
   */
  useEffect(() => {
    if (state === null) {
      // Request data from api if TrackedInstance is valid
      // Load data and render them,
      // Print results
    }
    setTeiData(state);
  }, [state]);

  /**
   * React-to-print hook for handling the print action.
   */
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `births-notification-certificate-${teiData?.trackedEntityInstance}`,
    // onAfterPrint: printsTracking,
  });

  const borderColors = {
    red: "#da121a",
    white: "#ffffff",
    green: "#078930",
    yellow: "#fcdd09",
    blue: "#0f47af",
  };

  return (
    <div className="black-border">
      <div>
        <Button
          className="btn btn-secondary"
          large
          secondary
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
        <Button
          className="btn btn-secondary"
          large
          secondary
          onClick={handlePrint}
        >
          Print
        </Button>
      </div>
      <div className="white-border" ref={componentRef}>
        {/*red border*/}
        <div style={{ border: `1px solid ${borderColors.red}` }}>
          {/*white border*/}
          <div style={{ border: `1px solid ${borderColors.white}` }}>
            {/*green border*/}
            <div style={{ border: `1px solid ${borderColors.green}` }}>
              {/*yellow border*/}
              <div style={{ border: `1px solid ${borderColors.yellow}` }}>
                {/*blue border*/}
                <div style={{ border: `1px solid ${borderColors.blue}` }}>
                  <CertififcateHeader />
                  <CertificateBio data={teiData} />
                  <CertificateQrcCode data={teiData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MainCertificate;

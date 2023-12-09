import React, { useEffect, useState } from "react";
import {
  OrganisationUnitTree,
  Button,
  Box,
  AlertBar,
  DataTable,
  TableHead,
  DataTableRow,
  DataTableColumnHeader,
  TableBody,
  DataTableCell,
  TableFoot,
  Divider,
  Card,
  InputField,
} from "@dhis2/ui";
import PropTypes from "prop-types";
import ModalCard from "./Modal";
import { dhisDates } from "../utils/dhisDates";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { PeriodCalendar } from "./Calendar";

import { ROOT_OU } from "../utils/constants/program";
import { useData } from "../hooks/useData";
import {
  PAGE_SIZE,
  FONT_SIZE_DEFAULT,
  HEIGHT_BOX,
  PADDING_ITEM,
  WIDTH_BOX,
} from "../utils/constants/styles";
import Loader from "./commons/Loader";
import { useNavigate } from "react-router";
import { teiDataLocal } from "../data/data";
import { attributesData } from "../helpers/attributesData";
import Pagination from "./Paginations";
import { paginationCalculation } from "../utils/paginations";

const Home = () => {
  // initizations
  const navigate = useNavigate();

  // states
  const [organisationUnit, setOrganisationUnit] = useState(null);
  const [isOuSelected, setIsOuSelected] = useState(false);
  const [isPeriod, setIsPeriodSelected] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [generateReport, setGenerateReport] = useState(false);

  //   const [teiData, setTeiData] = useState(
  //     teiDataLocal?.trackedEntityInstances || []
  //   );
  const [teiData, setTeiData] = useState([]);
  // TODO replace current state default with [] and update any[] types to trackedInstanceProps- current data is for testing purpose to reduce internet connections band width
  // filtered data
  const [filteredData, setFilteredData] = useState(teiData); // default not filtered data

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");

  // Show navigate back button if filtered data is empty
  const [showNavigatBack, setShowNavigatBack] = useState(false);

  // Paginations starts...
  const [currentPage, setCurrentPage] = useState(1);

  // pagination data
  const {
    currentPageItems: paginatedData,
    totalItemsPages: totalPages,
    totalItems: totalTeis,
    totalPageItems,
  } = paginationCalculation(filteredData, PAGE_SIZE, currentPage);

  const handlePageChange = (newPage) => {
    // If the user requests a page beyond the initially fetched data
    // TODO FIX- when users finish seeing the initial data, fetch the remaining data from the server
    if (newPage * PAGE_SIZE > totalTeis && paginatedData.length <= 1) {
      // Fetch new data
      refetch({
        lastUpdatedEndDate: selectedEndDate,
        organisationUnit: organisationUnit?.id || ROOT_OU,
        startDate: dhisDates(selectedStartDate),
        endDate: dhisDates(selectedEndDate),
        page: newPage,
      });
    }

    return setCurrentPage(newPage);
  };
  // Paginations ends...

  // TODO get OU, periods from the user before making calls
  const { loading, error, data, refetch } = useData(
    organisationUnit,
    selectedStartDate,
    selectedEndDate
    // currentPage
  );
  const totalDataValues = 1000; // TODO get them from the APIs
  useEffect(() => {
    // Call refetch with the data(OU, period) from user selections
    if (
      generateReport !== false &&
      organisationUnit !== null
      //     &&
      //   selectedStartDate !== null &&
      //   selectedEndDate !== null
    ) {
      // TODO add OU and period to conditional fetching startDate !== null && organisationUnit !== null
      // TODO App runtime unauthorized when fetching data and OUs
      refetch({
        lastUpdatedEndDate: selectedEndDate,
        organisationUnit: organisationUnit?.id || ROOT_OU,
        startDate: dhisDates(selectedStartDate),
        endDate: dhisDates(selectedEndDate),
      }); // "organisationUnit" variable in the query is passed via refetch
      setGenerateReport(false);
    }
    // Confirm Tei data is available or not
    if (!loading && !error && data) {
      setTeiData(data?.programs?.trackedEntityInstances);
      // Set the initial filtered data to be the same as the current data since user has not started filtereing in the search box
      setFilteredData(data?.programs?.trackedEntityInstances);
    }
  }, [
    data,
    error,
    generateReport,
    loading,
    organisationUnit,
    refetch,
    selectedEndDate,
    selectedStartDate,
  ]);

  const handleOrganizationUnit = (ou) => {
    // set the OU display name and id selected
    setIsOuSelected(false);
    setOrganisationUnit(ou);
  };

  const handlePeriodSelection = () => {
    setIsPeriodSelected(false);
  };
  // Cancel modal for all OU and Period selection
  const handleCancelModal = () => {
    setIsOuSelected(false);
    setIsPeriodSelected(false);
  };
  const handleGenerateReport = () => {
    // Implement logic at useEffect to fetch data for the selected OU, period, and programs
    // Generate report initiated and generateReport state is checked at useEffect
    setGenerateReport(true);
  };

  if (loading) return <Loader />;
  if (error)
    return (
      <AlertBar permanent danger duration={100}>
        {`Error! ${error?.message}`}
      </AlertBar>
    );

  const handleUserClick = ({
    trackedEntityInstance, // Used for prints confirmation
    orgUnit,
    attributes,
  }) => {
    navigate("/certificate", {
      state: { trackedEntityInstance, orgUnit, attributes },
    });
  };

  const handleSearch = async ({ value }) => {
    // TODO
    // Implement logic for searching with DHIS2 event API based on searchTerm, orgUnit, and period
    // Make an additional API call to retrieve data based on the search criteria or if previously fetched data is not found
    // Update the filteredData state with the new search results

    setSearchTerm(value.trim());
    // Optional chaining is supported
    const filteredData = teiData?.filter(({ attributes, orgUnit }) => {
      const data = { attributes, orgUnit };

      const {
        fullNames,
        motherName,
        dateOfBirth,
        placeOfBirth,
        natureOfBirth,
        gender,
        others,
      } = attributesData(data);

      const searchableAttributes = [
        fullNames,
        motherName,
        dateOfBirth,
        placeOfBirth,
        natureOfBirth,
        gender,
        others,
      ];

      // Check if any attribute contains the search term
      return searchableAttributes.some((attribute) =>
        attribute.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    // update a state of filtered search data

    setFilteredData(filteredData);
    // Show back nvaigaiton when filtered data is empty
    filteredData.length != 0 && setShowNavigatBack(true);
  };

  return (
    <div>
      <div style={{ padding: PADDING_ITEM }}>
        <Box height={HEIGHT_BOX} padding={PADDING_ITEM} width="100%">
          <Card>
            <Button
              name="ouSelection"
              onClick={() => setIsOuSelected(true)}
              value="default"
            >
              Organization Unit Selection
            </Button>
            <Button
              name="periodSelection"
              onClick={() => setIsPeriodSelected(true)}
              value="default"
            >
              Period
            </Button>

            <Button
              name="generateReport"
              onClick={handleGenerateReport}
              value="default"
              //disabled
            >
              Generate Report
            </Button>
          </Card>
        </Box>
        <Divider />
        {generateReport &&
          (organisationUnit === null ||
            selectedStartDate === null ||
            selectedEndDate === null) && (
            <AlertBar permanent warning duration={100}>
              Please select Facility name or dates to generate report
            </AlertBar>
          )}

        {
          <div>
            <Box height={HEIGHT_BOX} width={WIDTH_BOX}>
              <Card>
                <div>
                  <span style={{ fontSize: FONT_SIZE_DEFAULT }}>
                    Selected Organisation Unit:{" "}
                  </span>
                  {organisationUnit
                    ? organisationUnit?.displayName
                    : "All/ South Sudan"}
                </div>
                <div>
                  <span style={{ fontSize: FONT_SIZE_DEFAULT }}>
                    Selected Dates:{" "}
                  </span>

                  {selectedStartDate && selectedEndDate
                    ? `${dhisDates(selectedStartDate)} to ${dhisDates(
                        selectedEndDate
                      )}`
                    : "All Period"}
                </div>
              </Card>
            </Box>
          </div>
        }

        <Divider />
        <div>
          {/* Search input */}

          <div style={{ display: "flex" }}>
            {teiData.length != 0 && (
              <InputField
                name="defaultName"
                inputWidth="200%"
                onChange={(e) => handleSearch(e)}
                placeholder="Search child by name, mothername, fathername, date of birth, etc"
                value={searchTerm}
              />
            )}
            {/* <Button
              name="Small button"
              onClick={handleSearch}
              medium
              value="default"
            >
              Seaerch
            </Button> */}
          </div>
        </div>

        {/* Organization units modal */}
        {isOuSelected && (
          <ModalCard
            title="Select Organization Units"
            content={
              <OrganisationUnitTree
                name="South Sudan"
                onChange={handleOrganizationUnit}
                roots={ROOT_OU}
                singleSelection={true}
              />
            }
            onSave={() => handleOrganizationUnit}
            onCancel={() => handleCancelModal}
          />
        )}
        {/* Periods modal */}

        {isPeriod && (
          <ModalCard
            title="Select Periods"
            content={
              <div>
                <PeriodCalendar
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  setSelectedStartDate={setSelectedStartDate}
                  setSelectedEndDate={setSelectedEndDate}
                />
              </div>
            }
            onSave={() => handlePeriodSelection}
            onCancel={() => handleCancelModal}
          />
        )}
        {/* Generate reports */}
        {totalTeis === 0 ? (
          <div style={{ padding: PADDING_ITEM, fontSize: FONT_SIZE_DEFAULT }}>
            <Box height={HEIGHT_BOX} width={WIDTH_BOX}>
              <Card>
                There are no data available for the current selection
                {showNavigatBack && (
                  <Button
                    small
                    onClick={() => {
                      setFilteredData(teiData);
                      setSearchTerm("");
                    }}
                  >
                    {" "}
                    {/*TODO navigate back without full page reload*/}
                    Go Back
                  </Button>
                )}
              </Card>
            </Box>

            <Divider />
          </div>
        ) : (
          <DataTable>
            <TableHead>
              <DataTableRow>
                <DataTableColumnHeader>Full Name</DataTableColumnHeader>
                <DataTableColumnHeader>Mother Name</DataTableColumnHeader>
                <DataTableColumnHeader>Date of Birth</DataTableColumnHeader>
                <DataTableColumnHeader>Nature of Birth</DataTableColumnHeader>
                <DataTableColumnHeader>Gender</DataTableColumnHeader>
                <DataTableColumnHeader>Place of Birth</DataTableColumnHeader>
                <DataTableColumnHeader>Action</DataTableColumnHeader>
              </DataTableRow>
            </TableHead>

            <TableBody loading>
              {paginatedData?.map(({ attributes, orgUnit }, index) => {
                // Use Custom helper to get the individual attribute fields like gender, age to display to the table row
                const data = {
                  attributes,
                  orgUnit,
                };
                // TODO fix any
                const {
                  fullNames,
                  motherName,
                  dateOfBirth,
                  placeOfBirth,
                  natureOfBirth,
                  gender,
                } = data !== undefined && attributesData(data);
                // return table rows here
                return (
                  <DataTableRow key={fullNames + dateOfBirth + motherName}>
                    <DataTableCell>{fullNames}</DataTableCell>
                    <DataTableCell>{motherName}</DataTableCell>
                    <DataTableCell>{dateOfBirth}</DataTableCell>
                    <DataTableCell>{natureOfBirth}</DataTableCell>
                    <DataTableCell>{gender}</DataTableCell>
                    <DataTableCell>{placeOfBirth}</DataTableCell>
                    <DataTableCell>
                      <Button
                        secondary
                        large
                        onClick={() => handleUserClick(teiData[index])}
                      >
                        View
                      </Button>
                    </DataTableCell>
                  </DataTableRow>
                );
              })}
            </TableBody>
            <TableFoot>
              {totalTeis > PAGE_SIZE && (
                <DataTableRow>
                  <DataTableCell colSpan="7">
                    {/* South Sudan Births Notification Certificate:  &copy;{ new Date().getFullYear()} .....Footer content- paginations */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalPageItems={totalPageItems(currentPage)}
                      totalDataValues={totalTeis}
                      onPageChange={handlePageChange}
                    />
                  </DataTableCell>
                </DataTableRow>
              )}
            </TableFoot>
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default Home;

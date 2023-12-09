import React from "react";
import PropTypes from "prop-types";
import { Box } from "@dhis2/ui";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";

/**
 * PeriodCalendar component for selecting start and end dates.
 *
 * @param {object} props - The component props.
 * @param {Date | null} props.selectedStartDate - The selected start date.
 * @param {Date | null} props.selectedEndDate - The selected end date.
 * @param {(value: Date) => void} props.setSelectedStartDate - Function to set the selected start date.
 * @param {(value: Date) => void} props.setSelectedEndDate - Function to set the selected end date.
 * @returns {JSX.Element} - The rendered PeriodCalendar component.
 */
export const PeriodCalendar = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}) => {
  console.log("Calender", selectedStartDate, selectedEndDate);
  return (
    <div>
      <Box height="400px" width="600px">
        <label>Select start Date: </label>
        <DatePicker
          onChange={(value) => {
            setSelectedStartDate(value);
          }}
          value={selectedStartDate}
          maxDate={new Date()}
          format="y-MM-dd"
        />

        <label>Select End Date: </label>
        <DatePicker
          onChange={(value) => {
            setSelectedEndDate(value);
          }}
          value={selectedEndDate}
          minDate={selectedStartDate ? selectedStartDate : new Date()}
          maxDate={new Date()}
          format="y-MM-dd"
        />
      </Box>
    </div>
  );
};

PeriodCalendar.propTypes = {
  selectedStartDate: PropTypes.instanceOf(Date),
  selectedEndDate: PropTypes.instanceOf(Date),
  setSelectedStartDate: PropTypes.func.isRequired,
  setSelectedEndDate: PropTypes.func.isRequired,
};

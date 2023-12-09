import React from "react";
import { Button } from "@dhis2/ui";
import styled from "styled-components";
import PropTypes from "prop-types";

/**
 * Pagination component for navigating through data pages.
 *
 * @component
 * @param {object} props - The component props.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {number} props.totalDataValues - The total number of data values.
 * @param {(newPage: number) => void} props.onPageChange - Callback function for page change.
 * @returns {JSX.Element} - The rendered Pagination component.
 */
const Pagination = ({
  currentPage,
  totalPages,
  totalPageItems,
  totalDataValues,
  onPageChange,
}) => {
  /**
   * Determines whether to show ellipsis based on the total number of pages.
   *
   * @type {boolean}
   */
  const showEllipsis = totalPages > 10;

  /**
   * Calculates the number of visible pages based on whether ellipsis is shown or not.
   *
   * @type {number}
   */
  const visiblePages = showEllipsis ? Math.min(totalPages, 10) : totalPages;

  /**
   * Generates an array of JSX buttons representing each page.
   *
   * @returns {JSX.Element[]} - Array of JSX buttons.
   */
  const getPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= visiblePages; i++) {
      buttons.push(
        <Button
          key={i}
          primary={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <PaginationWrapper>
      <Button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      {getPageButtons()}
      {showEllipsis && totalPages > 10 && <span>...</span>}

      <Button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
      <SpanText>
        Showing {totalPageItems} of {totalDataValues} total births
      </SpanText>
    </PaginationWrapper>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  totalDataValues: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

/**
 * Styled wrapper for the Pagination component.
 *
 * @type {object}
 */
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/**
 * Styled span element for additional text in the Pagination component.
 *
 * @type {object}
 */
const SpanText = styled.span`
  margin: 10px;
`;

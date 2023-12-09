import { useDataQuery } from "@dhis2/app-runtime";
import { dhisDates } from "../utils/dhisDates";
import { ROOT_OU, PROGRAM_ID } from "../utils/constants/program";

/**
 * Query configuration for fetching program attributes.
 *
 * @type {object}
 */
const PROGRAM_ATTRIBUTES_QUERY = {
  programs: {
    resource: "trackedEntityInstances",
    params: ({ organisationUnit, startDate, endDate, programId }) => ({
      ou: organisationUnit,
      ouMode: "DESCENDANTS", //'SELECTED' or 'DESCENDANTS,
      order: "created:desc",
      lastUpdatedStartDate: startDate,
      lastUpdatedEndDate: endDate,
      program: programId,
      paging: true,
    }),
  },
};

/**
 * Custom hook for fetching data based on provided parameters.
 *
 * @param {object|null} organisationUnit - The selected organization unit.
 * @param {Date|null} selectedStartDate - The selected start date.
 * @param {Date|null} selectedEndDate - The selected end date.
 * @returns {object} - Object containing loading, error, data, page, totalPage, and refetch properties.
 */
export const useData = (
  organisationUnit,
  selectedStartDate,
  selectedEndDate
) => {
  const { loading, error, data, page, totalPage, refetch } = useDataQuery(
    PROGRAM_ATTRIBUTES_QUERY,
    {
      variables: {
        organisationUnit: organisationUnit?.id || ROOT_OU,
        startDate: dhisDates(selectedStartDate),
        endDate: dhisDates(selectedEndDate),
        programId: PROGRAM_ID,
      },
      lazy: true,
    }
  );

  return { loading, error, data, page, totalPage, refetch };
};

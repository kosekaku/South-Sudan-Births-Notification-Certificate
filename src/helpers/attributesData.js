import { TEI_ATTRIBUTES } from "../utils/constants/program";
/**
 * Extracts attribute data from TrackedEntityInstanceProps and maps it to specific attributes.
 *
 * @param {TrackedEntityInstanceProps} props - The TrackedEntityInstanceProps containing attributes.
 * @returns {{
 *   fullNames: string | undefined,
 *   motherName: string | undefined,
 *   fatherName: string | undefined,
 *   dateOfBirth: string | undefined,
 *   placeOfBirth: string | undefined,
 *   natureOfBirth: string | undefined,
 *   gender: string | undefined,
 *   others: string | undefined
 * }} - Object containing mapped attribute values.
 */
export const attributesData = ({ attributes }) => {
  if (attributes === undefined || attributes.length === 0) return;

  let fullNames,
    motherName,
    fatherName,
    dateOfBirth,
    placeOfBirth,
    natureOfBirth,
    gender,
    others;

  attributes?.map(({ value, attribute }) => {
    // Map data to specific attributes
    switch (attribute) {
      case TEI_ATTRIBUTES["Mother Name"]:
        motherName = value;
        break;
      case TEI_ATTRIBUTES["Father Name"]:
        fatherName = value;
        break;
      case TEI_ATTRIBUTES["Name of the Child"]:
        fullNames = value;
        break;
      case TEI_ATTRIBUTES["Date of birth"]:
        dateOfBirth = value;
        break;
      case TEI_ATTRIBUTES["Place of Birth"]: // Place of Birth => TP7knQneHLj
        placeOfBirth = value;
        break;
      case TEI_ATTRIBUTES["Nature of Birth"]:
        natureOfBirth = value;
        break;
      case TEI_ATTRIBUTES["Sex of the child "]:
        gender = value;
        break;
      default:
        others = value;
    }

    return value; // TODO remove testing value
  });

  return {
    fullNames,
    motherName,
    fatherName,
    dateOfBirth,
    placeOfBirth,
    natureOfBirth,
    gender,
    others,
  };
};

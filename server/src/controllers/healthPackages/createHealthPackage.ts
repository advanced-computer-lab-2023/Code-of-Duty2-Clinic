import { Request, Response } from "express";
const HealthPackageAttributes = [
  "name",
  "amountToPay",
  "discounts",
  "packageDurationInYears",
];
const discountAttributes = [
  "gainedDoctorSessionDiscount",
  "gainedPharmacyMedicinesDiscount",
  "gainedFamilyMembersDiscount",
];
import checkIfIncludes from "../../utils/attributeExistenceChecker";
import { StatusCodes } from "http-status-codes";
import { createHealthPackage } from "../../services/health-packages";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const addHealthPackage = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const requestAttributes = Object.keys(req.body);
  const requestDiscountAttributes: string[] = req.body.discounts
    ? Object.keys(req.body.discounts)
    : [];

  let allAttributesExist = checkIfIncludes(
    HealthPackageAttributes,
    requestAttributes
  );
  allAttributesExist =
    allAttributesExist &&
    checkIfIncludes(discountAttributes, requestDiscountAttributes);

  if (
    allAttributesExist &&
    requestAttributes.length === 4 &&
    requestDiscountAttributes.length === 3
  ) {
    try {
      const healthPackage = await createHealthPackage(req.body);
      res.sendStatus(StatusCodes.OK);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  }
};

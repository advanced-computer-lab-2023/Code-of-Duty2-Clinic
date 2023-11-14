// Define the interface for HealthPackage

export interface IHealthPackage {
  name: string;
  amountToPay: number;
  discounts: {
    gainedDoctorSessionDiscount: number;
    gainedPharamcyMedicinesDiscount: number;
    gainedFamilyMembersDiscount: number;
  };
  packageDurationInYears: number;
}

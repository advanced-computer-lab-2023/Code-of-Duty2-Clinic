export interface HealthPackage {
  name: string;
  amountToPay: number;
  discounts: {
    gainedDoctorSessionDiscount: number;
    gainedPharamcyMedicinesDiscount: number;
    gainedFamilyMembersDiscount: number;
  };
  packageDurationInYears: number;
}

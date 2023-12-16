import { ObjectId } from "mongoose";
import HealthPackage, { IHealthPackageModel } from "../../models/health_packages/HealthPackage";
import { IHealthPackage } from "../../models/health_packages/interfaces/IHealthPackage";
import { IPatientModel } from "../../models/patients/Patient";
import { findPatientById } from "../patients";

export const createHealthPackage = async (newHealthPackage: IHealthPackage) => {
   const healthPackage = new HealthPackage(newHealthPackage);
   await healthPackage.save();
};

export const deleteHealthPackage = async (healthPackageId: string) => {
   return await HealthPackage.deleteOne({ _id: healthPackageId });
};

export const findHealthPackageById = async (healthPackageId: string) => {
   return await HealthPackage.findById(healthPackageId).lean();
};

export const findAllHealthPackages = async () => {
  return await HealthPackage.find();
};

export const findHealthPackageDetailsAfterDiscount = async (
   patientId: string,
   packageId: string
) => {
  const allHealthPackagesAfterDiscount = await findAllHealthPackagesAfterDiscount(patientId);
  const healthPackage = allHealthPackagesAfterDiscount.find(
    (healthPackage) => healthPackage.id === packageId
  );
  return healthPackage;
};
export const findAllHealthPackagesAfterDiscount = async (patientId: string) => {
  const patient = await findPatientById(patientId, {
    registeredFamilyMembers: 1
  });
  if (!patient) throw new Error("Patient not found");
  if (!patient.registeredFamilyMembers) return await findAllHealthPackages();

  const registeredFamilyMembersHealthPackages =
    await getRegisteredFamilyMembersHealthPackages(patient);

  const maxHealthPackagesDiscountPossible = getMaxDiscount(registeredFamilyMembersHealthPackages);

   const allHealthPackages = await findAllHealthPackages();

  const result = getHealthPackagesDetailsAfterDiscount(
    allHealthPackages,
    maxHealthPackagesDiscountPossible
  );
  return result;
};

const getHealthPackagesDetailsAfterDiscount = (
  healthPackages: IHealthPackageModel[],
  maxDiscount: number
) => {
  const healthPackagesDetailsAfterDiscount = [];
  for (const packageBeforeDiscount of healthPackages) {
    const healthPackage = packageBeforeDiscount.toObject();
    const healthPackagePriceAfterDiscount =
      healthPackage.amountToPay - maxDiscount * healthPackage.amountToPay;

    let healthPackageDetailsAfterDiscount;
    if (healthPackagePriceAfterDiscount === healthPackage.amountToPay) {
      healthPackageDetailsAfterDiscount = {
        id: healthPackage._id!.toString(),
        name: healthPackage.name,
        discounts: healthPackage.discounts,
        packageDurationInYears: healthPackage.packageDurationInYears,
        amountToPay: healthPackagePriceAfterDiscount,
        amountBeforeDiscount: undefined
      };
    } else {
      healthPackageDetailsAfterDiscount = {
        id: healthPackage._id!.toString(),
        name: healthPackage.name,
        discounts: healthPackage.discounts,
        packageDurationInYears: healthPackage.packageDurationInYears,
        amountToPay: healthPackagePriceAfterDiscount,
        amountBeforeDiscount: healthPackage.amountToPay
      };
    }
    healthPackagesDetailsAfterDiscount.push(healthPackageDetailsAfterDiscount);
  }
  return healthPackagesDetailsAfterDiscount;
};

const getMaxDiscount = (healthPackages: IHealthPackage[]) => {
  const maxDiscount = healthPackages.reduce((maxDiscount, healthPackage) => {
    const gainedFamilyMembersDiscount = healthPackage.discounts.gainedFamilyMembersDiscount;
    if (gainedFamilyMembersDiscount > maxDiscount) return gainedFamilyMembersDiscount;
    return maxDiscount;
  }, 0);
  return maxDiscount;
};

const getRegisteredFamilyMembersHealthPackages = async (patient: IPatientModel) => {
  const registeredFamilyMemberDiscountsPromise = patient.registeredFamilyMembers!.map(
    async (member) => {
      const registeredFamilyMember = await findPatientById(member.id.toString(), {
        subscribedPackage: 1
      });
      if (!registeredFamilyMember?.subscribedPackage) {
        return null;
      }
      const subscribedPackage = await findHealthPackageById(
        registeredFamilyMember.subscribedPackage.packageId.toString()
      );
      return subscribedPackage;
    }
  );
  const result = await Promise.all(registeredFamilyMemberDiscountsPromise);
  return result.filter((package_) => package_ !== null) as IHealthPackage[];
};

export const findHealhPackagePharmacyDiscountAndName = async (
   healthPackageId: ObjectId
): Promise<{ name: string; discount: number }> => {
   try {
      const healthPackage = await HealthPackage.findById(healthPackageId).select({
         "discounts.gainedPharmacyMedicinesDiscount": 1,
         name: 1,
      });
      const discount = healthPackage?.discounts.gainedPharmacyMedicinesDiscount || 1;
      const name = healthPackage?.name!;
      return Promise.resolve({ name, discount });
   } catch (err) {
      return Promise.reject(err);
   }
};

export const findHealhPackageMedicinesDiscount = async (
   healthPackageId: ObjectId
)=> {
   try {
      const healthPackage = await HealthPackage.findById(healthPackageId).select({
         "discounts.gainedPharmacyMedicinesDiscount": 1,
         name: 1,
      });
      const discount = healthPackage?.discounts.gainedPharmacyMedicinesDiscount || 1;
      return discount;
   } catch (err) {
      throw new Error("Cannot get health Package info");
   }
};
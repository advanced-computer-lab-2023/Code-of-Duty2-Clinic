import { ObjectId } from "mongoose";
import HealthPackage, {
  IHealthPackageModel,
} from "../../models/health_packages/HealthPackage";
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
  return await HealthPackage.find().lean();
};

export const findHealthPackageDetailsAfterDiscount = async (
  patientId: string,
  packageId: string
) => {
  const allHealthPackagesAfterDiscount =
    await findAllHealthPackagesAfterDiscount(patientId);
  const healthPackage = allHealthPackagesAfterDiscount.find(
    (healthPackage: any) => healthPackage._id.toString() === packageId
  );
  return healthPackage;
};
export const findAllHealthPackagesAfterDiscount = async (patientId: string) => {
  const patient = await findPatientById(patientId, {
    registeredFamilyMembers: 1,
  });
  if (!patient) throw new Error("Patient not found");
  if (!patient.registeredFamilyMembers) return await findAllHealthPackages();

  const registeredFamilyMembersDiscounts =
    await getRegisteredFamilyMembersDiscounts(patient);

  const maxHealthPackagesDiscountPossible = getMaxDiscount(
    registeredFamilyMembersDiscounts
  );

  const allHealthPackages = await findAllHealthPackages();

  return getHealthPackagesDetailsAfterDiscount(
    allHealthPackages,
    maxHealthPackagesDiscountPossible
  );
};

interface HealthPackageDetailsAfterDiscount extends IHealthPackage {
  _id: ObjectId;
  amountBeforeDiscount: number | undefined;
}
const getHealthPackagesDetailsAfterDiscount = (
  healthPackages: IHealthPackage[],
  maxDiscount: number
): any => {
  const healthPackagesDetailsAfterDiscount = healthPackages.map(
    (healthPackage) => {
      const healthPackagePriceAfterDiscount =
        healthPackage.amountToPay - maxDiscount * healthPackage.amountToPay;

      const healthPackageDetailsAfterDiscount: any = {
        ...healthPackage,
        amountToPay: healthPackagePriceAfterDiscount,
        amountBeforeDiscount: undefined,
      };

      if (healthPackagePriceAfterDiscount !== healthPackage.amountToPay)
        healthPackageDetailsAfterDiscount.amountBeforeDiscount =
          healthPackage.amountToPay;

      return healthPackageDetailsAfterDiscount;
    }
  );
  return healthPackagesDetailsAfterDiscount;
};

const getMaxDiscount = (healthPackages: IHealthPackage[]) => {
  const maxDiscount = healthPackages.reduce((maxDiscount, healthPackage) => {
    if (healthPackage.discounts.gainedFamilyMembersDiscount > maxDiscount)
      return healthPackage.discounts.gainedFamilyMembersDiscount;
    return maxDiscount;
  }, 0);
  return maxDiscount;
};

const getRegisteredFamilyMembersDiscounts = async (patient: IPatientModel) => {
  const registerdFamilyMemberDiscountsPromise =
    patient.registeredFamilyMembers!.map(async (member) => {
      const registeredFamilyMember = await findPatientById(
        member.id.toString(),
        { subscribedPackage: 1 }
      );
      if (!registeredFamilyMember) return null;
      if (!registeredFamilyMember.subscribedPackage) return null;
      const subscribedPackage = await findHealthPackageById(
        registeredFamilyMember.subscribedPackage.packageId.toString()
      );
      return subscribedPackage;
    });
  const result = await Promise.all(registerdFamilyMemberDiscountsPromise);
  return result.filter((package_) => package_ !== null) as IHealthPackage[];
};

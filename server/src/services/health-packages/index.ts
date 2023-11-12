import HealthPackage from "../../models/health_packages/HealthPackage";
import { IHealthPackage } from "../../models/health_packages/interfaces/IHealthPackage";

export const createHealthPackage = async (newHealthPackage: IHealthPackage) => {
    const healthPackage = new HealthPackage(newHealthPackage);
    await healthPackage.save();
}

export const deleteHealthPackage = async (healthPackageId: string) => {
    return await HealthPackage.deleteOne({ _id: healthPackageId });
}

export const findHealthPackageById = async (healthPackageId: string) => {
    return await HealthPackage.findById(healthPackageId);
}

export const findAllHealthPackages = async () => {
    return await HealthPackage.find();
}
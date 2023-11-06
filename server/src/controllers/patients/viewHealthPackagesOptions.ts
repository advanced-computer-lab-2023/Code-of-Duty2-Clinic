import { Request, Response } from 'express';
import HealthPackageModel from '../../models/health_packages/HealthPackage';

export const viewHealthPackagesOptions = async (req: Request, res: Response) => {
    try {
        const healthPackageOptions = await HealthPackageModel.find();
        res.status(200).json(healthPackageOptions);
    } 
    catch (err:any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    
    }
};

import generalRoutes from './generalRoutes';
import guestRoutes from './guestRoutes';
import patientRoutes from './patientRoutes';
import adminRoutes from './adminRoutes';
import doctorRoutes from './doctorRoutes';

export default generalRoutes.concat(guestRoutes).concat(patientRoutes).concat(doctorRoutes).concat(adminRoutes);
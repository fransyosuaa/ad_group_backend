import { IpLabel } from './IpLabel';
import { IpLabelLog } from './IpLabelLog';
import { User, UserLog } from '../authentication/entities';

export { IpLabel, IpLabelLog, User, UserLog };

const entities = [IpLabel, IpLabelLog, User, UserLog];

export default entities;

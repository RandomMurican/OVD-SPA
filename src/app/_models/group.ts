import { Connection } from './connection';
import { Usergroup } from './usergroup';

export interface Group {
    id: number;
    name: string;
    type: string;
    affinity: boolean;
    total: number;
    max: number;
    connections: Connection[];
    users: Usergroup;
}

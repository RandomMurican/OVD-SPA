export interface Session {
    id: number;
    userId: number;
    user: string;
    groupId: number;
    group: string;
    active: boolean;
    time: number;
    start: Date;
}

export interface Group {
    id: number;
    name: string;
    total: number;
    active: number;
    ram: number;
    memory: number;
    cpu: number;
    serviceoffering: string;
    protocol: string;
    template: string;
    hotspares: number;
    dawgtags: string[];
}

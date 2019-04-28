export interface Connection {
    id: number;
    name: string;
    maxConnections: number;
    template: string;
    service: string;
    protocol: string;
}

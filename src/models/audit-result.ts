export interface AuditResult {
    url: string;
    errors: string[];
    title?: string;
    titleLength?: number;
    h1?: string;
    h1Length?: number;
    h2Count?: number;
    h2Texts?: string[];
    metaDescription?: string;
    metaLength?: number;
    canonical?: string;
}
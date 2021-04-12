import { FcClient } from './fc-client';
import { ICredentials } from '../profile';
export interface CustomDomainConfig {
    domainName: string;
    protocol: 'HTTP' | 'HTTP,HTTPS';
    routeConfigs: RouteConfig[];
    certConfig?: CertConfig;
}
interface RouteConfig {
    path: string;
    serviceName: string;
    functionName: string;
    qualifier?: string;
    methods?: string[];
}
interface CertConfig {
    certName: string;
    certificate: string;
    privateKey: string;
}
export declare class FcCustomDomain extends FcClient {
    readonly customDomainConfig: CustomDomainConfig;
    readonly name: string;
    constructor(customDomainConfig: CustomDomainConfig, credentials: ICredentials, region: string);
    validateConfig(): void;
    get(): Promise<any>;
    existOnline(): Promise<boolean>;
    resolveCustomDomainConfig(): {
        [key: string]: any;
    };
    deploy(): Promise<void>;
    remove(): Promise<void>;
}
export {};

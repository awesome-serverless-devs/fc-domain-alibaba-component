import { ILogger } from '@serverless-devs/core';
import { ICredentials } from '../profile';
export declare abstract class FcClient {
    logger: ILogger;
    readonly credentials: ICredentials;
    readonly region: string;
    readonly fcClient: any;
    static defaultClientTimeout: number;
    constructor(region: string, credentials: ICredentials);
    abstract validateConfig(): void;
}

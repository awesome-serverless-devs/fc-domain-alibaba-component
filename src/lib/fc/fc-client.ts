import { HLogger, ILogger } from '@serverless-devs/core';
import { ICredentials } from '../profile';
import FC from '@alicloud/fc2';

export abstract class FcClient {
  @HLogger('FC-DOMAIN') logger: ILogger;

  readonly credentials: ICredentials;
  readonly region: string;
  readonly fcClient: any;

  static defaultClientTimeout = 6000000;

  constructor(region: string, credentials: ICredentials, endpoint: string | undefined) {
    this.region = region;
    this.credentials = credentials;
    this.fcClient = new FC(this.credentials.AccountID, {
      endpoint,
      accessKeyID: this.credentials.AccessKeyID,
      accessKeySecret: this.credentials.AccessKeySecret,
      securityToken: this.credentials.SecurityToken,
      region: this.region,
      timeout: FcClient.defaultClientTimeout,
    });
  }

  abstract validateConfig(): void;
}

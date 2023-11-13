import FC from '@alicloud/fc2';
import { ICredentials } from '../interface';
import logger from '../utils/logger';

export abstract class FcClient {
  logger = logger;

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
      headers: { 'user-agent': 'serverless-devs2.0' },
    });
  }

  abstract validateConfig(): void;
}

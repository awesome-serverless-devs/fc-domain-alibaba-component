import * as core from '@serverless-devs/core';
import { FcClient } from './fc-client';
import { ICredentials, CustomDomainConfig } from '../interface';
import promiseRetry from '../utils/retry';
import StdoutFormatter from '../utils/stdout-formatter';

const _ = core.lodash;

function instanceOfCustomDomain(data: any): data is CustomDomainConfig {
  return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}

export class FcCustomDomain extends FcClient {
  readonly customDomainConfig: CustomDomainConfig;
  readonly name: string;

  constructor(customDomainConfig: CustomDomainConfig, credentials: ICredentials, region: string, endpoint: string | undefined) {
    super(region, credentials, endpoint);
    this.customDomainConfig = customDomainConfig;
    this.name = this.customDomainConfig.domainName;
  }

  validateConfig(): void {
    if (_.isEmpty(this.customDomainConfig)) {
      throw new Error('Please add custom domain in your s.yml/yaml');
    }

    if (!instanceOfCustomDomain(this.customDomainConfig)) {
      throw new Error('custom domain config must contain domainName, protocol and routeConfigs simultaneously');
    }
  }

  async get(): Promise<any> {
    return await promiseRetry(async (retry: any, times: number): Promise<any> => {
      try {
        const onlineCustomDomain = await this.fcClient.getCustomDomain(this.name);
        this.logger.debug(`online custom domain: ${JSON.stringify(onlineCustomDomain)}`);
        return onlineCustomDomain?.data;
      } catch (ex) {
        if (ex.code !== 'DomainNameNotFound') {
          this.logger.debug(`error when getCustomDomain, domainName is ${this.name}, error is: \n${ex}`);

          const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', 'get', this.name, times);
          this.logger.log(retryMsg, 'red');
          retry(ex);
        }
        this.logger.debug(`domain: ${this.name} dose not exist online.`);
        return undefined;
      }
    });
  }

  async resolveCustomDomainConfig(onlineCustomDomain, usePatch: boolean): Promise<{[key: string]: any}> {
    const localRouteConfigs = _.get(this.customDomainConfig, 'routeConfigs', []);

    const resolvedCustomDomainConf = _.cloneDeep(this.customDomainConfig);
    if (resolvedCustomDomainConf.protocol === 'HTTP,HTTPS') {
      const { HttpsCertConfig } = await core.loadComponent('devsapp/fc-core');
      if (!_.isEmpty(this.customDomainConfig.certConfig)) {
        const { privateKey, certificate } = this.customDomainConfig.certConfig;
        if (privateKey) {
          resolvedCustomDomainConf.certConfig.privateKey = await HttpsCertConfig.getCertKeyContent(privateKey, {
            credentials: this.credentials,
          });
        }
        if (certificate) {
          resolvedCustomDomainConf.certConfig.certificate = await HttpsCertConfig.getCertKeyContent(certificate, {
            credentials: this.credentials,
          });
        }
      } else if (this.customDomainConfig.certId) {
        resolvedCustomDomainConf.certConfig = await HttpsCertConfig.getUserCertificateDetail(this.customDomainConfig.certId, {
          credentials: this.credentials,
        });
        delete resolvedCustomDomainConf.certId;
      }
    }
    delete resolvedCustomDomainConf.routeConfigs;
    if (usePatch) {
      const remoteRouteConfigs = _.get(onlineCustomDomain, 'routeConfig.routes', []);
      const routes = _.cloneDeep(localRouteConfigs);
      _.forEach(remoteRouteConfigs, (remoteRouteConfig) => {
        for (const localRouteConfig of localRouteConfigs) {
          if (localRouteConfig.path === remoteRouteConfig.path) {
            return;
          }
        }
        routes.push(remoteRouteConfig);
      });
      _.set(resolvedCustomDomainConf, 'routeConfig.routes', routes);
    } else {
      _.set(resolvedCustomDomainConf, 'routeConfig.routes', localRouteConfigs);
    }

    return resolvedCustomDomainConf;
  }

  async deploy(usePatch: boolean): Promise<void> {
    const onlineCustomDomain = await this.get();
    const isDomainExistOnline = !_.isEmpty(onlineCustomDomain);
    const options = await this.resolveCustomDomainConfig(onlineCustomDomain, usePatch);
    this.logger.debug(`custom domain deploy options: ${JSON.stringify(options)}`);
    await promiseRetry(async (retry: any, times: number): Promise<void> => {
      try {
        if (!isDomainExistOnline) {
          await this.fcClient.createCustomDomain(this.name, options);
        } else {
          await this.fcClient.updateCustomDomain(this.name, options);
        }
      } catch (ex) {
        this.logger.debug(`error when createCustomDomain or updateCustomDomain, domainName is ${this.name}, options is ${JSON.stringify(options)}, error is: \n${ex}`);

        const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', !isDomainExistOnline ? 'create' : 'update', this.name, times);
        this.logger.log(retryMsg, 'red');
        retry(ex);
      }
    });
  }

  async remove(): Promise<void> {
    await promiseRetry(async (retry: any, times: number): Promise<void> => {
      try {
        await this.fcClient.deleteCustomDomain(this.name);
      } catch (ex) {
        if (ex.code !== 'DomainNameNotFound') {
          this.logger.debug(`error when deleteCustomDomain, domainName is ${this.name}, error is: \n${ex}`);
          const retryMsg = StdoutFormatter.stdoutFormatter.retry('custom domain', 'delete', this.name, times);
          this.logger.log(retryMsg, 'red');
          retry(ex);
        }
        throw ex;
      }
    });
  }
}

import * as core from '@serverless-devs/core';
import { promptForConfirmContinue } from './lib/init/prompt';
import _ from 'lodash';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { ICredentials } from './lib/profile';
import StdoutFormatter from './lib/stdout-formatter';
import { IInputs, IProperties } from './interface';

export default class FcBaseComponent {
  @core.HLogger('FC-DOMAIN') logger: core.ILogger;

  // 解析入参
  private async handlerInputs(inputs: IInputs) {
    const project = inputs?.project;
    const properties: IProperties = inputs?.props;
    const access: string = project?.access;
    const credentials: ICredentials = _.isEmpty(inputs.credentials) ? await core.getCredential(access) : inputs.credentials;
    const args = inputs?.args;
    const curPath: string = inputs?.path;
    const projectName: string = project?.projectName;

    const customDomainConfig: CustomDomainConfig = properties?.customDomain;
    const { region } = properties;
    const appName: string = inputs?.appName;

    const endpoint = await this.getFcEndpoint();
    const fcCustomDomain = new FcCustomDomain(customDomainConfig, credentials, region, endpoint);
    fcCustomDomain.validateConfig();

    await StdoutFormatter.initStdout();

    return {
      appName,
      projectName,
      access,
      fcCustomDomain,
      args,
      curPath,
    };
  }

  async deploy(inputs: IInputs): Promise<void> {
    const {
      fcCustomDomain,
    } = await this.handlerInputs(inputs);

    const createMsg = StdoutFormatter.stdoutFormatter.create('custom domain', fcCustomDomain.customDomainConfig.domainName);
    this.logger.debug(createMsg);
    await fcCustomDomain.deploy();
    this.logger.debug(`custom domain: ${fcCustomDomain.customDomainConfig.domainName} is deployed.`);
    return (await fcCustomDomain.get())?.data;
  }

  async remove(inputs: IInputs): Promise<void> {
    const {
      fcCustomDomain,
      args,
    } = await this.handlerInputs(inputs);
    const removeMsg = StdoutFormatter.stdoutFormatter.remove('custom domain', fcCustomDomain.customDomainConfig.domainName);
    this.logger.info(removeMsg);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    const assumeYes: boolean = parsedArgs.data?.y || parsedArgs.data?.assumeYes;

    const onlineCustomDomain = await fcCustomDomain.get();
    if (_.isEmpty(onlineCustomDomain)) {
      this.logger.error(`custom domain: ${fcCustomDomain.name} dose not exist online, remove failed.`);
      return;
    }
    if (assumeYes || await promptForConfirmContinue(`Are you sure to remove custom domain: ${JSON.stringify(onlineCustomDomain.data)}?`)) {
      await fcCustomDomain.remove();
      this.logger.debug(`${fcCustomDomain.customDomainConfig.domainName} is removed.`);
    } else {
      this.logger.info(`cancel removing custom domain: ${fcCustomDomain.customDomainConfig.domainName}`);
    }
  }

  private async getFcEndpoint(): Promise<string | undefined> {
    const fcDefault = await core.loadComponent('devsapp/fc-default');
    const fcEndpoint: string = await fcDefault.get({ args: 'fc-endpoint' });
    if (!fcEndpoint) { return undefined; }
    const enableFcEndpoint: any = await fcDefault.get({ args: 'enable-fc-endpoint' });
    return (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined;
  }
}

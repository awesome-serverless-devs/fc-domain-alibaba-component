import * as core from '@serverless-devs/core';
import { promptForConfirmContinue } from './lib/init/prompt';
import _ from 'lodash';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { ICredentials } from './lib/profile';
import { IInputs, IProperties } from './interface';

export default class FcBaseComponent {
  @core.HLogger('FC-DOMAIN') logger: core.ILogger;

  async report(componentName: string, command: string, accountID?: string, access?: string): Promise<void> {
    let uid: string = accountID;
    if (_.isEmpty(accountID)) {
      const credentials: ICredentials = await core.getCredential(access);
      uid = credentials.AccountID;
    }

    try {
      core.reportComponent(componentName, {
        command,
        uid,
      });
    } catch (e) {
      this.logger.warn(`Component ${componentName} report error: ${e.message}`);
    }
  }
  // 解析入参
  async handlerInputs(inputs: IInputs) {
    const project = inputs?.project;
    const properties: IProperties = inputs?.props;
    const access: string = project?.access;
    const credentials: ICredentials = await core.getCredential(access);
    const args = inputs?.args;
    const curPath: string = inputs?.path;
    const projectName: string = project?.projectName;

    const customDomainConfig: CustomDomainConfig = properties?.customDomain;
    const { region } = properties;
    const appName: string = inputs?.appName;

    const fcCustomDomain = new FcCustomDomain(customDomainConfig, credentials, region);
    fcCustomDomain.validateConfig();

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
    await this.report('fc-domain', 'deploy', fcCustomDomain.credentials.AccountID);
    this.logger.info(`wating for ${fcCustomDomain.customDomainConfig.domainName} to be deployed.`);
    await fcCustomDomain.deploy();
    this.logger.info(`custom domain: ${fcCustomDomain.customDomainConfig.domainName} is deployed.`);
  }

  async remove(inputs: IInputs): Promise<void> {
    const {
      fcCustomDomain,
      args,
    } = await this.handlerInputs(inputs);
    await this.report('fc-domain', 'remove', fcCustomDomain.credentials.AccountID);
    this.logger.info(`wating for ${fcCustomDomain.customDomainConfig.domainName} to be removed.`);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    const assumeYes: boolean = parsedArgs.data?.y || parsedArgs.data?.assumeYes;

    const onlineCustomDomain = await fcCustomDomain.get();
    if (_.isEmpty(onlineCustomDomain)) {
      this.logger.error(`custom domain: ${fcCustomDomain.name} dose not exist online, remove failed.`);
      return;
    }
    if (assumeYes || await promptForConfirmContinue(`Are you sure to remove custom domain: ${JSON.stringify(onlineCustomDomain.data)}?`)) {
      await fcCustomDomain.remove();
      this.logger.info(`${fcCustomDomain.customDomainConfig.domainName} is removed.`);
    } else {
      this.logger.info(`cancel removing custom domain: ${fcCustomDomain.customDomainConfig.domainName}`);
    }
  }
}

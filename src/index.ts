import * as core from '@serverless-devs/core';
import { promptForConfirmContinue } from './lib/init/prompt';
import _ from 'lodash';
import { FcCustomDomain, CustomDomainConfig } from './lib/fc/custom-domain';
import { ICredentials } from './lib/profile';

export default class FcBaseComponent {
  @core.HLogger('FC-DOMAIN') logger: core.ILogger;

  // 解析入参
  async handlerInputs(inputs) {
    const project = inputs?.project || inputs?.Project;
    const properties = inputs?.properties || inputs?.Properties;
    const provider: string = project?.Provider || project?.provider;
    const accessAlias: string = project?.AccessAlias || project?.accessAlias;
    const credentials: ICredentials = await core.getCredential(provider, accessAlias || '');
    const args = inputs?.Args || inputs?.args;
    const projectName: string = project.projectName || project.ProjectName;

    const customDomainConfig: CustomDomainConfig = properties?.customDomain;
    const { region } = properties;

    const fcCustomDomain = new FcCustomDomain(customDomainConfig, credentials, region);
    fcCustomDomain.validateConfig();

    return {
      projectName,
      accessAlias,
      fcCustomDomain,
      args,
    };
  }

  async deploy(inputs): Promise<void> {
    const {
      fcCustomDomain,
    } = await this.handlerInputs(inputs);

    this.logger.info(`wating for ${fcCustomDomain.customDomainConfig.domainName} to be deployed.`);
    await fcCustomDomain.deploy();
    this.logger.info(`custom domain: ${fcCustomDomain.customDomainConfig.domainName} is deployed.`);
  }

  async remove(inputs): Promise<void> {
    const {
      fcCustomDomain,
      args,
    } = await this.handlerInputs(inputs);
    this.logger.info(`wating for ${fcCustomDomain.customDomainConfig.domainName} to be removed.`);
    const parsedArgs: {[key: string]: any} = core.commandParse({ args }, { boolean: ['y', 'assumeYes'] });
    const assumeYes: boolean = parsedArgs.data?.y || parsedArgs.data?.assumeYes;

    const onlineCustomDomain = await fcCustomDomain.get();
    if (_.isEmpty(onlineCustomDomain)) {
      this.logger.error(`custom domain: ${fcCustomDomain.name} dose not exist online, remove failed.`);
      return;
    }
    if (assumeYes || await promptForConfirmContinue(`Are you sure to remove custom domain: ${JSON.stringify(onlineCustomDomain)}?`)) {
      await fcCustomDomain.remove();
      this.logger.info(`${fcCustomDomain.customDomainConfig.domainName} is removed.`);
    } else {
      this.logger.info(`cancel removing custom domain: ${fcCustomDomain.customDomainConfig.domainName}`);
    }
  }
}

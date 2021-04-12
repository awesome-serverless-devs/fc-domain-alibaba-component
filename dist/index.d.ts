import * as core from '@serverless-devs/core';
import { FcCustomDomain } from './lib/fc/custom-domain';
import { IInputs } from './interface';
export default class FcBaseComponent {
    logger: core.ILogger;
    handlerInputs(inputs: IInputs): Promise<{
        appName: string;
        projectName: string;
        access: string;
        fcCustomDomain: FcCustomDomain;
        args: string;
        curPath: string;
    }>;
    deploy(inputs: IInputs): Promise<void>;
    remove(inputs: IInputs): Promise<void>;
}

import * as core from '@serverless-devs/core';
import { IInputs } from './interface';
export default class FcBaseComponent {
    logger: core.ILogger;
    private report;
    private handlerInputs;
    deploy(inputs: IInputs): Promise<void>;
    remove(inputs: IInputs): Promise<void>;
    private getFcEndpoint;
}

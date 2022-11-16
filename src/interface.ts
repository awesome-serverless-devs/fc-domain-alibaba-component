export interface IInputs {
  props: IProperties;
  project: {
    component: string;
    access: string;
    projectName: string;
  };
  credentials?: any;
  appName: string;
  args: string;
  argsObj?: any;
  path: any;
}

export interface ICredentials {
  AccountID: string;
  AccessKeyID: string;
  AccessKeySecret: string;
  SecurityToken?: string;
}

export interface IProperties {
  region: string;
  customDomain: CustomDomainConfig;
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

export interface CustomDomainConfig {
  domainName: string;
  protocol: 'HTTP' | 'HTTP,HTTPS';
  routeConfigs: RouteConfig[];
  certConfig?: CertConfig;
  certId?: string;
}

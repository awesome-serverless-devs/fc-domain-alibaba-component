"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@serverless-devs/core"));
var prompt_1 = require("./lib/init/prompt");
var lodash_1 = __importDefault(require("lodash"));
var custom_domain_1 = require("./lib/fc/custom-domain");
var stdout_formatter_1 = __importDefault(require("./lib/stdout-formatter"));
var FcBaseComponent = /** @class */ (function () {
    function FcBaseComponent() {
    }
    FcBaseComponent.prototype.report = function (componentName, command, accountID, access) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, credentials, warnMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = accountID;
                        if (!lodash_1.default.isEmpty(accountID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        uid = credentials.AccountID;
                        _a.label = 2;
                    case 2:
                        try {
                            core.reportComponent(componentName, {
                                command: command,
                                uid: uid,
                            });
                        }
                        catch (e) {
                            warnMsg = stdout_formatter_1.default.stdoutFormatter.warn('report', "Component " + componentName + " report error", e.message);
                            this.logger.warn(warnMsg);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 解析入参
    FcBaseComponent.prototype.handlerInputs = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var project, properties, access, credentials, args, curPath, projectName, customDomainConfig, region, appName, endpoint, fcCustomDomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        project = inputs === null || inputs === void 0 ? void 0 : inputs.project;
                        properties = inputs === null || inputs === void 0 ? void 0 : inputs.props;
                        access = project === null || project === void 0 ? void 0 : project.access;
                        return [4 /*yield*/, core.getCredential(access)];
                    case 1:
                        credentials = _a.sent();
                        args = inputs === null || inputs === void 0 ? void 0 : inputs.args;
                        curPath = inputs === null || inputs === void 0 ? void 0 : inputs.path;
                        projectName = project === null || project === void 0 ? void 0 : project.projectName;
                        customDomainConfig = properties === null || properties === void 0 ? void 0 : properties.customDomain;
                        region = properties.region;
                        appName = inputs === null || inputs === void 0 ? void 0 : inputs.appName;
                        return [4 /*yield*/, this.getFcEndpoint()];
                    case 2:
                        endpoint = _a.sent();
                        fcCustomDomain = new custom_domain_1.FcCustomDomain(customDomainConfig, credentials, region, endpoint);
                        fcCustomDomain.validateConfig();
                        return [4 /*yield*/, stdout_formatter_1.default.initStdout()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                appName: appName,
                                projectName: projectName,
                                access: access,
                                fcCustomDomain: fcCustomDomain,
                                args: args,
                                curPath: curPath,
                            }];
                }
            });
        });
    };
    FcBaseComponent.prototype.deploy = function (inputs) {
        return __awaiter(this, void 0, void 0, function () {
            var fcCustomDomain, createMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        fcCustomDomain = (_a.sent()).fcCustomDomain;
                        return [4 /*yield*/, this.report('fc-domain', 'deploy', fcCustomDomain.credentials.AccountID)];
                    case 2:
                        _a.sent();
                        createMsg = stdout_formatter_1.default.stdoutFormatter.create('custom domain', fcCustomDomain.customDomainConfig.domainName);
                        this.logger.info(createMsg);
                        return [4 /*yield*/, fcCustomDomain.deploy()];
                    case 3:
                        _a.sent();
                        this.logger.debug("custom domain: " + fcCustomDomain.customDomainConfig.domainName + " is deployed.");
                        return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.remove = function (inputs) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, fcCustomDomain, args, removeMsg, parsedArgs, assumeYes, onlineCustomDomain, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, this.handlerInputs(inputs)];
                    case 1:
                        _c = _e.sent(), fcCustomDomain = _c.fcCustomDomain, args = _c.args;
                        return [4 /*yield*/, this.report('fc-domain', 'remove', fcCustomDomain.credentials.AccountID)];
                    case 2:
                        _e.sent();
                        removeMsg = stdout_formatter_1.default.stdoutFormatter.remove('custom domain', fcCustomDomain.customDomainConfig.domainName);
                        this.logger.info(removeMsg);
                        parsedArgs = core.commandParse({ args: args }, { boolean: ['y', 'assumeYes'] });
                        assumeYes = ((_a = parsedArgs.data) === null || _a === void 0 ? void 0 : _a.y) || ((_b = parsedArgs.data) === null || _b === void 0 ? void 0 : _b.assumeYes);
                        return [4 /*yield*/, fcCustomDomain.get()];
                    case 3:
                        onlineCustomDomain = _e.sent();
                        if (lodash_1.default.isEmpty(onlineCustomDomain)) {
                            this.logger.error("custom domain: " + fcCustomDomain.name + " dose not exist online, remove failed.");
                            return [2 /*return*/];
                        }
                        _d = assumeYes;
                        if (_d) return [3 /*break*/, 5];
                        return [4 /*yield*/, prompt_1.promptForConfirmContinue("Are you sure to remove custom domain: " + JSON.stringify(onlineCustomDomain.data) + "?")];
                    case 4:
                        _d = (_e.sent());
                        _e.label = 5;
                    case 5:
                        if (!_d) return [3 /*break*/, 7];
                        return [4 /*yield*/, fcCustomDomain.remove()];
                    case 6:
                        _e.sent();
                        this.logger.debug(fcCustomDomain.customDomainConfig.domainName + " is removed.");
                        return [3 /*break*/, 8];
                    case 7:
                        this.logger.info("cancel removing custom domain: " + fcCustomDomain.customDomainConfig.domainName);
                        _e.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FcBaseComponent.prototype.getFcEndpoint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fcDefault, fcEndpoint, enableFcEndpoint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, core.loadComponent('devsapp/fc-default')];
                    case 1:
                        fcDefault = _a.sent();
                        return [4 /*yield*/, fcDefault.get({ args: 'fc-endpoint' })];
                    case 2:
                        fcEndpoint = _a.sent();
                        if (!fcEndpoint) {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, fcDefault.get({ args: 'enable-fc-endpoint' })];
                    case 3:
                        enableFcEndpoint = _a.sent();
                        return [2 /*return*/, (enableFcEndpoint === true || enableFcEndpoint === 'true') ? fcEndpoint : undefined];
                }
            });
        });
    };
    __decorate([
        core.HLogger('FC-DOMAIN'),
        __metadata("design:type", Object)
    ], FcBaseComponent.prototype, "logger", void 0);
    return FcBaseComponent;
}());
exports.default = FcBaseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQThDO0FBQzlDLDRDQUE2RDtBQUM3RCxrREFBdUI7QUFDdkIsd0RBQTRFO0FBRTVFLDRFQUFxRDtBQUdyRDtJQUFBO0lBNEZBLENBQUM7SUF6RmUsZ0NBQU0sR0FBcEIsVUFBcUIsYUFBcUIsRUFBRSxPQUFlLEVBQUUsU0FBa0IsRUFBRSxNQUFlOzs7Ozs7d0JBQzFGLEdBQUcsR0FBVyxTQUFTLENBQUM7NkJBQ3hCLGdCQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFwQix3QkFBb0I7d0JBQ1kscUJBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTVELFdBQVcsR0FBaUIsU0FBZ0M7d0JBQ2xFLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDOzs7d0JBRzlCLElBQUk7NEJBQ0YsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUU7Z0NBQ2xDLE9BQU8sU0FBQTtnQ0FDUCxHQUFHLEtBQUE7NkJBQ0osQ0FBQyxDQUFDO3lCQUNKO3dCQUFDLE9BQU8sQ0FBQyxFQUFFOzRCQUNKLE9BQU8sR0FBRywwQkFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWEsYUFBYSxrQkFBZSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDckgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7eUJBQzNCOzs7OztLQUNGO0lBQ0QsT0FBTztJQUNPLHVDQUFhLEdBQTNCLFVBQTRCLE1BQWU7Ozs7Ozt3QkFDbkMsT0FBTyxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFP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
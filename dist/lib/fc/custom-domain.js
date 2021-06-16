"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.FcCustomDomain = void 0;
var fc_client_1 = require("./fc-client");
var _ = __importStar(require("lodash"));
var retry_1 = __importDefault(require("../retry"));
var stdout_formatter_1 = __importDefault(require("../stdout-formatter"));
function instanceOfCustomDomain(data) {
    return 'domainName' in data && 'protocol' in data && 'routeConfigs' in data;
}
var FcCustomDomain = /** @class */ (function (_super) {
    __extends(FcCustomDomain, _super);
    function FcCustomDomain(customDomainConfig, credentials, region) {
        var _this = _super.call(this, region, credentials) || this;
        _this.customDomainConfig = customDomainConfig;
        _this.name = _this.customDomainConfig.domainName;
        return _this;
    }
    FcCustomDomain.prototype.validateConfig = function () {
        if (_.isEmpty(this.customDomainConfig)) {
            throw new Error('Please add custom domain in your s.yml/yaml');
        }
        if (!instanceOfCustomDomain(this.customDomainConfig)) {
            throw new Error('custom domain config must contain domainName, protocol and routeConfigs simultaneously');
        }
    };
    FcCustomDomain.prototype.get = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                            var onlineCustomDomain, ex_1, retryMsg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.fcClient.getCustomDomain(this.name)];
                                    case 1:
                                        onlineCustomDomain = _a.sent();
                                        this.logger.debug("online custom domain: " + JSON.stringify(onlineCustomDomain));
                                        return [2 /*return*/, onlineCustomDomain];
                                    case 2:
                                        ex_1 = _a.sent();
                                        if (ex_1.code !== 'DomainNameNotFound') {
                                            this.logger.debug("error when getCustomDomain, domainName is " + this.name + ", error is: \n" + ex_1);
                                            retryMsg = stdout_formatter_1.default.stdoutFormatter.retry('custom domain', 'get', this.name, times);
                                            this.logger.log(retryMsg, 'red');
                                            retry(ex_1);
                                        }
                                        this.logger.debug("domain: " + this.name + " dose not exist online.");
                                        return [2 /*return*/, undefined];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FcCustomDomain.prototype.existOnline = function () {
        return __awaiter(this, void 0, void 0, function () {
            var onlineCustomDomain;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get()];
                    case 1:
                        onlineCustomDomain = _a.sent();
                        if (_.isEmpty(onlineCustomDomain)) {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FcCustomDomain.prototype.resolveCustomDomainConfig = function () {
        var options = __assign({}, this.customDomainConfig);
        delete options.domainName;
        delete options.routeConfigs;
        Object.assign(options, {
            routeConfig: {
                routes: this.customDomainConfig.routeConfigs,
            },
        });
        return options;
    };
    FcCustomDomain.prototype.deploy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isDomainExistOnline, options;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.existOnline()];
                    case 1:
                        isDomainExistOnline = _a.sent();
                        options = this.resolveCustomDomainConfig();
                        this.logger.debug("custom domain deploy options: " + JSON.stringify(options));
                        return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                                var ex_2, retryMsg;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 5, , 6]);
                                            if (!!isDomainExistOnline) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.fcClient.createCustomDomain(this.name, options)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2: return [4 /*yield*/, this.fcClient.updateCustomDomain(this.name, options)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [3 /*break*/, 6];
                                        case 5:
                                            ex_2 = _a.sent();
                                            this.logger.debug("error when createCustomDomain or updateCustomDomain, domainName is " + this.name + ", options is " + JSON.stringify(options) + ", error is: \n" + ex_2);
                                            retryMsg = stdout_formatter_1.default.stdoutFormatter.retry('custom domain', !isDomainExistOnline ? 'create' : 'update', this.name, times);
                                            this.logger.log(retryMsg, 'red');
                                            retry(ex_2);
                                            return [3 /*break*/, 6];
                                        case 6: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FcCustomDomain.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, retry_1.default(function (retry, times) { return __awaiter(_this, void 0, void 0, function () {
                            var ex_3, retryMsg;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, this.fcClient.deleteCustomDomain(this.name)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        ex_3 = _a.sent();
                                        if (ex_3.code !== 'DomainNameNotFound') {
                                            this.logger.debug("error when deleteCustomDomain, domainName is " + this.name + ", error is: \n" + ex_3);
                                            retryMsg = stdout_formatter_1.default.stdoutFormatter.retry('custom domain', 'delete', this.name, times);
                                            this.logger.log(retryMsg, 'red');
                                            retry(ex_3);
                                        }
                                        throw ex_3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FcCustomDomain;
}(fc_client_1.FcClient));
exports.FcCustomDomain = FcCustomDomain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWRvbWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmMvY3VzdG9tLWRvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLHdDQUE0QjtBQUU1QixtREFBb0M7QUFDcEMseUVBQWtEO0FBU2xELFNBQVMsc0JBQXNCLENBQUMsSUFBUztJQUN2QyxPQUFPLFlBQVksSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxjQUFjLElBQUksSUFBSSxDQUFDO0FBQzlFLENBQUM7QUFnQkQ7SUFBb0Msa0NBQVE7SUFJMUMsd0JBQVksa0JBQXNDLEVBQUUsV0FBeUIsRUFBRSxNQUFjO1FBQTdGLFlBQ0Usa0JBQU0sTUFBTSxFQUFFLFdBQVcsQ0FBQyxTQUczQjtRQUZDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUM7O0lBQ2pELENBQUM7SUFFRCx1Q0FBYyxHQUFkO1FBQ0UsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztTQUNoRTtRQUVELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHdGQUF3RixDQUFDLENBQUM7U0FDM0c7SUFDSCxDQUFDO0lBRUssNEJBQUcsR0FBVDs7Ozs7NEJBQ1MscUJBQU0sZUFBWSxDQUFDLFVBQU8sS0FBVSxFQUFFLEtBQWE7Ozs7Ozt3Q0FFM0IscUJBQU0s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
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcClient = void 0;
var core_1 = require("@serverless-devs/core");
var fc2_1 = __importDefault(require("@alicloud/fc2"));
var FcClient = /** @class */ (function () {
    function FcClient(region, credentials, endpoint) {
        this.region = region;
        this.credentials = credentials;
        this.fcClient = new fc2_1.default(this.credentials.AccountID, {
            endpoint: endpoint,
            accessKeyID: this.credentials.AccessKeyID,
            accessKeySecret: this.credentials.AccessKeySecret,
            securityToken: this.credentials.SecurityToken,
            region: this.region,
            timeout: FcClient.defaultClientTimeout,
        });
    }
    FcClient.defaultClientTimeout = 6000000;
    __decorate([
        core_1.HLogger('FC-DOMAIN'),
        __metadata("design:type", Object)
    ], FcClient.prototype, "logger", void 0);
    return FcClient;
}());
exports.FcClient = FcClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mYy9mYy1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlEO0FBRXpELHNEQUErQjtBQUUvQjtJQVNFLGtCQUFZLE1BQWMsRUFBRSxXQUF5QixFQUFFLFFBQTRCO1FBQ2pGLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxhQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7WUFDakQsUUFBUSxVQUFBO1lBQ1IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVztZQUN6QyxlQUFlLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO1lBQ2pELGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWE7WUFDN0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLE9BQU8sRUFBRSxRQUFRLENBQUMsb0JBQW9CO1NBQ3ZDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFiTSw2QkFBb0IsR0FBRyxPQUFPLENBQUM7SUFOaEI7UUFBckIsY0FBTyxDQUFDLFdBQVcsQ0FBQzs7NENBQWlCO0lBc0J4QyxlQUFDO0NBQUEsQUF2QkQsSUF1QkM7QUF2QnFCLDRCQUFRIn0=
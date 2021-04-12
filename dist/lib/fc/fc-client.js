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
    function FcClient(region, credentials) {
        this.region = region;
        this.credentials = credentials;
        this.fcClient = new fc2_1.default(this.credentials.AccountID, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmMtY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mYy9mYy1jbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQXlEO0FBRXpELHNEQUErQjtBQUUvQjtJQVNFLGtCQUFZLE1BQWMsRUFBRSxXQUF5QjtRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksYUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO1lBQ2pELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVc7WUFDekMsZUFBZSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUNqRCxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhO1lBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsUUFBUSxDQUFDLG9CQUFvQjtTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBWk0sNkJBQW9CLEdBQUcsT0FBTyxDQUFDO0lBTmhCO1FBQXJCLGNBQU8sQ0FBQyxXQUFXLENBQUM7OzRDQUFpQjtJQXFCeEMsZUFBQztDQUFBLEFBdEJELElBc0JDO0FBdEJxQiw0QkFBUSJ9
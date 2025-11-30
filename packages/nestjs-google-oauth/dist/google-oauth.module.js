"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoogleOauthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOauthModule = void 0;
const common_1 = require("@nestjs/common");
const google_oauth_strategy_1 = require("./google-oauth.strategy");
const google_oauth_controller_1 = require("./google-oauth.controller");
const session_serializer_1 = require("./session.serializer");
const passport_1 = require("@nestjs/passport");
let GoogleOauthModule = GoogleOauthModule_1 = class GoogleOauthModule {
    static register(options) {
        return {
            module: GoogleOauthModule_1,
            imports: [passport_1.PassportModule.register({ session: true })],
            controllers: [google_oauth_controller_1.GoogleOauthController],
            providers: [
                {
                    provide: 'GOOGLE_OAUTH_OPTIONS',
                    useValue: options,
                },
                google_oauth_strategy_1.GoogleOauthStrategy,
                session_serializer_1.SessionSerializer,
            ],
            exports: [google_oauth_strategy_1.GoogleOauthStrategy, session_serializer_1.SessionSerializer],
        };
    }
    static registerAsync(options) {
        return {
            module: GoogleOauthModule_1,
            imports: [
                ...options.imports || [],
                passport_1.PassportModule.register({ session: true }),
            ],
            controllers: [google_oauth_controller_1.GoogleOauthController],
            providers: [
                ...this.createAsyncProviders(options),
                google_oauth_strategy_1.GoogleOauthStrategy,
                session_serializer_1.SessionSerializer,
            ],
            exports: [google_oauth_strategy_1.GoogleOauthStrategy, session_serializer_1.SessionSerializer],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: 'GOOGLE_OAUTH_OPTIONS',
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: 'GOOGLE_OAUTH_OPTIONS',
            useFactory: async (optionsFactory) => await optionsFactory.createGoogleOauthOptions(),
            inject: [options.useExisting || options.useClass],
        };
    }
};
exports.GoogleOauthModule = GoogleOauthModule;
exports.GoogleOauthModule = GoogleOauthModule = GoogleOauthModule_1 = __decorate([
    (0, common_1.Module)({})
], GoogleOauthModule);
//# sourceMappingURL=google-oauth.module.js.map
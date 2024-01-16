import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module'
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service'
import { JwtTokenService } from '../services/jwt/jwt.service'
import { UseCaseProxy } from './usecase-proxy'
import { RegisterUseCases } from 'src/usecases/auth/register.usecase'

@Module({
  imports: [EnvironmentConfigModule]
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy'
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [JwtTokenService, EnvironmentConfigService],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService
          ) => new UseCaseProxy(new RegisterUseCases(jwtTokenService, config))
        }
      ],
      exports: [UsecasesProxyModule.REGISTER_USECASES_PROXY]
    }
  }
}

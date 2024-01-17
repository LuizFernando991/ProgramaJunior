import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module'
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service'
import { JwtTokenService } from '../services/jwt/jwt.service'
import { UseCaseProxy } from './usecase-proxy'
import { RegisterUseCases } from 'src/usecases/auth/register.usecase'
import { JwtModule } from '../services/jwt/jwt.module'
import { RepositoriesModule } from '../repositories/repositories.module'
import { DatabaseUserRepository } from '../repositories/user.repository'
import { EmailService } from '../services/email/email.service'
import { EmailModule } from '../services/email/email.module'

@Module({
  imports: [EnvironmentConfigModule, JwtModule, RepositoriesModule, EmailModule]
})
export class UsecasesProxyModule {
  static REGISTER_USECASES_PROXY = 'RegisterUseCasesProxy'
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [
            JwtTokenService,
            EnvironmentConfigService,
            DatabaseUserRepository,
            EmailService
          ],
          provide: UsecasesProxyModule.REGISTER_USECASES_PROXY,
          useFactory: (
            jwtTokenService: JwtTokenService,
            enviromentConfig: EnvironmentConfigService,
            userRepository: DatabaseUserRepository,
            emailSender: EmailService
          ) =>
            new UseCaseProxy(
              new RegisterUseCases(
                jwtTokenService,
                enviromentConfig,
                userRepository,
                emailSender
              )
            )
        }
      ],
      exports: [UsecasesProxyModule.REGISTER_USECASES_PROXY]
    }
  }
}

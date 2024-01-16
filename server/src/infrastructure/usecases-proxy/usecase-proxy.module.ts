import { DynamicModule, Module } from '@nestjs/common'
import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module'
// import { EnvironmentConfigService } from '../config/environment-config/environment-config.service'

@Module({
  imports: [EnvironmentConfigModule]
})
export class UsecasesProxyModule {
  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [],
      exports: []
    }
  }
}

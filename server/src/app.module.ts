import { Module } from '@nestjs/common'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecase-proxy.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './infrastructure/db/prisma.module'

@Module({
  imports: [
    EnvironmentConfigModule,
    UsecasesProxyModule.register(),
    ConfigModule.forRoot({}),
    PrismaModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

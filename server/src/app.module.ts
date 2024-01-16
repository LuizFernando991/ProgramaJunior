import { Module } from '@nestjs/common'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecase-proxy.module'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './infrastructure/db/prisma.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    EnvironmentConfigModule,
    UsecasesProxyModule.register(),
    ConfigModule.forRoot({}),
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

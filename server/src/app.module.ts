import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module'
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecase-proxy.module'
import { ConfigModule } from '@nestjs/config'
import { JwtModule as JwtServiceModule } from './infrastructure/services/jwt/jwt.module'
import { PrismaModule } from './infrastructure/db/prisma.module'
import { JwtModule } from '@nestjs/jwt'
import { ControllersModule } from './infrastructure/controllers/controllers.module'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    EnvironmentConfigModule,
    UsecasesProxyModule.register(),
    ConfigModule.forRoot({}),
    PrismaModule,
    JwtServiceModule,
    ControllersModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}

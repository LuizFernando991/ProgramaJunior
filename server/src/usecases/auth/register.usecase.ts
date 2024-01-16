// import { IBcryptService } from 'src/domain/adapters/bcrypt.interface'
import { IJwtService } from 'src/domain/adapters/jwt.interface'
import { EnviromentConfig } from 'src/domain/config/enviroment.interface'

export class RegisterUseCases {
  constructor(
    private readonly jwtTokenService: IJwtService,
    private readonly enviromentConfig: EnviromentConfig
    // private readonly bcryptService: IBcryptService
  ) {}

  private async createActivationToken(user: {
    name: string
    email: string
    password: string
  }) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString()
    const secret = this.enviromentConfig.getJwtSecret()
    const expiresIn = this.enviromentConfig.getJwtExpirationTime()
    const payload = {
      user: {
        name: user.name,
        email: user.email,
        password: user.password
      },
      code: activationCode
    }
    const token = this.jwtTokenService.createActivationToken(
      payload,
      secret,
      expiresIn
    )

    return { token, activationCode }
  }
}

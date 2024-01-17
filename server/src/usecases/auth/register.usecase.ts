// import { IHashtService } from 'src/domain/adapters/hash.interface'
import { IEmailsender } from 'src/domain/adapters/emailsender.interface'
import { IJwtService } from 'src/domain/adapters/jwt.interface'
import { EnviromentConfig } from 'src/domain/config/enviroment.interface'
import { UserRepository } from 'src/domain/repositories/userRepositoryIInterface'

export class RegisterUseCases {
  constructor(
    private readonly jwtTokenService: IJwtService,
    private readonly enviromentConfig: EnviromentConfig,
    // private readonly hashService: IHashService
    private readonly userRepository: UserRepository,
    private readonly emailSender: IEmailsender
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

  async register(user: { name: string; email: string; password: string }) {
    const existsUser = await this.userRepository.getUserByEmail(user.email)

    if (!!existsUser) {
      return null //throw new error
    }

    // hash password

    const { token: activationToken, activationCode } =
      await this.createActivationToken(user)

    this.emailSender.sendMail({
      subject: 'Ative sua conta!',
      email: user.email,
      template: './register-template.ejs',
      name: user.name,
      activationCode
    })

    return { activationToken }
  }

  async saveUser(activationToke: string, code: string) {
    const payload =
      await this.jwtTokenService.checkActiovationToken(activationToke)

    if (code !== payload.code) {
      return null //throw new error
    }

    const newUser = await this.userRepository.insert(payload.user)

    return { user: newUser }
  }
}

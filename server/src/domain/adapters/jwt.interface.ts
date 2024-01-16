export interface IJwtServicePayload {
  id: number
}

export interface IJwtServiceActivationTokenPayload {
  user: {
    email: string
    password: string
    name: string
  }
  code: string
}

export interface IJwtService {
  checkToken(token: string): Promise<any>
  checkActiovationToken(token: string): Promise<any>
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string
  ): string
  createActivationToken(
    payload: IJwtServiceActivationTokenPayload,
    secret: string,
    expiresIn: string
  ): string
}

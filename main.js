const express = require('express')
const jose = require('jose')
const oidcClient = require('openid-client')
const app = express()
const port = 3000
app.get('/', async (req, res) => {
  const authorization = req.headers['authorization']

  const accessToken = authorization?.replace(/bearer /gi, '')


  const issuer = await oidcClient.Issuer.discover("https://dev-tzeom-9o.us.auth0.com")
  const jwksUrl = new URL(issuer.metadata.jwks_uri)
  const jwks = jose.createRemoteJWKSet(jwksUrl)

  try {
    const {payload} = await jose.jwtVerify(accessToken, jwks)
    console.log(payload)

  } catch (e) {
    console.log(e)
    return res.sendStatus(401)
  }
  const result = {
    success: true
  }
  res.send(result)
})

app.listen(port, () => {
  console.log(`Dummy api listening on port ${port}`)
})

// private async verifyTokenAndGetJwtWithoutRetry(
//   token: string
// ): Promise<JWTPayload> {
//   const JWKS = await this.getJWKS()
//   const { payload } = await jwtVerify(token, JWKS)
//   return payload
// }
//
// private async getJWKS(): Promise<JWTVerifyGetKey> {
//   if (!this.cacheJWKS) {
//   const issuer = await Issuer.discover(
//     this.configService.get('oidc.issuerUrl')!
// )
//   this.cacheJWKS = createRemoteJWKSet(
//     new URL(new URL(issuer.metadata.jwks_uri!))
// )
// }
// return this.cacheJWKS
// }
// }
//
// const accessToken = authorization?.replace(/bearer /gi, '')


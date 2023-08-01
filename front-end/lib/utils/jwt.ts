import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const issuer = "urn:example:issuer";
const audience = "urn:example:audience";

export async function sign(payload: string): Promise<string> {
  const alg = "HS256";

  const jwt = await new SignJWT({ "urn:example:claim": true })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    // TODO: ver do que se trata esse issuer e esse audience depois
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime("2h")
    .sign(secret);

  return jwt;
}

export async function verify(jwt: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(jwt, secret, {
      issuer,
      audience,
    });

    // Run some checks on the returned payload to validate specific values
    // For example, you can check if a specific claim exists or has a certain value

    // TODO: validar se isso daqui tá certo
    if (payload) {
      return true; // Token is valid
    } else {
      return false; // Token is invalid
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return false; // Token verification failed
  }
}

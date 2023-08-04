// All properties on a domain are optional
export const domain = {
  name: "ScoreSync",
  version: "1",
  chainId: 80001,
} as const;

export const types = {
  User: [
    { name: "firstName", type: "string" },
    { name: "lastName", type: "string" },
    { name: "email", type: "string" },
  ],
} as const;

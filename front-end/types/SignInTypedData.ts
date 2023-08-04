// All properties on a domain are optional
export const domain = {
  name: "ScoreSync",
  version: "1",
  chainId: 80001,
} as const;

export const types = {
  Login: [{ name: "timestamp", type: "string" }],
} as const;

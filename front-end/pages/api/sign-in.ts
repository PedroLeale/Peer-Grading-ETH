import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../config/firebaseConfig";
import { verifyTypedData } from "ethers/lib/utils.js";
import { domain, types } from "@/types/SignInTypedData";
import { sign } from "@/lib/utils/jwt";

interface CreateRequest extends NextApiRequest {
  body: {
    signature: string;
    timestamp: string;
    // transactionHash: string;
  };
}

export default async function handler(
  req: CreateRequest,
  res: NextApiResponse
) {
  try {
    console.log("deu", req.body);

    const { signature, timestamp } = req.body;
    const signerAddress = verifyTypedData(
      domain,
      types,
      { timestamp },
      signature
    );

    // Check if email or signerAddress already exist
    const user = await db
      .collection("users")
      .where("signerAddress", "==", signerAddress)
      .get();

    if (user.empty) {
      res.status(400).json({ error: "user does not exist" });
    }

    const jwt = await sign(JSON.stringify({ signerAddress }));

    res.status(200).json({ ...user, jwt });
  } catch (error: any) {
    if (error.message) res.status(500).json({ error: error.message });
    res.status(500).json({ error: "Unable to post data." });
  }
}

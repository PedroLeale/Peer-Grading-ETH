import { NextResponse } from "next/server";
import * as Client from "@web3-storage/w3up-client";
import { StoreMemory } from "@web3-storage/access/stores/store-memory";
import { importDAG } from "@ucanto/core/delegation";
import { CarReader } from "@ipld/car";
import { File } from "buffer";
import * as Signer from "@ucanto/principal/ed25519";

async function getClient() {
  // Load client with specific private key
  const principal = Signer.parse(String(process.env.W3_KEY));
  const client = await Client.create({ principal, store: new StoreMemory() });

  // Add proof that this agent has been delegated capabilities on the space

  const proof = await parseProof(String(process.env.W3_PROOF));

  const space = await client.addSpace(proof);
  await client.setCurrentSpace(space.did());
  return client;
}

/** @param {string} data Base64 encoded CAR file */
async function parseProof(data: string) {
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, "base64"));
  for await (const block of reader.blocks()) {
    blocks.push(block);
  }
  // @ts-expect-error boilerpate for connecting
  return importDAG(blocks);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntries = Array.from(formData.entries());

  const files = [];
  for (const [fieldName, formDataEntryValue] of formDataEntries) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const blob = formDataEntryValue as Blob;
      // @ts-expect-error not using the type missing
      files.push(new File([blob], fieldName));
    }
  }

  const client = await getClient();

  // @ts-expect-error not using the incompatible interface
  const cid = await client.uploadDirectory(files);

  return NextResponse.json({ cid: cid.toString() });
}

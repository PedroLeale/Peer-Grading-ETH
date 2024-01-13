import { NextResponse } from "next/server";
// import { Web3Storage, File } from "web3.storage";

export async function POST(req: Request) {
  // const formData = await req.formData();
  // const formDataEntries = Array.from(formData.entries());

  // const files = [];
  // for (const [fieldName, formDataEntryValue] of formDataEntries) {
  //   if (
  //     typeof formDataEntryValue === "object" &&
  //     "arrayBuffer" in formDataEntryValue
  //   ) {
  //     const blob = formDataEntryValue as Blob;
  //     // Create a File object from the Blob and set its name.
  //     const file = new File([blob], fieldName);
  //     files.push(file);
  //   }
  // }

  // const client = new Web3Storage({
  //   token: String(process.env.WEB3_STORAGE_TOKEN),
  // });

  // const cid = await client.put(files);

  return NextResponse.json({ cid: "0x00" });
}

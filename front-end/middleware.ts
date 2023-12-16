import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
// import { verify } from "./lib/utils/jwt";

export default function middleware(req: NextRequest) {
  // const url = req.url;

  // if (url.includes("/dashboard") && jwt !== undefined) {
  //   try {
  //     verify(jwt);
  //     return NextResponse.next();
  //   } catch (error) {
  //     return NextResponse.redirect("/home");
  //   }
  // }

  return NextResponse.next();
}

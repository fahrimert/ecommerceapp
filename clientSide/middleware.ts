import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateSession } from "./lib/lib";

export async function middleware(request: NextRequest, res: NextResponse) {

  const session = cookies().get("session")?.value;

  /* şöyle bi mantık olması lazım  */
const routes = [ 
    `/AccountSettings`,
    `/AccountSettings/orders`,
    `/AccountSettings/account`,
    "/payment",
    "/shopping-bag"
]

  if (!session && routes.includes(request.nextUrl.pathname)  ) {
  return Response.redirect(new URL("/authPage", request.url));
} 
   if (session && request.nextUrl.pathname.startsWith("/authPage")) {
    return Response.error()
   }


   
return await updateSession(request);


}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)",'/AccountSettings/:path*'],
};

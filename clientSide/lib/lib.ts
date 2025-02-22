import { getJustSession } from "@/helpers/get-user-session";
import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.TOKEN_SECRET ;

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload:{
  basedUser: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    password: string | null;
    createdAt: Date;
    updatedAt: Date;
} | null})  {
    return await new SignJWT(payload!)
      .setProtectedHeader({ alg: "HS256" }) 
      .setIssuedAt() 
      .setExpirationTime("500s") 
      .sign(key)
  }

export async function decrypt(input:string | undefined): Promise<unknown> {
  //bura anydiydi burayı unkown yaptım 
    
  if (!input) {
    return null
  } 
    const { payload } = await jwtVerify(input!, key, {
      algorithms: ["HS256"], 
    });
    return payload;
  }
  export async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null; 
    return await decrypt(session); 
  }
  
  export async function updateSession(request: NextRequest) {
   const session = request.cookies.get("session")?.value; // Retrieve the session cookie value from the request
    if (!session) return; // If session is not found, return
    // Refresh the session expiration time
    const parsed = await decrypt(session)  as {
      basedUser: {
        id: string;
        name: string | null;
        email: string;
        emailVerified: Date | null;
        image: string | null;
        password: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null
      expires: string,
      iat: number,
      exp: number
    }
    const b  = new Date(Date.now() + 500 * 1000); // Set a new expiration time (10 seconds from now)
    const res = NextResponse.next(); // Create a new response
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed), // Encrypt and set the updated session data
      httpOnly: true,
      expires: b, // Set the expiration time
    });
    return res; // Return the response
  }

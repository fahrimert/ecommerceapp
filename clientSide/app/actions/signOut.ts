"use server";

import { cookies  } from "next/headers";
import { redirect } from "next/navigation";
export async function logout() {
  try {

    if (cookies().get("session") !== null) {
      cookies().delete("session")
    }
} catch (error) {
    console.log((error as Error).message);
}
redirect('/authPage')
}

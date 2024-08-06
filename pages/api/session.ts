import { NextApiRequest, NextApiResponse } from "next";
import { allowedOrigins } from "@/app/middleware";
import { auth } from "@/auth";
import Cookies from "js-cookie";
import cookie from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const origin = req.headers.origin || "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle the OPTIONS preflight request
  if (req.method === "OPTIONS") {
    if (isAllowedOrigin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Extension-ID"
      );
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.status(204).end();
    } else {
      res.status(403).end();
    }
    return;
  }
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("isAllowedOrigin", isAllowedOrigin);
  console.log("origin", origin);
  console.log(allowedOrigins);
  const extensionId = req.headers["x-extension-id"];

  if (extensionId !== "bbgippochabbclmbgkkbbofljdfnbdop") {
    return res.status(403).json({ error: "Forbidden" });
  }
  console.log("extensionId", extensionId);
  // const session = await auth(req, res);
  const cookies = cookie.parse(req.headers.cookie || "");
  const session = JSON.parse(cookies.session);
  console.log("session", session);
  const data = session;

  if (isAllowedOrigin) {
    console.log("setting headers");
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.status(201).json(data);
}

import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    // Clerk Express middleware attaches auth info on req.auth
    const { userId } = req.auth();
    if (!userId) {
      return res.status(401).json({ success: false, message: "not authorized" });
    }

    // Dev bypass for local testing
    if (process.env.CLERK_DEV_ALLOW_ALL === "true") {
      return next();
    }

    const user = await clerkClient.users.getUser(userId);

    // Allow by role in privateMetadata
    const hasAdminRole =
      user?.privateMetadata?.role === "admin" ||
      user?.publicMetadata?.role === "admin";

    // Allow by email whitelist
    const adminEmails = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const userEmail = user?.primaryEmailAddress?.emailAddress || "";
    const isWhitelisted = adminEmails.includes(userEmail);

    if (!hasAdminRole && !isWhitelisted) {
      return res.status(403).json({ success: false, message: "not authorized" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "not authorized" });
  }
};

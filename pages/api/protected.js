import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  // Proceed with your logic
  res.status(200).json({ message: "This is a protected route" });
};

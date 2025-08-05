import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Homepage from "@/components/Homepage";
import { ClientModel, UserModel } from "@/lib/models";
import { connectDB } from "@/lib/utils";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await connectDB();

  let clients = [];
  const drivers = await UserModel.find({ role: "driver" }).lean();

  if (session.user.role === "admin") {
    clients = await ClientModel.find({})
      .populate("assignedDriver", "name email phone")
      .lean();
  } else if (session.user.role === "driver") {
    clients = await ClientModel.find({ assignedDriver: session.user.id })
      .populate("assignedDriver", "name email phone")
      .lean();
  }

  const userWithId = {
    ...session.user,
    _id: session.user.id
  };

  return <Homepage
    user={userWithId}
    clients={JSON.parse(JSON.stringify(clients))}
    drivers={JSON.parse(JSON.stringify(drivers))}
  />;
}
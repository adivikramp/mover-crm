import { connectDB } from "@/lib/utils";
import { ClientModel } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { clientId, driverId } = await req.json();
        await connectDB();

        const update = driverId
            ? { assignedDriver: driverId }
            : { $unset: { assignedDriver: 1 } };

        const client = await ClientModel.findByIdAndUpdate(
            clientId,
            update,
            { new: true }
        ).populate("assignedDriver", "name email phone");

        if (!client) {
            return NextResponse.json(
                { error: "Client not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(client);
    } catch (error: unknown) {
        console.error("Assigning Driver Error", error);
        return NextResponse.json(
            { error: "Failed to assign driver" },
            { status: 500 }
        );
    }
}
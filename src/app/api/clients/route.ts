import { connectDB } from "@/lib/utils";
import { ClientModel } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const clients = await ClientModel.find().populate("assignedDriver", "name email phone");
        return NextResponse.json(clients);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error feteching clients", error)
        }
        return NextResponse.json(
            { error: "Failed to fetch clients" },
            { status: 500 }
        );
    }
}
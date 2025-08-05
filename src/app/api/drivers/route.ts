import { connectDB } from "@/lib/utils";
import { UserModel } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const drivers = await UserModel.find({ role: "driver" }).select("name email phone");
        return NextResponse.json(drivers);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Fetching Drivers Error", error)
        }
        return NextResponse.json(
            { error: "Failed to fetch drivers" },
            { status: 500 }
        );
    }
}
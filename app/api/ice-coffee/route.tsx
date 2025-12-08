import { NextRequest, NextResponse } from "next/server";
import iceCoffee from "./iceCoffee.json";

export function GET(request: NextRequest) {
    return NextResponse.json(iceCoffee)
}

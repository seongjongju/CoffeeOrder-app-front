import { NextRequest, NextResponse } from "next/server";
import hotCoffee from "./hotCoffee.json";

export function GET(request: NextRequest) {
    return NextResponse.json(hotCoffee)
}

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // 1. Await params to get the id cleanly
    const { id } = await params;

    // 2. Query MongoDB with the unwrapped id
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return new Response("Failed to fetch user prompts", { status: 500 });
  }
};
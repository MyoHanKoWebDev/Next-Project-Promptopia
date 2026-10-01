import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    // 1. MUST await params in Next.js 15+
    const { id } = await params;

    // Guard against invalid or missing ID during prerendering
    if (!id || id === "undefined" || id === "null") {
      return new Response("Invalid Prompt ID", { status: 400 });
    }

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("GET Prompt Error:", error);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    // 1. MUST await params in Next.js 15+
    const { id } = await params;

    if (!id || id === "undefined" || id === "null") {
      return new Response("Invalid Prompt ID", { status: 400 });
    }

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error("PATCH Prompt Error:", error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // 1. MUST await params in Next.js 15+
    const { id } = await params;

    if (!id || id === "undefined" || id === "null") {
      return new Response("Invalid Prompt ID", { status: 400 });
    }

    // 2. Use findByIdAndDelete instead of findByIdAndRemove
    await Prompt.findByIdAndDelete(id);

    return new Response("Successfully deleted", { status: 200 });
  } catch (error) {
    console.error("DELETE Prompt Error:", error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
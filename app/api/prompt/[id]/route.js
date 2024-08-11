import { connectToDb } from "../../../../utils/database"
import Prompt from "../../../../models/prompt";

// GET
export const GET = async (req, { params }) => {
    try {
        await connectToDb();
        
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response(JSON.stringify('Prompt not fount'), { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all prompt', { status: 500 })
    }
}

// PATCH
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDb();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response('Prompt not fount', { status: 404 })

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save();

        return new Response(existingPrompt, { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response('Failed to fetch all prompt', { status: 500 })
    }
}

// DELETE
export const DELETE = async (req, { params }) => {
    try {
        await connectToDb();

        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        return new Response('Prompt deleted sucessfully', { status: 200 })
    } catch (e) {
        return new Response('Failed to delete Prompt', { status: 500 })
    }
}

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(req.params.id).populate("creator");

    if (!prompt) {
      return res.status(404).json({ message: "Prompt Not Found!" });
    }

    return res.status(200).json(prompt);
  } catch (error) {
    console.error("Failed to fetch prompt:", error);
    return res.status(500).json({ message: "Failed to fetch prompt" });
  }
};

export const PATCH = async (req, res) => {
  const { prompt, tag } = req.body;

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(req.params.id);

    if (!existingPrompt) {
      return res.status(404).json({ message: "Prompt Not Found" });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return res.status(200).json(existingPrompt);
  } catch (error) {
    console.error("Failed to update prompt:", error);
    return res.status(500).json({ message: "Failed to update prompt" });
  }
};

export const DELETE = async (req, res) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Prompt Deleted Successfully" });
  } catch (error) {
    console.error("Failed to delete prompt:", error);
    return res.status(500).json({ message: "Failed to delete prompt" });
  }
};

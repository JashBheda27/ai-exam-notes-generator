import Notes from "../models/notes.model.js";
import UserModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
    try {
        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagrams = false,
            includeChart = false
        } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.credits < 10) {
            user.iscreditAvailable = false;
            await user.save();
            return res.status(403).json({ message: "Insufficient credits" });
        }

        const prompt = buildPrompt({ topic, classLevel, examType, revisionMode, includeDiagrams, includeChart });

        const aiResponse = await generateGeminiResponse(prompt);

        const notes = await Notes.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagrams,
            includeChart,
            content: aiResponse
        });

       user.credits -= 10;
       if (user.credits <= 0) user.iscreditAvailable = false;

       if (!Array.isArray(user.notes)) {
        user.notes = [];
       }

       user.notes.push(notes._id);

       await user.save();

       return res.status(200).json({ message: "Notes generated successfully", data : aiResponse,notesId: notes._id, remainingCredits: user.credits });

    } catch (error) {
      return res.status(500).json({ error: "AI Generation failed", message: error.message });
    }
}
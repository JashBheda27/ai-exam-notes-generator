
import express from "express"
import  isAuth  from "../middleware/isAuth.js"
import { generateNotes } from "../controllers/generate.controller.js"
import { getNotes, getSingleNotes } from "../controllers/notes.controller.js"



const notesRouter = express.Router()

notesRouter.post("/generate-notes", isAuth, generateNotes)
notesRouter.get("/getnotes", isAuth, getNotes)
notesRouter.get("/:id", isAuth, getSingleNotes)

export default notesRouter;
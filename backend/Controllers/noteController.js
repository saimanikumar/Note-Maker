// noteController.js
const Note = require('../Models/noteModel');

const createNote = async (req, res) => {
    try {
        const { userId, title, content } = req.body;
        const note = await Note.create({ userId, title, content });
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNotes = async (req, res) => {
    try {
        const userId = req.params.userId;
        const notes = await Note.find({ userId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createNote, editNote, deleteNote, getNotes, getNoteById };

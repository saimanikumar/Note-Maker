// const speechController = require('../Controllers/speechController');
const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const noteController = require('../Controllers/noteController');

// User routes
router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.loginUser);
router.post("/api/user/logout", userController.logout);
router.put("/api/user/:id", userController.updateUser);
router.delete("/api/user/:id", userController.deleteUser);

// Note routes
router.post('/api/user/note', noteController.createNote);
router.put('/api/user/note/:id', noteController.editNote);
router.delete('/api/user/note/:id', noteController.deleteNote);
router.get('/api/user/notes/:userId', noteController.getNotes);
router.get('/api/user/note/:id', noteController.getNoteById); // New route to get a note by ID


module.exports = router;

// // Speech routes
// router.post('/api/user/speech', speechController.saveSpeech);
// router.delete('/api/user/speech/:id', speechController.deleteSpeech);
// router.get('/api/user/speeches/:userId', speechController.getSpeeches);
// router.get('/api/user/wordFrequencies/:userId', speechController.getWordFrequencies); 
// router.get('/api/user/compareFrequencies/:userId', speechController.compareWordFrequencies); 
// router.get("/api/user/topPhrases/:userId", speechController.getTopPhrases); 
// router.get("/api/user/similarUsers/:userId", speechController.getSimilarUsers); 


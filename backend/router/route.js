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
router.get('/api/user/note/:id', noteController.getNoteById); 


module.exports = router;



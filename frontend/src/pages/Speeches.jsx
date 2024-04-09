import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Speeches.css"; // Import your CSS file for Speeches styling
import host from "../hostUrl";

const Speeches = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${host}/api/user/notes/${currentUser?.User?._id}`
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`${host}/api/user/note/${noteId}`);
      // Fetch notes again to update the list
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const renderNoteContent = (content) => {
    return { __html: content };
  };

  return (
    <div className="speeches-container">
      <h2 style={{ marginBottom: "20px" }}>Your Notes</h2>
      {loading ? (
        <p>Loading...</p>
      ) : notes.length === 0 ? (
        <p>No Notes Yet!</p>
      ) : (
        <div className="speech-cards">
          {notes.map((note) => (
            <div className="speech-card" key={note._id}>
              <div className="speech-text">
                <div className="custom-background_1">{note.title}</div>
                <div className="custom-background_12" dangerouslySetInnerHTML={renderNoteContent(note.content)} />
              </div>
              <div className="button-group d-flex justify-content-center custom-background">
                <Link to={`/noteEdit/${note._id}`}>
                  <button className="rounded-0">Edit</button>
                </Link>
                <button className="ms-2" onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Speeches;

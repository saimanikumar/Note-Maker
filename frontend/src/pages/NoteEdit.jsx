import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import host from "../hostUrl";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./Dashboard.css"; // Import the same CSS file used in Dashboard

const NoteEdit = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    isError: false,
  });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${host}/api/user/note/${id}`);
        setNote(response.data);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content, // Initial content
    onUpdate: ({ editor }) => {
      setNote({
        ...note,
        content: editor.getHTML(),
      });
    },
  });

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put(`${host}/api/user/note/${id}`, note);
      setNotification({ message: "Note saved!", isError: false });
    } catch (error) {
      console.error("Error saving note:", error);
      setNotification({ message: "Error saving note!", isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <h2>Edit Note</h2>
      <div className="note-title d-flex align-items-center justify-content-start w-75 mb-4">
        <label className="me-3 fs-5">Note Title:</label>
        <input
          type="text"
          className="form-control w-25 h-25 shadow-none"
          placeholder="Enter note title"
          value={note.title || ""}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
      </div>
      <div className="editor-container w-75" style={{ height: "480px", overflowY: "auto" }}>
        <EditorContent editor={editor} />
      </div>
      <div className="options w-75">
        <div className="button-group">
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            Strike
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            Code
          </button>
        </div>
        <div className="button-group">
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            Clear Marks
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().clearNodes().run()}
          >
            Clear Nodes
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Paragraph
          </button>
        </div>
        <div className="button-group">
          <button
            className="btn btn-outline-info"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            H4
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            H5
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            H6
          </button>
        </div>
        <div className="button-group">
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            Bullet List
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            Ordered List
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            Code Block
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            Blockquote
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Horizontal Rule
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            Hard Break
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().undo().run()}
          >
            Undo
          </button>
          <button
            className="btn btn-outline-info"
            onClick={() => editor.chain().focus().redo().run()}
          >
            Redo
          </button>
        </div>
      </div>
      <div className="save-button">
        <button
          className={`btn ${saving ? "btn-disabled" : "btn-info"}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Note"}
        </button>
      </div>
      {notification.message && (
        <div
          className={`notification ${
            notification.isError ? "error" : "success"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default NoteEdit;

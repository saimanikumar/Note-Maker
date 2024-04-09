import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import host from "../hostUrl";
import { useEditor, EditorContent } from "@tiptap/react";
import { AuthContext } from "../context/AuthContext";
import StarterKit from "@tiptap/starter-kit";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    isError: false,
  });
  const [noteTitle, setNoteTitle] = useState(""); // State to store note title

  const editor = useEditor({
    extensions: [StarterKit],
    autofocus: true,
    content: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
    <pre><code class="language-css">body {
    display: none;
    }</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
    `, // Initial content
    onUpdate: ({ editor }) => {
      // Update editor content state
      setEditorContent(editor.getHTML());
    },
  });
  const [editorContent, setEditorContent] = useState(""); // State to store editor content

  const saveNoteToBackend = async () => {
    try {
      if (!currentUser || !currentUser.User._id) {
        return;
      }

      // Save the HTML content
      const htmlContent = editor.getHTML();

      if (htmlContent.trim() === "") {
        setNotification({ message: "Note content is empty!", isError: true });
        return;
      }

      if (!noteTitle.trim()) {
        setNotification({
          message: "Please enter a note title!",
          isError: true,
        });
        return;
      }

      setSaving(true);

      const payload = {
        userId: currentUser.User._id,
        title: noteTitle,
        content: htmlContent,
      };

      await axios.post(`${host}/api/user/note`, payload);

      setNotification({ message: "Note saved!", isError: false });
    } catch (error) {
      console.error("Error saving note:", error);
      setNotification({ message: "Error saving note!", isError: true });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({ message: "", isError: false });
    }, 2000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <div className="dashboard-container">
      <h2>Your Notes</h2>
      <div className="note-title d-flex align-items-center justify-content-start w-75 mb-4">
        <label className="me-3 fs-5">Note Title:</label>
        <input
          type="text"
          id="noteTitle"
          className="form-control w-25 h-25 shadow-none"
          placeholder="Enter note title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
        />
      </div>

      <div className="editor-container w-75 " style={{ height: "480px" }}>
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
          onClick={saveNoteToBackend}
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

export default Dashboard;

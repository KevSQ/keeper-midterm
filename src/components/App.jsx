import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import notesData from './notes';

const App = () => {
    const [notes, setNotes] = useState(notesData);
    const [newNote, setNewNote] = useState({ title: '', content: '' });

    const isValidNote = ({ title, content }) => title && content;

    const addNote = () => {
        if (isValidNote(newNote)) {
            setNotes((prevNotes) => [...prevNotes, { ...newNote, key: Date.now() }]);
            setNewNote({ title: '', content: '' });
        }
    };

    const deleteNote = (id) => setNotes((prevNotes) => prevNotes.filter((note) => note.key !== id));

    return (
        <div>
            <Header />
            <div className="container">
                {notes.map((note) => (
                    <Note key={note.key} onDelete={() => deleteNote(note.key)} {...note} />
                ))}
            </div>
            <div className="add-note-form">
                <input
                    type="text"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <textarea
                    placeholder="Content"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
                <button onClick={addNote}>Add Note</button>
            </div>
            <Footer />
        </div>
    );
};

export default App;

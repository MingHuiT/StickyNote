// Before we add and more functionality to our app, let's lift up our state so we can have eaiser access to our note's and any other relevant state. 
// We'll do this by using the context API, and by setting a note context.

import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";
 
export const NoteContext = createContext();
 
const NotesProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState();

    const [selectedNote, setSelectedNote] = useState(null);
 
    useEffect(() => {
        init();
    }, []);
 
    const init = async () => {
        const response = await db.notes.list();
        setNotes(response.documents);
        setLoading(false);
    };
 
    const contextData = { notes, setNotes, selectedNote, setSelectedNote };
 
    return (
        <NoteContext.Provider value={contextData}>
            {loading ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                    }}
                >
                    <Spinner size="100" />
                </div>
            ) : (
                children
            )}
        </NoteContext.Provider>
    );
};
export default NotesProvider;
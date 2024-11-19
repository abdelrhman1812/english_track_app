import React from "react";
import IsLoading from "../common/IsLoading";
import NoteAction from "./NoteAction";

const NoteTable = ({
  notes,
  handleDeleteNote,
  handleUpdateNote,
  loading,
  isDeleted,
}) => {
  return (
    <>
      <div className="table-container">
        <div className="table-header">
          <div className="table-cell">Note</div>
        </div>
        <div className="table-body">
          {loading ? (
            <IsLoading />
          ) : (
            notes.map((note, index) => (
              <div className="table-row" key={index}>
                <div className="table-cell position-relative">
                  <pre>{note?.note}</pre>
                  {note?.voice && (
                    <audio
                      controls
                      className="w-50"
                      src={note?.voice?.secure_url}
                    ></audio>
                  )}
                  <NoteAction
                    isDeleted={isDeleted}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateNote={handleUpdateNote}
                    note={note}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NoteTable;

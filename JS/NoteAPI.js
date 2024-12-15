
export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem('AllNotes') || '[]')

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1
        })
    }

    static saveNote(noteToSave) {
        // passing object |
        // first we acces all the notes from the local storage
        const notes = NotesAPI.getAllNotes();

        // to edit note
        const existingnote = notes.find(note => note.id == noteToSave.id)
        if (existingnote) {

            existingnote.title = noteToSave.title
            existingnote.body = noteToSave.body
            existingnote.updated = new Date().toISOString()
        } else {
            // Generated id and date for the note
            noteToSave.id = Math.floor(Math.random()* 100 + 1)
            noteToSave.updated = new Date().toISOString()

            notes.push(noteToSave)
        }

        localStorage.setItem('AllNotes', JSON.stringify(notes))
    }

    static deleteNote(id){
        const notes = NotesAPI.getAllNotes();

        const newNotes = notes.filter(note => note.id != id)

        localStorage.setItem('AllNotes', JSON.stringify(newNotes))

    }
}

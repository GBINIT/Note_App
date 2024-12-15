import Notesview from "./NoteView.js"
import NotesAPI from './NoteAPI.js'

export default class App{
    constructor(root){
        this.notes =[]
        this.activenote = undefined
        this.view = new Notesview(root,this.handlers())

        this.refreshNote()
    }

    refreshNote(){
        const notes = NotesAPI.getAllNotes()

        this.setNotes(notes)

        if(notes.length > 0){
            this.setActiveNote(notes[0])
        }
    }

    setNotes(notes){
        this.notes = notes
        this.view.updateNoteList(notes)
        this.view.updatepreview(notes.length > 0)
    }

    setActiveNote(note){
        this.activenote = note
        this.view.updateActiveNote(note)
        
    }
    handlers(){
        return {
            onNoteSelect : noteid =>{
               const selectednote = this.notes.find(note => note.id == noteid)
               this.setActiveNote(selectednote)
            },
            onNoteAdd : ()=>{
                const newNote = {
                    title :'New Title',
                    body: 'New note'
                }

                NotesAPI.saveNote(newNote)
                this.refreshNote()
            },
            onNoteEdit:(title,body)=>{
                NotesAPI.saveNote({
                    id:this.activenote.id,
                    title,
                    body
                })

                this.refreshNote()
            },
            onNoteDelete:(noteid)=>{
                NotesAPI.deleteNote(noteid)
                this.refreshNote()
            }
        }
    }
}

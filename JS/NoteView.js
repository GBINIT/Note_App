export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <div class="sidebar">
            <button class="add-btn" type="button">Add Note <img src="https://cdn3.iconfinder.com/data/icons/user-interface-169/32/plus-64.png" alt="" srcset="" width="20px"></button>
            <div class="list-note">
            </div>
        </div>
        <hr class="divider">
        <div class="msg">
            <div class="greet-msg">${greet_msg}</div>
            <p class="info">${day}</p>
            <p class="info time-info"></p>
            
            <div class="note-preview">
            <input type="text" class="note-head" placeholder="New Note">
            <textarea class="note-body" placeholder='Take note..'></textarea>
            </div>
        </div>
        `;

        const btnAddNote = this.root.querySelector('.add-btn');
        const inptitle = this.root.querySelector('.note-head');
        const inpbody = this.root.querySelector('.note-body');

        btnAddNote.addEventListener('click', () => {
            this.onNoteAdd();
        });

        // if want to add eventlistener to more than one element can use the below method
        [inptitle, inpbody].forEach((inputfield) => {
            inputfield.addEventListener('blur', () => {
                const updatedtitle = inptitle.value.trim()
                const updatedbody = inpbody.value.trim()

                this.onNoteEdit(updatedtitle, updatedbody)
            })
        })

        this.updatepreview(false)
        // console.log(this.createNoteListHTML(69 , "binit" ,"gupta" , new Date()));
    }


    createNoteListHTML(id, title, body, updated) {

            // const maxbodylen = 60;
            const maxbodylen = 60;
            const truncatedBody = (body || '').substring(0, maxbodylen);
            const ellipsis = body && body.length > maxbodylen ? '...' : '';
          
        return `
        <div class="list-note-item selected-note" data-note-id ="${id}">

             <div class="note-title">${title}</div>
             <div class="note-content">
             ${truncatedBody}${ellipsis}
             </div>
             <button class ="delete-btn"><img src="https://cdn3.iconfinder.com/data/icons/font-awesome-regular-1/512/trash-can-64.png" width="30px"></button>
             <div class="note-time">
                  ${updated.toLocaleString(undefined , {datastyle : "short" , timestyle:'full'})}
               </div>
    </div>
        `;
    }
 
    updateNoteList(notes){
        const noteListContainer = this.root.querySelector('.list-note')
        noteListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this.createNoteListHTML(note.id , note.title , note.body , new Date(note.updated))

            noteListContainer.insertAdjacentHTML("beforeend",html)
        }

            // Add select and delete event to note
            noteListContainer.querySelectorAll('.list-note-item').forEach(noteitem =>{
                noteitem.addEventListener('click',()=>{
                    this.onNoteSelect(noteitem.dataset.noteId)
                })

                const deleteBtn = noteitem.querySelector('.delete-btn')
                
                deleteBtn.addEventListener('click',()=>{
                    const dodelete = confirm("Are you sure you want to delete the note ?")
    
                    if(dodelete){
                        this.onNoteDelete(noteitem.dataset.noteId)
                    }
                 })
            })

           
    }

    updateActiveNote(note){
        this.root.querySelector('.note-head').value = note.title;
        this.root.querySelector('.note-body').value = note.body;

        // this.root.querySelectorAll('.list-note-item').forEach(noteitem =>{
        //     noteitem.classList.remove('selected-note')
        // })
        
        // const selectednote =this.root.querySelector(`.list-note-item[data-note-id = ${note.id}]`)
        // if(selectednote){
        //     selectednote.classList.add('selected-note')
        // }
    }

    updatepreview(visible){
        this.root.querySelector('.note-preview').style.visibility = visible ? "visible" : "hidden"
    }

    

   

}

// For displaying Time and date info
// const greetEl = document.querySelector('.greet-msg')
const current_hour = new Date().getHours()
const day = new Date().toDateString()
setInterval(function(){
    let time = new Date().toLocaleTimeString()
    const timeEl = document.querySelector('.time-info')
    timeEl.textContent = time
    
},1000)

function getGreetingMsg(current_hour){
    let greeting ;
    if (current_hour >=5 && current_hour <12) {
        greeting = "Good Morning"
    }
    else if(current_hour >= 12 && current_hour <18){
        greeting = "Good Afternoon"
    }
    else{
        greeting = "Good Evening"
    }
    return greeting
        
}
const greet_msg = getGreetingMsg(current_hour)
 getGreetingMsg()


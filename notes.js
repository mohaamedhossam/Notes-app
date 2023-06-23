const fs = require('fs')
const chalk = require('chalk')
const text = 'error....'



const addNote = (title,body)=>
{
    const notes = loadNotes()
    
    const duplicateNote = notes.find((note)=> note.title === title)
    
    if(!duplicateNote)
     {
        notes.push({
            title : title,
            body : body
        })
        saveNotes(notes)
        console.log("added successfully")
     } else
     {
        console.log("note title taken")
     }

    
   
}

const removeNote = (title) => {
    
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)


    if (notes.length > notesToKeep.length)
    {
        console.log(chalk.green.inverse('note removed'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('no note found'))
    }
    
}

const listNotes = ()=>
{
    const notes = loadNotes()
    console.log(chalk.inverse('your notes :'))
    
    notes.forEach( (note)=> {
        console.log(note.title)
    })
    
}

const readNote = (title)=>
{
    const notes = loadNotes()

    const note = notes.find((note)=> note.title===title)
    if(note)
    {
        console.log(chalk.yellow.inverse(note.title)+' : '+note.body)
    }else
    {
        console.log(chalk.red.inverse('title note found'))
    }
    
}

const saveNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () =>
{
    try{
        
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)

    } catch (e){
        return []
    }

}
module.exports =
{
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}
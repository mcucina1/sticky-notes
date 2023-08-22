import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Note as NoteModel} from './models/note';
import Note from './components/Note';
import styles from "./styles/NotesPage.module.css"
import stylesUtils from "./styles/utils.module.css"
import * as NotesApi from "./network/notes_api"
import AddEditNoteDialog from './components/AddEditNoteDialog';
import {FaPlus} from "react-icons/fa"
import { Responsive, WidthProvider } from "react-grid-layout";
import '../node_modules/react-grid-layout/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive);

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null)

  useEffect(() => {
    async function loadNotes() {
      try{
        const notes = await NotesApi.fetchNotes()
        setNotes(notes)
      } catch (error){
        console.log(error)
        alert(error)
      }
    }
    loadNotes()
    
  },[])

  async function deleteNote(note: NoteModel) {
    try{
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch(error){
      console.error(error)
      alert(error)
    }
  }

  return (
      <Container>
        <Button 
          className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter} rounded-sm`}
          onClick={() => {setShowAddNoteDialog(true)}}>
          <FaPlus />
          Add new note
        </Button>
        <Row className='g-4'>
          <div>
            <ResponsiveGridLayout
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
              rowHeight={200}
             
              className="relative"
            >
            {notes.map(note => 
              <Col key={note._id}>
                <Note 
                  data-grid={{ minW:5}}
                  note={note} 
                  className={`${styles.note}`}
                  onNoteClicked={setNoteToEdit}
                  onDeleteNoteClicked={deleteNote}
                  />
              </Col>
              )}
            </ResponsiveGridLayout>
          </div>
        </Row>
        {showAddNoteDialog &&
        <AddEditNoteDialog 
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
          setNotes([...notes, newNote])
          setShowAddNoteDialog(false)
          }}
        />
        }
        {noteToEdit &&
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
          setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote))
          setNoteToEdit(null)
          }}
        />
        }
      </Container>
  )
}

export default App;

import {useSelector, useDispatch} from 'react-redux'
import {getTicket,  closeTicket} from '../../features/tickets/ticketSlice'
import BackButton from '../../componets/BackButton'
import Spinner from '../../componets/Spinner'
import Modal from 'react-modal'
import {useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {getNotes, createNote, reset as notesReset} from '../../features/notes/noteSlice'
import NoteItem from '../../componets/NoteItem'
import {FaPlus} from 'react-icons/fa'

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }

  Modal.setAppElement('#root')

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)

    const {notes, isLoading: noteIsLoading} = useSelector((state) => state.notes)

    const params = useParams()
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line
    }, [isError, ticketId, message])

    //Close ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')

        navigate('/tickets')
    }

    // Create note submit 
    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({noteText, ticketId}))
        closeModal()
    }

    // Open/close modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)
 
    if(isLoading || noteIsLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Something Went Wrong</h3>
    }

  return (
    <div className='ticket-page'>
        <header className='ticket-header'>
            <BackButton url='/tickets'/>
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-RU')}</h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
        </header>

        {ticket.status !== 'closed' && (
            <button onClick={openModal} className='btn'><FaPlus />Add Note</button>
        )}

<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

        {notes.map((note) => (
            <NoteItem key={note._id} note={note} />
        ))}

        {ticket.status !== 'closed' && (
            <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close Ticket</button>
        )}
    </div>
  )
}

export default Ticket
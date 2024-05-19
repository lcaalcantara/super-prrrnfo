import './Modal.css'

function Modal({ showModal, setShowModal, modalText, modalTitle, modalColor }) {

    return (
        <>
            {showModal &&
                <div className={`modal ${modalColor}`}>
                    <h1>{modalTitle}</h1>
                    <span>{modalText}</span>
                    <button onClick={() => setShowModal(false)}>Fechar</button>
                </div>
            }
        </>
    )

}

export default Modal

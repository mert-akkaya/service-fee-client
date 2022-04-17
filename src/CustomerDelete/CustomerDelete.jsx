import { useState } from 'react'
import { Modal, Button } from "react-bootstrap"

function CustomerDelete({customer,deleteDatabase}) {


  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <div className="d-flex align-items-center justify-content-center" >
        <Button size='sm' variant="primary" onClick={handleShow}>
          X
        </Button>
      </div>
      <Modal centered className='' show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{
            deleteDatabase(customer);
            handleClose()
            }} >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomerDelete
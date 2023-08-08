import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import "./cards.css"



function SingleCard(props) {
    const toUpper = (stringToUpper) => {
        return stringToUpper.charAt(0).toUpperCase() + stringToUpper.slice(1)
    }

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    return (
        <>
            <Card border="warning" bg='dark' text='light'>
                <img src={props.pokemon_img} />
                <Card.Body>
                    <Card.Title >{toUpper(props.pokemon_name)} </Card.Title>
                </Card.Body >
                <Card.Text text="light">
                    Number:  {props.pokemon_id}
                    <br />
                    Ability: {props.pokemon_ability}
                    <br />


                </Card.Text>
                <Button variant='secondary' onClick={handleShow}>
                    More Info...
                </Button>
            </Card>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{toUpper(props.pokemon_name)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row '>
                        <div className='col-6 '>
                            <img id='modal-img' src={props.pokemon_img}></img>
                        </div>

                        <div className='col-6'>
                            <b>Number:</b>  {props.pokemon_id}
                            <br />
                            <b>Ability:</b> {toUpper(props.pokemon_ability)}
                            <br />
                            <b>Weight:</b> {
                                props.pokemon_weight
                            } kg
                            <br />
                            <b>Type:</b>
                            {toUpper(props.pokemon_type1 + "/" + props.pokemon_type2)}
                            <br />
                            <b>Move:</b>
                            {toUpper(props.pokemon_move.move.name)}
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


        </>

    )
}

export default SingleCard

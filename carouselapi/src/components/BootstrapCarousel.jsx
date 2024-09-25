import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import { RiCloseLargeLine } from "react-icons/ri";


const BootstrapCarousel =() => {
  const[imagenes, setImagenes]=useState([]);
  const [show, setShow] = useState(false);
  const [seleccion, setSeleccion] = useState('');

    useEffect(()=>{
        axios.get("https://picsum.photos/v2/list").then((resp)=>{
            console.log(resp.data);
            setImagenes(resp.data)
        })
    },[])

    const handleClose = () => {
        setShow(false);
        setSeleccion(''); 
    }
    const handleShow = (url) => {
        setSeleccion(url);
        setShow(true);}

    
    

  return (
    <>
    <Row>
    <Carousel>
      {imagenes.map((data,i)=>{
        return (
          <Carousel.Item  key={i}>
            <img className="d-block w-100 carousel-image"
              src={data.download_url}
              alt={data.author}
               
            />
          <Carousel.Caption>
            <h2 style={{fontWeight:'bolder'}}>{data.author}</h2>
            <Button variant="secondary" onClick={() => handleShow(data.download_url)}>Ver Imagen Completa</Button>
          </Carousel.Caption>
          </Carousel.Item>
      )}
      )}
    </Carousel>
    </Row>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
        <img
            src={seleccion}
            alt="Imagen seleccionada"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{fontSize: '42px', background: 'transparent', borderColor: 'transparent'}}>
            <RiCloseLargeLine />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default BootstrapCarousel;

import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import { RiCloseLargeLine } from "react-icons/ri";

const ReactCarousel = () => {
    const[imagenes, setImagenes]=useState([]);
    const [show, setShow] = useState(false);
    const [seleccion, setSeleccion] = useState(null);

    useEffect(()=>{
        axios.get("https://picsum.photos/v2/list").then((resp)=>{
            console.log(resp.data);
            setImagenes(resp.data)
        })
    },[])

  const onChange = (index) => {
    console.log('Changed to slide:', index);
  };

  const onClickItem = (index) => {
    console.log('Clicked on item:', index);
  };

  const onClickThumb = (index) => {
    console.log('Clicked on thumbnail:', index);
  };

  const abrirImagen = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};


const handleClose = () => {
  setShow(false);
  setSeleccion(null); 
}
const handleShow = (url) => {
  setSeleccion(url);
  setShow(true);}

  return (
    <div style={{ maxWidth: '100%', overflow: 'hidden' }} className='carousel-container'>
        <Carousel 
        showArrows={true}
        showThumbs={false}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
        autoPlay
        infiniteLoop
        style={{zIndex:1}}
        >
        
            {imagenes.map((data,i)=>{
                return (
                    <div key={i} style={{position: 'relative', height: '70vh'}}>
                        <img  src={data.download_url} 
                        alt={data.author}
                        style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                        }}
                        />
                        <div className="legend" style={{ position: 'absolute'}}>
                                <h2 style={{ margin: '0' }}><strong>{data.author}</strong></h2>
                                <button 
                                    onClick={() => handleShow(data.download_url)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '10px 20px',
                                        backgroundColor: '#343a40',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '10px'
                                    }}
                                >
                                Ver Imagen Completa
                                </button>
                            </div>
                    </div>
                )}
            )}
        </Carousel>
        <Modal
        isOpen={show}         // Controlar si el modal está visible o no
        onRequestClose={handleClose} // Cerrar el modal al hacer clic fuera
        contentLabel="Ver Imagen Completa"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto%',
            maxWidth: '80%',
            maxHeight: '80%',
            overflow: 'hidden',
            backgroundColor: '#090a11cc',
            padding: '10px',
            borderRadius: '10px',
            zIndex: 1000
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        <button onClick={handleClose} style={{ float: 'right', cursor: 'pointer', background: '#090a11cc', border: 'none', fontSize: '20px' }}><RiCloseLargeLine /></button>
        {seleccion && (
          <img
            src={seleccion}
            alt="Imagen seleccionada"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ReactCarousel;
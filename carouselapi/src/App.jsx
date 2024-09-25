import './App.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container'
import BootstrapCarousel from './components/BootstrapCarousel';
import ReactCarousel from './components/ReactCarousel';
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FaReact } from 'react-icons/fa'; 
import { SiBootstrap } from 'react-icons/si'; 
import { SiReactbootstrap } from "react-icons/si";


function App() {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Bootstrap', value: '1', icon: <SiBootstrap />},
    { name: 'React', value: '2', icon: <FaReact /> },
  ];

  const renderizarCarousel = () => {
    if (radioValue === '1') {
      return <BootstrapCarousel />;
    } else {
      return <ReactCarousel />;
    }
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg" >
        <Container>
          <Navbar.Brand href="#home">
            <h2><SiReactbootstrap/> <span style={{ fontSize: '22px', textTransform: 'uppercase' }}>Prueba de Carousel</span></h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
            </Nav>
            <ButtonGroup className="mb-2">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="secondary"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.icon} {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Navbar.Collapse>
        </Container>
      </Navbar>
            
      {/* CONDICIONAL para el BOTON */}
      {renderizarCarousel()}
      
    </>
  )
}

export default App
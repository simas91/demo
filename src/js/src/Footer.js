import React from 'react';
import Container from './Container';
import { Button, Avatar } from 'antd';
import './Footer.css';

const Footer = (props) => (
    <div className='footer'>
        <Container>
            {props.numberOfVehicles !== undefined ? 
            <Avatar 
                style={{backgroundColor: '#f56a00', marginRight: '5px'}} 
                size='large'>{props.numberOfVehicles}</Avatar> : null}
            <Button onClick={() => props.handleAddVehicleClickEvent()} type='primary'>Add new Vehicle +</Button>
        </Container>
    </div>
);

export default Footer;
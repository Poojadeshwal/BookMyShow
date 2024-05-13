import React from 'react';
import { Carousel } from 'antd';
const contentStyle = {
  height: '700px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  width:"100%"
};
const Carousels = () => {
  // console.log('Caraousels page accessed')
  return (
  <Carousel effect="fade" autoplay>
    <div>
      <img style={contentStyle}  src="assets\movie-images\BadeMiyan.jpg" alt="Logo"/>
    </div>
    <div>
    <img  style={contentStyle} src="assets\eventDetail\nizami.avif" alt="Logo"/>
    </div>
    <div>
      <img style={contentStyle} src="assets\movie-images\article370.jpg" alt="Logo"/>
    </div>
    <div>
      <img style={contentStyle}  src="assets\eventDetail\pottery.avif" alt="Logo"/>
    </div>
  </Carousel>
)
};
export default Carousels;
import React from 'react';
import { Row, Col } from 'react-bootstrap';

const BrandFilter = ({ selectedBrand, onBrandClick }) => {
  return (
    <Row className='mb-4' style={{ color: 'black' }}>
      <Col>
        <h5>Hãng:</h5>
        <ul className='list-inline'>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedBrand === '' ? 'active' : ''
              }`}
              onClick={() => onBrandClick('')}
            >
              Tất cả
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedBrand === 'Shell' ? 'active' : ''
              }`}
              onClick={() => onBrandClick('Shell')}
            >
              Shell
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedBrand === 'Durex' ? 'active' : ''
              }`}
              onClick={() => onBrandClick('Durex')}
            >
              Durex
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedBrand === 'SO' ? 'active' : ''
              }`}
              onClick={() => onBrandClick('SO')}
            >
              SO
            </button>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default BrandFilter;

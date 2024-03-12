import React from 'react';
import { Row, Col } from 'react-bootstrap';

const CategoryFilter = ({ selectedCategory, onCategoryClick }) => {
  return (
    <Row className='mb-4' style={{ color: 'black' }}>
      <Col>
        <h5>Chọn theo nhu cầu:</h5>
        <ul className='list-inline'>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedCategory === '' ? 'active' : ''
              }`}
              onClick={() => onCategoryClick('')}
            >
              Tất cả
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedCategory === 'Siêu mỏng' ? 'active' : ''
              }`}
              onClick={() => onCategoryClick('Siêu mỏng')}
            >
              Siêu Mỏng
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedCategory === 'Hương' ? 'active' : ''
              }`}
              onClick={() => onCategoryClick('Hương')}
            >
              Hương Thơm
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedCategory === 'Kéo dài thời gian' ? 'active' : ''
              }`}
              onClick={() => onCategoryClick('Kéo dài thời gian')}
            >
              Kéo Dài Thời Gian
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              type='button'
              className={`btn btn-outline-primary ${
                selectedCategory === 'Gân và điểm nổi' ? 'active' : ''
              }`}
              onClick={() => onCategoryClick('Gân và điểm nổi')}
            >
              Gân & Điểm Nổi
            </button>
          </li>
        </ul>
      </Col>
    </Row>
  );
};

export default CategoryFilter;

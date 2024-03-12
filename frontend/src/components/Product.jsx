import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card
      className='my-3 p-3 rounded'
      style={{ backgroundColor: 'rgb(255, 243, 230)' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} comments`}
          />
        </Card.Text>

        <Card.Text as='h3' style={{ color: 'rgb(0, 51, 0)' }}>
          {product.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

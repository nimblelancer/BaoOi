import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from '../slices/productsApiSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review created successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= product.countInStock) {
      setQty(newQuantity);
    } else {
      window.alert('Quantity must be between 1 and', product.countInStock);
    }
  };

  return (
    <>
      <Link
        className='btn btn-light my-3'
        to='/'
        style={{
          backgroundColor: 'rgb(255, 224, 102)',
          color: 'black',
        }}
      >
        <b>Back</b>
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Row>
            <Col md={5}>
              <Image
                src={product.image}
                alt={product.name}
                className='border border-light'
                fluid
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
              />
            </Col>
            <Col md={7}>
              <Row>
                <Col md={6}>
                  <ListGroup.Item>
                    <h3 style={{ color: 'black', marginBottom: '25px' }}>
                      {product.name}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} comments`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      color: 'black',
                      marginTop: '40px',
                      fontSize: '45px',
                    }}
                  >
                    {product.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </ListGroup.Item>
                </Col>
                <Col md={6}>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item style={{ color: 'black' }}>
                        <Row>
                          <Col>
                            <b>Giá:</b>
                          </Col>
                          <Col>
                            {product.price.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item style={{ color: 'black' }}>
                        <Row>
                          <Col>
                            <b>Trạng thái:</b>
                          </Col>
                          <Col>
                            {product.countInStock > 0
                              ? 'Còn hàng'
                              : 'Hết hàng'}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {product.countInStock > 0 && (
                        <ListGroup.Item style={{ color: 'black' }}>
                          <Row>
                            <Col>
                              <b>Số lượng</b>
                            </Col>
                            <Col>
                              <InputGroup className='product-quantity mb-3'>
                                <FormControl
                                  type='number'
                                  min='1'
                                  max={product.countInStock}
                                  value={qty}
                                  onChange={handleQuantityChange}
                                  style={{ color: 'black' }}
                                />
                              </InputGroup>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <Button
                          className='btn-block'
                          type='button'
                          disabled={product.countInStock === 0}
                          onClick={addToCartHandler}
                          style={{
                            backgroundColor: 'rgb(255, 224, 102)',
                            color: 'black',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                            border: 'none',
                          }}
                        >
                          <b>Add To Cart</b>
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <ListGroup.Item
                    style={{ color: 'rgb(77, 77, 77)', fontSize: '15px' }}
                  >
                    {product.description.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </ListGroup.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='review'>
            <Col md={6}>
              <h2>Comments</h2>
              {product.reviews.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a comment</h2>

                  {loadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='my-2' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className='my-2' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Post
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;

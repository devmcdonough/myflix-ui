import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

export const UpdateUser = ({userData, handleUpdate, handleSubmit, handleDeregister}) => {
    return (
      <Row>
          <Form onSubmit={handleSubmit}>
              <h3>Update profile information</h3>
              <Form.Group className='mb-2'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                  type="text"
                  minLength={4}
                  value={userData.username}
                  onChange={(e) => handleUpdate(e)}
                  required
                  />
              </Form.Group>
              <Form.Group className='mb-2'>
                  <Form.Label>Password:
                  <p>Your new password must be at least 8 characters long.</p>
                  </Form.Label>
                  <Form.Control
                  type="password"
                  minLength={8}
                  value={userData.password}
                  onChange={(e) => handleUpdate(e)}
                  required
                  />
              </Form.Group >
              <Form.Group className='mb-2'>
              <Form.Label> Email: </Form.Label>
              <Form.Control
                  type="email"
                  value={userData.email}
                  onChange={(e) => handleUpdate(e)}
                  required
              />
              </Form.Group>
              <Form.Group className='mb-4'>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                  type="date"
                  value={userData.birthDay}
                  onChange={(e) => handleUpdate(e)}
                  required
                  />
              </Form.Group>
              <Button variant="primary" type="submit" >Submit Changes</Button>
              <Button
              onClick={() => handleDeregister()}
              variant="danger"
              className="mx-3" >
               Delete account
              </Button>
          </Form>
      </Row>
    )
  }

  export default UpdateUser;
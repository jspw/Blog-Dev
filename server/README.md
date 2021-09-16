- route : `POST` "/user/create" :

  req :

  ```json
  {
    "firstName": "Shifast",
    "lastName": "Mh",
    "email": "mhhi@g.com",
    "password": "123456",
    "location": "Dhaka",
    "phone": "01713908988",
    "type": "customer"
  }
  ```

  response :

  ```json
  {
    "id": 2,
    "firstName": "Shifast",
    "lastName": "Mh",
    "email": "mhhi@g.com",
    "phone": "01713908988",
    "location": "Dhaka",
    "type": "customer",
    "updatedAt": "2021-09-15T10:27:36.645Z",
    "createdAt": "2021-09-15T10:27:36.645Z"
  }
  ```

- route : `POST` "/products/create" :

  req :

  ```json
  {
    "name": "I-Phone 11",
    "sellingPrice": 120.9,
    "regularPrice": 100.5,
    "image": "url",
    "rating": 3.5,
    "description": "Kono description nai re vai!"
  }
  ```

  response :

  ```
  {
    "id": 1,
    "name": "I-Phone 11",
    "sellingPrice": 120.9,
    "regularPrice": 100.5,
    "image": "url",
    "rating": 3.5,
    "description": "Kono description nai re vai!",
    "updatedAt": "2021-09-15T07:41:27.225Z",
    "createdAt": "2021-09-15T07:41:27.225Z"
  }

  ```

- route : `POST` "/categories/create" :

  req :

  ```json
  {
    "name": "Fruits"
  }
  ```

  response :

  ```json
  {
    "id": 1,
    "name": "Fruits",
    "updatedAt": "2021-09-15T17:12:14.111Z",
    "createdAt": "2021-09-15T17:12:14.111Z"
  }
  ```

- route : `GET` "/user/userId" :

  response :

  ```json
  {
    "id": 3,
    "firstName": "Shifast",
    "lastName": "Mh",
    "email": "mhhi@g.com",
    "phone": "01713908988",
    "location": "Dhaka",
    "type": "customer",
    "createdAt": "2021-09-15T10:49:01.000Z",
    "updatedAt": "2021-09-15T10:49:01.000Z"
  }
  ```

- route : `GET` "/categories" :

  response :

  ```json
  [
    {
      "id": 1,
      "name": "Fruits",
      "image": null,
      "createdAt": "2021-09-15T17:12:14.000Z",
      "updatedAt": "2021-09-15T17:12:14.000Z"
    }
  ]
  ```

- route : `GET` "/products" :

  response :

  ```json
  [
    {
      "id": 1,
      "name": "I-Phone 10",
      "sellingPrice": 120.9,
      "regularPrice": 100.5,
      "image": "url",
      "rating": 3.5,
      "description": "Kono description nai re vai!",
      "createdAt": "2021-09-15T11:21:50.000Z",
      "updatedAt": "2021-09-15T11:21:50.000Z"
    }
  ]
  ```

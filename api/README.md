<!-- Auth  -->

<!-- User -->

- route : `POST` "/user/create" :

  req :

  ```json
  {
    "username": "jspw",
    "firstName": "Mh",
    "lastName": "Shifat",
    "email": "mh@gmail.com",
    "password": "123456",
    "address": "Dhaka",
    "github": "github.com/jspw"
  }
  ```

  response :

  ```json
  {
    "id": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
    "username": "jspw",
    "email": "mh@gmail.com",
    "github": "github.com/jspw",
    "firstName": "Mh",
    "lastName": "Shifat",
    "address": "Dhaka",
    "updatedAt": "2021-09-17T06:11:42.879Z",
    "createdAt": "2021-09-17T06:11:42.879Z"
  }
  ```

- route : `GET` "/user/userId" :

  response :

  ```json
  {
    "id": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
    "firstName": "Mh",
    "lastName": "Shifat",
    "username": "jspw",
    "email": "mh@gmail.com",
    "password": "$2b$10$NFQu2nkDTPh44kS7Wl0pR.g1887b7DRs3W.e3w6mzM/rllenFo/ci",
    "bio": null,
    "github": "github.com/jspw",
    "address": "Dhaka",
    "birthday": null,
    "createdAt": "2021-09-17T06:11:42.000Z",
    "updatedAt": "2021-09-17T06:11:42.000Z",
    "followers": [
      {
        "followerId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
        "user": {
          "id": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
          "username": "jspw"
        }
      },
      {
        "followerId": "90c39103-77b0-4277-a956-839f81e8a7da",
        "user": {
          "id": "90c39103-77b0-4277-a956-839f81e8a7da",
          "username": "mh"
        }
      }
    ],
    "blogs": [
      {
        "id": "76f52aa0-8c93-4490-87d1-690b7937fd31",
        "title": "Hudai Ajaira Blog",
        "comments": [
          {
            "id": "0d3ab1b5-0317-4fbd-9a7e-17f6327c0310",
            "content": "khub vlo kaj vai"
          }
        ]
      }
    ]
  }
  ```

<!-- Category  -->

- route : `POST` "/categories/create" :

  req :

  ```json
  {
    "name": "Tech"
  }
  ```

  response :

  ```json
  {
    "id": "71bc7b79-fa70-4560-8dd6-b35ffb89afd1",
    "name": "Tech",
    "updatedAt": "2021-09-17T06:17:30.000Z",
    "createdAt": "2021-09-17T06:17:30.000Z"
  }
  ```

- route : `GET` "/category" :

  response :

  ```json
  [
    {
      "id": "71bc7b79-fa70-4560-8dd6-b35ffb89afd1",
      "name": "Tech",
      "createdAt": "2021-09-17T06:17:30.000Z",
      "updatedAt": "2021-09-17T06:17:30.000Z",
      "blogs": [
        {
          "id": "76f52aa0-8c93-4490-87d1-690b7937fd31",
          "title": "Hudai Ajaira Blog",
          "content": "Baler content amr!",
          "createdAt": "2021-09-17T06:21:33.000Z",
          "updatedAt": "2021-09-17T06:21:33.000Z",
          "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
          "categoryId": "71bc7b79-fa70-4560-8dd6-b35ffb89afd1"
        }
      ]
    }
  ]
  ```

<!-- blog -->

- route : `POST` "/blog/create" :

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

- route : `GET` "/blog/:BlogTitle" :

  response :

  ```json
  {
    "id": "76f52aa0-8c93-4490-87d1-690b7937fd31",
    "title": "Hudai Ajaira Blog",
    "content": "Baler content amr!",
    "createdAt": "2021-09-17T06:21:33.000Z",
    "updatedAt": "2021-09-17T06:21:33.000Z",
    "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
    "categoryId": "71bc7b79-fa70-4560-8dd6-b35ffb89afd1",
    "user": {
      "id": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
      "username": "jspw"
    },
    "category": {
      "id": "71bc7b79-fa70-4560-8dd6-b35ffb89afd1",
      "name": "Tech"
    },
    "comments": [
      {
        "id": "0d3ab1b5-0317-4fbd-9a7e-17f6327c0310",
        "content": "khub vlo kaj vai",
        "user": {
          "id": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
          "username": "jspw"
        }
      }
    ],
    "reacts": [
      {
        "id": "11a6c1c1-9dcc-4fa0-af75-dc1d39664c79",
        "user": {
          "id": "90c39103-77b0-4277-a956-839f81e8a7da",
          "username": "mh"
        }
      }
    ]
  }
  ```

  - route : `GET` "/blog/all" :

  response :

  ```json
  [
    {
      "id": "76f52aa0-8c93-4490-87d1-690b7937fd31",
      "title": "Hudai Ajaira Blog",
      "content": "Baler content amr!",
      "createdAt": "2021-09-17T06:21:33.000Z",
      "updatedAt": "2021-09-17T06:21:33.000Z",
      "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
      "categoryId": "71bc7b79-fa70-4560-8dd6-b35ffb89afd1",
      "comments": [
        {
          "id": "0d3ab1b5-0317-4fbd-9a7e-17f6327c0310",
          "content": "khub vlo kaj vai",
          "user": {
            "id": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
            "username": "jspw"
          }
        }
      ],
      "reacts": [
        {
          "id": "11a6c1c1-9dcc-4fa0-af75-dc1d39664c79"
        }
      ]
    }
  ]
  ```

<!-- comment  -->

- route : `POST` "/comment/create" :

req :

```json
{
  "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
  "blogId": "76f52aa0-8c93-4490-87d1-690b7937fd31",
  "content": "khub vlo kaj vai"
}
```

response :

```json
{
  "id": "0d3ab1b5-0317-4fbd-9a7e-17f6327c0310",
  "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
  "blogId": "76f52aa0-8c93-4490-87d1-690b7937fd31",
  "content": "khub vlo kaj vai",
  "updatedAt": "2021-09-17T06:37:49.477Z",
  "createdAt": "2021-09-17T06:37:49.477Z"
}
```

<!-- React -->

- route : `POST` "/react/create" :

req :

```json
{
  "blogId": "76f52aa0-8c93-4490-87d1-690b7937fd31",
  "userId": "90c39103-77b0-4277-a956-839f81e8a7da"
}
```

response :

```json
{
  "message": "Reacted"
}
```

<!-- follower -->

- route : `POST` "/follower/create" :

req :

```json
{
  "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
  "followerId": "90c39103-77b0-4277-a956-839f81e8a7da"
}
```

response :

```json
{
  "id": "e89f9685-f18d-4fba-a3fe-b933ad1fcde3",
  "followerId": "90c39103-77b0-4277-a956-839f81e8a7da",
  "userId": "c8996fe6-22a1-44d4-bc5e-96c5d4db531e",
  "updatedAt": "2021-09-17T06:43:09.190Z",
  "createdAt": "2021-09-17T06:43:09.190Z"
}
```

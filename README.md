# Image Processing API

This api can be used to resize your image in `/images/full` and output to `/images/thumb` with the width and height you want.

## Usage

### Start the server

You could start the sever by running:

```
npm run start
```

then a `dist` folder will be produced and you will see `Server started at http://localhost:3000` shown in your console. This means the server is running correctly.

### Go to `/images` API

You could click the link that is display on `http://localhost:3000` or go to `http://localhost:3000/images` directly. Without sending any query parameters, an error message should be shown up as a response to the client side.

### Passing Query Parameters to the API

**3** query parameters can be added to the API. They are listed below.

1. filename
2. width
3. height

Several reminders while using this API:

- If a wrong `filename` or no `filename` is provided as a query param to the API, an error message will be sent to the client side.

- If `width` or `height` params are provided, an image file with this certain width and height will be generated and save to `/images/thumb`. Otherwise, the image with original size will be shown up.

- If either `width` or `height` param contains **negative number, string or a zero**, these params will be ignored and the image with original size will be shown up.

## Dependencies

- Express
- Jasmine
- Sharp
- Typescript
- nodemon
- prettier
- supertest
- eslint

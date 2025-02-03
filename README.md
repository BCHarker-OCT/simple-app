# 😎 Simple App
A simple app that can be deployed for testing in your kubernetes clusters. 

## 🧪 Environment Variables 

There are currently 3 environment variables for this app: 

- `PORT` which defaults to `9000` 
- `APP_GREETING` with a default `Hello, World!` this variable tests setting a plaintext value and retrivieing it. 
- `MAGIC_WORD` this value would optimally be retrieved from a secret password store. The value is shown plaintext on the web page, but is not intended to secure anything and merely test that retrieval and deployment is working correctly. 

## 🖥️ Final Product 

A final deployed product should produce an HTML page with our greeting, dynamically generated color of the day, and magic word pulled from our secret variable. Of course, your page will vary based on how you choose to set your variables. 

<img src="example-result.png" alt="picture showing output of a fully deployed app" title="Deployment Final Product" width="400" height="300">
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/success', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Registration Success</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body, html {
          height: 100%;
          font-family: Arial, sans-serif;
          overflow: hidden;
        }
        video {
          position: fixed;
          right: 0;
          bottom: 0;
          min-width: 100%;
          min-height: 100%;
          object-fit: cover;
          z-index: -1;
        }
        .container {
          position: relative;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.4);
          padding: 20px;
        }
        .left, .right {
          flex: 1;
          max-width: 50%;
          height: auto;
          color: #fff;
          padding: 40px;
        }
        .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .left h1 {
          font-size: 48px;
          margin-bottom: 20px;
          color: #ffffff;
          text-shadow: 2px 2px 8px #000;
        }
        .left p {
          font-size: 20px;
          color: #ddd;
        }
        .right {
          background: rgba(255,255,255,0.9);
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
          text-align: center;
        }
        .right h2 {
          color: #2575fc;
          margin-bottom: 20px;
        }
        .right p {
          font-size: 16px;
          color: #333;
          margin-bottom: 30px;
        }
        .btn {
          display: inline-block;
          background-color: #2575fc;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #6a11cb;
        }
      </style>
    </head>
    <body>
      <video autoplay muted loop>
        <source src="front_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div class="container">
        <div class="left">
          <h1>Welcome to Cognifyz!</h1>
          <p>Transforming your future with innovative solutions.<br> Thank you for joining us!</p>
        </div>

        <div class="right">
          <h2>🎉 Registration Successful!</h2>
          <p>Thank you for registering.<br>Your information has been saved successfully!</p>
          <a href="/" class="btn">Go Back to Form</a>
        </div>
      </div>
    </body>
    </html>
  `);
});

let tempData = [];

app.post('/submit', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send("All fields are required.");
  }

  const data = { name, email, age };
  tempData.push(data);

  fs.writeFileSync('data.json', JSON.stringify(tempData, null, 2));

  res.redirect('/success');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

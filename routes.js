const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // res.setHeader("Content-Type", "text/html");

    res.write(
      `
        <html>
          <head><title>Message</title></head>
          <body>
              <form action ='/message' method='POST'>
                <input type='text' name='message'>
                  <button type='submit'>
                    Send
                  </button>
              </form>
          </body>
         </html>
         `
    );
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    // on method allows us to listen certain events
    // we defining arrow to execute for every iconmin data piece(event)
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    //this is work when the incoming data parse done or incoming request
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];

      fs.writeFile("message.txt", message, (err) => {
        // res.writeHead(302, {
        //   /* Wrting some js Object with some headers */
        //   location: "/",
        // });

        res.statusCode = 302;
        res.setHeader("Location", "/");

        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello there!</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;

/*the second way of using module.exports*/

// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };

/*the third way of using module.exports*/

module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded text";

/*the fourth way of using module.exports (shortcut)*/

// exports.handler = requestHandler;
// exports.someText = "Some hard coded Text";

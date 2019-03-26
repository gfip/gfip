# GFIP - Feedbacks Made Easy

A website that makes it easy to send code review feedbacks to Programming Introduction students at CIn/UFPE.

## Getting Started

### Prerequisites
[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community) (if you are not using docker)

### Installing
- Setup a `.env` file inside the project directory with the following content:

  >CONFIRMATION_SECRET_KEY=anythingyouwant

  >EMAIL_USER=consult one of the main developers or use your e-mail address

  >EMAIL_PASSWORD=consult one of the main developers or use your e-mail password

  >SECRET_KEY=anythingyouwant

  >THEHUXLEY_USERNAME=consult one of the main developers to get the thehuxley main account username.

  >THEHUXLEY_PASSWORD=consult one of the main developers to get the thehuxley main account password.

  >MONGO_URL=Optional. Set only if you want to use the main DB. If you want so, consult [lucasbarross](https://github.com/lucasbarross) to get the credentials and URL or get from HEROKU settings > reveal config vars

  >PASSRESET_SECRET=anythingyouwant.

  >ADDRESS=The address which the api is hosted on, for local developement you can use http://localhost:5000.
  
  >CLIENT_ADDRESS=The address which the front end is hosted on, for local developement you can leave it blank

- Go to the `mongodb/server/YOURVERSION/bin` folder, open a command prompt and execute `mongod`. This will run your local mongoDB database(only required if you didn't set MONGO_URL in your environment variables).

- Go to the project folder and type `npm start` in the command prompt. This will start the API server.

- Go to the `/client` folder inside the project folder and type `npm start`in the command prompt. This will start React server.

* An alternative is using Docker to run this application development environment, for this you have to complete the first pass described and then run (with docker and docker compose installed in you machine) the command: 
  ```bash
    docker-compose up
  ```


## Methods

To see the API methods - go to the [APIDoc.md](APIDoc.md) file

## Deployment
The project on github is linked directly with Heroku, being deployed in live version with any changes made. *Be careful with your code, test it on your local machine before pushing!* 

## Built With

* [MongoDB](https://docs.mongodb.com/) - The database used
* [Express](http://expressjs.com/pt-br/api.html) - The web framework used
* [React](https://reactjs.org/) - The Front-End framework used
* [TheHuxley](https://thehuxley.com.br/) - The code analysis tool used to submit the code by the students

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us. 

## Authors
* **Luan Antunes**  - [luanbrito7](https://github.com/luanbrito7)
* **Lucas Barros**  - [lucasbarross](https://github.com/lucasbarross)
* **Rafael Mota**   - [rafaelmotaalves](https://github.com/rafaelmotaalves)

See also the list of [contributors](https://github.com/lucasbarross/feedback-generator/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

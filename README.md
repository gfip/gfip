# GFIP - Feedbacks Made Easy

A website that makes it easy to send code review feedbacks to Programming Introduction students at CIn/UFPE.

## Getting Started

### Prerequisites
[MongoDB](https://www.mongodb.com/download-center?jmp=nav#community)
### Installing
- Setup a `.env` file inside the project directory with the following content:
```markdown
CONFIRMATION_SECRET_KEY=anythingyouwant
EMAIL_USER=consult one of the main developers or use your e-mail address
EMAIL_PASSWORD=consult one of the main developers or use your e-mail password
SECRET_KEY=anythingyouwant
THEHUXLEY_USERNAME=consult one of the main developers to get the thehuxley main account username.
THEHUXLEY_PASSWORD=consult one of the main developers to get the thehuxley main account password.
MONGO_URL=Optional. Set only if you want to use the main DB. If you want so, consult [lucasbarross](https://github.com/lucasbarross)     to get the credentials and URL or get from HEROKU settings > reveal config vars
```

- Go to the `mongodb/server/YOURVERSION/bin` folder, open a command prompt and execute `mongod`. This will run your local mongoDB database(only required if you didn't set MONGO_URL in your environment variables).

- Go to the project folder and type `npm start` in the command prompt. This will start the API server.

- Go to the `/client` folder inside the project folder and type `npm start`in the command prompt. This will start React server.

## Methods

To see the API methods - go to the [APIDoc.md](APIDoc.md) file

## Deployment
The project on github is linked directly with Heroku, being deployed in live version with any changes made. *Be careful with your code, test on your local machine before pushing to live!* 

## Built With

* [MongoDB](https://docs.mongodb.com/) - The database used
* [Express](http://expressjs.com/pt-br/api.html) - The web frameword used
* [TheHuxley](https://thehuxley.com.br/) - The code analysis tool used to submit the code by the students

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us. 

## Authors

* **Éden Ernandes** - [edenalsant](https://github.com/edenalsant)
* **Luan Antunes**  - [luanbrito7](https://github.com/luanbrito7)
* **Lucas Barros**  - [lucasbarross](https://github.com/lucasbarross)
* **Rafael Mota**   - [rafaelmotaalves](https://github.com/rafaelmotaalves)


See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

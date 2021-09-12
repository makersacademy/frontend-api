# Chitter API Frontend Challenge

My notes:
-------
* In this weekend's challenge I sucessfully covered two areas of building the Chitter app
* The user can sign up as a new user and view the 50 most recent peeps
* I used Vanilla JavaScript to make calls to the API and a small User class to create new Users via the sign up form - this class was tested using the Jasmine library 

Next steps & to improve:
-------
* My next steps will be to enable the POST `/sessions` which assigns the user a `user_id` and a `session_key` allowing them to post and like peeps 
* I'd also like to stub the API to create tests for the `chitterInterface.js`
* I will aim to make the Interface less bulky - however, I used this challenge to fully get to grips with fetching data from and API and posting data to an API

Check in to Chitter:
-------
* `git clone` this repo
* `cd` into the folder
* `open index.html` to view the Chitter-verse

See it in action:
-------
![demo](https://github.com/kerrimcm/frontend-api-challenge/blob/master/public/images/chitter_demo.gif)

## Original Instructions

* Feel free to use Google, your notes, books, etc. but work on your own
* If you refer to the solution of another coach or student, please put a link to that in your README
* If you have a partial solution, **still check in a partial solution**
* You must submit a pull request to this repo with your code by 9am Monday morning

Challenge:
-------

As usual please start by forking this repo.

We are going to write a small Twitter clone that will allow the users to post messages to a public stream.

The scenario is similar to the [Chitter Challenge](https://github.com/makersacademy/chitter-challenge), except someone has already built a backend API for you and hosted it on Heroku.

Your task is to build a front-end single-page-app to interface with this API. You can do this in any framework you like, or in pure Javascript. [The API documentation is here.](https://github.com/makersacademy/chitter_api_backend)

Here are some interactions the API supports. Implement as many as you see fit.

* Creating Users
* Logging in
* Posting Peeps
* Viewing all Peeps *(I suggest you start here)*
* Viewing individual Peeps
* Deleting Peeps
* Liking Peeps
* Unliking Peeps

We are looking for well tested, easy to read, easy to change code. This is more important than the number of interactions you implement.

Note that others may be doing the same task at the same time, so the data may change as you are using it.

## Utilities you might find useful

* [The Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for making requests.
* [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/) for exploring the API.

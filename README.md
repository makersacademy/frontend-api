# Chitter API Frontend Challenge

## Challenge:

Write a small Twitter clone that will allow the users to post messages to a public stream.

The scenario is similar to the [Chitter Challenge](https://github.com/makersacademy/chitter-challenge), except someone has already built a backend API and hosted it on Heroku.

Task is to build a front-end single-page-app to interface with this API. Can do this in any framework, or in pure Javascript. [The API documentation is here.](https://github.com/makersacademy/chitter_api_backend)

Here are some interactions the API supports:

* Creating Users 
* Logging in
* Posting Peeps [X]
* Viewing all Peeps [X]
* Viewing individual Peeps
* Deleting Peeps 
* Liking Peeps
* Unliking Peeps

We are looking for well tested, easy to read, easy to change code. This is more important than the number of interactions you implement.

Note that others may be doing the same task at the same time, so the data may change as you are using it.

## Utilities you might find useful

* [The Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) for making requests.
* [Postman](https://www.getpostman.com/) or [Insomnia](https://insomnia.rest/) for exploring the API.

<br>

## Set up project
### In a terminal within the project directory run the following:
1. Install required node modules using `npm install`
2. Run `npm install -g esbuild` to bundle a javascript file
3. In another terminal (in the same directory) run the command `npm run build` and keep this process running
4. Use `open index.html` in the original terminal to open the webpage in your default browser

## Conclusion:
- Had issues trying to `npm run build` and had to copy a line from package.json from another exercise to make it work
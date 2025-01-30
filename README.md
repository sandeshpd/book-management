## Simple Book Management Web App

This is the simple Book Management Web app made with React, Django, Django REST Framework.

Following are the functionalities this web app currently offers:
* Adding Books
* Deleting Books
* Editing Book data
* Searching Books

Following are the features that are currently in development and will come in action soon:
* Filtering Books on the basis of language, genre
* Improved User Interface

Note that the User Interface is too simplistic and bit of ugly. It will be improved in future. Stay tuned...

# Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API Documentation](#api-documentation)
6. [Licence](#license)
7. [Acknowledgements](#acknowledgements)
8. [Issues](#issues)

This app is not yet live. To see how this app works, follow below steps:

## Features:
* Backend: Django With Django Rest Framework for API creation.
* Frontend: React with Modern UI/UX design.
* Database: PostgreSQL and PgAdmin4 for managing database.
* Authentication: JWT (JSON Web Token)

## Prerequisites:
Ensure you have following tools installed on your system:
* Node.js (v14.x or later)
* `npm`
* Axios
* Python (v3.8 or later)
* PostgreSQL, PgAdmin4
* Git (for cloning the repository)
* Virtualenv (recommended for managing Python dependencies)

## Installation:
Follow these steps to set up this project on your local machine:

1. Clone this repository in your local machine and open the directory:

   `git clone https://github.com/sandeshpd/book-management.git`
  
    `cd book-management`

2. Backend setup:
    1. Navigate to the backend directory:

        `cd backend`

    2. Create a virtual environment and activate it:

        `python -m venv .venv`
        `source .venv/bin/activate`  # For MacOS/Linux

        `.venv\Scripts\activate`    # For Windows
    
    3. Install required Python packages:

        There is a _requirements.txt_ file in _backend_ directory which has a list of required packages. To install packages from this file, run this command:

        `pip install -r requirements.txt` where `-r` is for recursively traversing `.txt` file.

    4. Apply Migtations:

        `python manage.py makemigrations`
        `python manage.py migrate`

    5. Run the server:

        `python manage.py runserver`

    6. Open your browser and navigate to `http://127.0.0.1:8000/api/books`

3. Frontend setup:
    1. Navigate to _frontend_ directory:

        `cd ../fronend`
    2. Install dependencies:

        `npm install axios`
    3. Start the development server:

        `npm start`

## Usage:
1. Open the frontend in your favourite web browser:

    `http://localhost:3000`
2. The API runs on:

    `http://127.0.0.1:8000/api/`

## API Documentation:
* Base URL: `http://127.0.0.1:8000/api/books`
* Example Endpoints:
    * `GET /api/books` - Fetch all resources
    * `POST /api/books` - Create a new resource
    * `DELETE /api/books/{book.id}` - Delete specific book

## License:
This project is licensed under [MIT License.](LICENSE)

## Acknowledgements:
* I have used **Axios**, a popular JavaScript library that's used to send HTTP requests to REST endpoints like GET, POST, DELETE, PUT.
* These tutorials were very helpful while developing this web app:
    * [How to connect Django with ReactJS - GeeksForGeeks](https://www.geeksforgeeks.org/how-to-connect-django-with-reactjs/)
    * [Simple To-Do application tutorial on DigitalOcean website](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)

## Issues:
* If you encounter any bugs, have feature requests, please check out the [Issues](https://github.com/sandeshpd/todo-react-django/issues) tab. 
* Feel free to open a new Issue to report problems or suggest improvement.
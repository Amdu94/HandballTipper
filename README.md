<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">HandballTipper</h3>

  <p align="center">
      A full stack application for handball tipping game for friend groups.
    <br />
    <a href="https://github.com/Amdu94/HandballTipper"><strong>Explore the repo »</strong></a>
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Welcome to HandballTipper, a full-stack application built with Express for the backend, React for the frontend, and MongoDB for the database.

On this website, users can register and submit their tips for upcoming handball matches. They can view and modify their tips until the start of the match. Currently, all users can see the tips submitted for each match, but in future updates, they will only be visible once the match has started.

<div align="center">
  <p><strong>IMPORTANT!!! Under Development!</strong></p>
</div>

Project Start Date: 2024.03.19

Future Developments:
- Writing tests
- Automatic result and score updates after the match
- Introduction of CI/CD
- Authentication implementation
- Enhancing the frontend design
- Building the application in other programming languages
- Deployment on AWS environment
- Sending automatic alerts if there are no submitted tips for a match within an hour.

### Built With

* [![JavaScript][JavaScript-url]][JavaScript.com]
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* [![React][React.js]][React-url]
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
* [![HTML5][HTML5-url]][HTML5.com]
* [![CSS3][CSS3-url]][CSS3.org]
* [![MongoDB][MongoDB-url]][MongoDB.com]
* ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

#### Docker

Before installing the project, make sure you have Docker installed on your machine.
Docker can be downloaded and installed from the official Docker website. Here are the links to download Docker for
different operating systems:

[Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

[Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

[Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

### Installation

1. Clone the repo

   Begin by cloning the HandballTipper repository using Git:

   ```sh
   git clone https://github.com/Amdu94/HandballTipper
   ```

   This command will download the project's files to your local machine.

2. Project Navigation

   Once the cloning is complete, navigate to the root directory of the project,
   where you'll find the docker-compose.yaml file.
   You can use your terminal's cd command for this:

   ```sh
   cd HandballTipper
   ```

3. Run the entrypoint.sh script. Here you have to add the MongoDb database URL and the PORT where the backend will run.

   ```sh
    .entrypoint.sh
   "Enter the MongoDB database URL:" "e.g("mongodb+srv://test:test@cluster0.ns1yp.mongodb.net/myFirstDatabase")"
   "Enter the port number: "e.g(8080)"
    ```
   MONGODB_URL: This variable specifies the connection string to your MongoDB database.
   Replace the MONGODB_URL with your actual connection details.

   PORT: This variable defines the port on which the HandballTipper backend will run. 
   The default is 8080, but you can customize it if needed.

4. Create and run the Docker container using:

   ```sh
    docker-compose up
    ```

5. Open your browser and navigate to [http://localhost:8000](http://localhost:8000)

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->
## Contact

Adam Dulai - [GitHub Profile](https://github.com/Amdu94)


Project Link: [https://github.com/Amdu94/HandballTipper](https://github.com/Amdu94/HandballTipper)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Amdu94/Gofri-King.svg?style=for-the-badge
[contributors-url]: https://github.com/Amdu94/Gofri-King/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Amdu94/Gofri-King.svg?style=for-the-badge
[forks-url]: https://github.com/Amdu94/Gofri-King/network/members
[stars-shield]: https://img.shields.io/github/stars/Amdu94/Gofri-King.svg?style=for-the-badge
[stars-url]: https://github.com/Amdu94/Gofri-King/stargazers
[issues-shield]: https://img.shields.io/github/issues/Amdu94/Gofri-King.svg?style=for-the-badge
[issues-url]: https://github.com/Amdu94/Gofri-King/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/ádám-dulai
[JavaScript-url]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript.com]: https://www.javascript.com/
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express
[Express-url]: https://expressjs.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[HTML5-url]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5.com]: https://html.com/
[CSS3-url]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3.org]: https://www.w3.org/Style/CSS/
[MongoDB-url]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB.com]: https://www.mongodb.com/
[Nginx]: https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white
[Nginx-url]: https://www.nginx.com/


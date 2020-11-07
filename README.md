
<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->

# Air Quality Monitoring System using a Delay and Disruption Tolerant Network

<br />
<p align="center">
  <p align="center">
    Backend module
    <br />
    <a href="https://github.com/dzvid/aqs-api"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://tukno-aqs-api.herokuapp.com/">View Demo</a>
    · -->
    <a href="https://github.com/dzvid/aqs-api/issues">Report bug</a>
    ·
    <a href="https://github.com/dzvid/aqs-api/issues">Request feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Air Quality Monitoring System using a Delay and Disruption Tolerant Network](#air-quality-monitoring-system-using-a-delay-and-disruption-tolerant-network)
  - [Table of Contents](#table-of-contents)
  - [About the project](#about-the-project)
  - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)
  - [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About the project

Degraded air quality is prejudicial to economy, nature and human lives.  Air quality monitoring is an important task to be performed to alleviate the effects of poor air quality, e.g.: it allows governments to take action on events of high level air pollutants in the atmosphere. It also allows to verify if the actions performed were effective.
Altough important, air quality monitoring is usually neglected, because it is costly, demanding a lot of resources (material, infrastructural, financial and human) to be performed. 
Due to its cost, it is necessary to look for cost-effective options.

<!--
Degraded air quality is prejudicial to economy, nature and human lives.  Air quality monitoring is an important task to be performed to alleviate the effects of poor air quality, but it demands a lot of resources (material, infrastructural , financial and human) to be performed, so its necessary to look for cost-effective options.
Continuous air quality monitoring allows governments to take action on events of high level air pollutants in the atmosphere. It also allows to verify if the actions performed were effective. 
Open access to air monitored data is another important issue necessary to be addressed, it allows population to be aware about the current levels of pollutants and possible effects of it in their lives.
 -->

This repository contains the backend module of a proposed air quality monitoring system. Backend module is responsible to store, process the data gathered by the sensors nodes and generate information about air quality. Backend module is composed by two services: 
- `aqs-api`: A REST API that allows to manage informations about sensor nodes and collected readings;   
- `aqs-postgres`: Database service is responsible by storage of all information of sensor nodes and collected readings. PostgreSQL is the database adopted in the system.

Docker Compose is used to create and start both services. 

## Built With

Main technologies, libraries and CLI tools used to built the API:

- [Node.js](https://nodejs.org/): Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine;
- [PostgreSQL](https://www.postgresql.org/): a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance;
- [Docker](https://www.docker.com/): Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything it needs to run: code, runtime, system tools and libraries. This guarantees that your application will always run the same way and makes collaboration as simple as sharing a container image;
- [Date-fns](https://github.com/date-fns/date-fns): Modern JavaScript date utility library;
- [Express](https://github.com/expressjs/express): Fast, unopinionated, minimalist web framework for node;
- [Sequelize](https://github.com/sequelize/sequelize): An easy-to-use multi SQL dialect ORM for Node.js

To manage the code style and formatting:

- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [EditorConfig](https://editorconfig.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites
 - **Host machine settings**:
    - A host computer running following operational system: `Linux Ubuntu 18.04.5 LTS` or greater. 

      or

    - If deploying services in a Raspberry Pi, use the following operational system: `Raspberry Pi OS (32-bit) Lite, version August 2020 release date 2020-08-20, kernel version 5.4`; 
- **Git**: Git is a free and open source distributed version control system. [Check git download page to get instructions on how to install it](https://git-scm.com/download/linux).
- **Install Node.js**: Follow the official [tutorial](https://nodejs.org/en/). Node version used in this project: `v12.16.1 LTS`.

- **Install a package manager for node**:

  - **Yarn**: [Check yarn tutorial](https://classic.yarnpkg.com/lang/en/) (Yarn 1.x (classic) was used in this project);

- **Install Docker**: Follow the official [tutorial](https://docs.docker.com/install/). Docker version used in this project: `v19.03.13, build 4484c46d9d`.
- **Install Docker Compose**: Follow the official [tutorial](https://docs.docker.com/compose/). Docker Compose version used in this project: `v1.27.4, build 40524192`.


### Installation

Docker Compose will be used to install the project:

1. Clone the repository and navigate to the project directory:

   ```sh
   Using ssh:

   git clone git@github.com:dzvid/aqs-api.git
   cd aqs-api

   Or using https:

   git clone https://github.com/dzvid/aqs-api.git
   cd aqs-api
   ```

2. Create the `.env` file for the environment variables of the application. Run the following command to create `.env` file using `.env.example` as a template:
    ```sh
    cp .env.example .env
    ```

    In the .env file, set a value for the following environment variables:
   - `API_PORT`: port to expose API in host. Default API port is `3000`;  
   - `NODE_ENV`: specifies to Node.js the environment in which the application is running: `development`, `production` or `testing`. Default is `development`;
   - `DB_HOST`: Database server address. This value is overwritten by Docker Compose, but is necessary to be declared to run database migrations in step 3. Default value is `127.0.0.1`;
   - `DB_PORT`: port to expose database (PostgreSQL) in host. Default database port is `5432`;
   - `DB_NAME`: Defines the name of database to be created in PostgreSQL. Default name is `aqs`;
   - `DB_USER`: This optional environment variable is used in conjunction with `DB_PASS` to set a user and its password. This variable will create the specified user with superuser power and a database with the same name. If it is not specified, then the default user `postgres` will be used; 
   - `DB_PASS`: This environment variable is required for you to use the PostgreSQL Docker image. It must not be empty or undefined. This environment variable sets the superuser password for PostgreSQL. The default superuser is defined by the `DB_USER` environment variable.

   :warning: Make sure values were declared, they are used in the `docker-compose.yml` file to create the containers.

3. PostgreSQL database storage: PostgreSQL Docker images provides two options available to store databases used by applications:
   
   3.1 (Adopted in this project) Create a data directory on the host system (outside the container) and mount this to a directory visible from inside the container. This places the database files in a known location on the host system, and makes it easy for tools and applications on the host system to access the files. The downside is that the user needs to make sure that the directory exists, and that e.g. directory permissions and other security mechanisms on the host system are set up correctly.
   This is the default setting defined in this project, a volume is defined in the directory `./db/data`.

   3.2 Let Docker manage the storage of your database data by writing the database files to disk on the host system using its own internal volume management. This is the default and is easy and fairly transparent to the user. The downside is that the files may be hard to locate for tools and applications that run directly on the host system, i.e. outside containers.
   If you want to let Docker manage database storage, edit the file `docker-compose.yml` and remove the whole `volumes` section from the service `aqs-postgres`.

4. Create and start the containers using Docker Compose. Open a terminal window and run the following command:

   ```sh
   docker-compose up
   ```

5. Run sequelize migrations to create database tables:
    
    4.1 Install project dependencies, run the following command in terminal:
      ```sh
      yarn
      ```
    4.2 After installing dependencies, run sequelize migrations to create the database tables:
      ```sh
      yarn sequelize db:migrate
      ```

6. Now you can access API service at: `http://localhost:3000` (If using default API_PORT).

You are done with configuration! I hope everything is alright and you are ready to use the API service! :tada:

<!-- USAGE EXAMPLES -->

<!-- ## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- ROADMAP -->

<!-- ## Roadmap

See the [open issues](https://github.com/dzvid/aqs-api/issues) for a list of proposed features (and known issues). -->

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the dev branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

David Oliveira - oliveiradavid.dev@gmail.com

Project Link: [https://github.com/dzvid/aqs-api](https://github.com/dzvid/aqs-api)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)
- [Choose an Open Source License](https://choosealicense.com)
- [Img Shields](https://shields.io)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/dzvid/aqs-api.svg?style=flat-square
[contributors-url]: https://github.com/dzvid/aqs-api/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dzvid/aqs-api.svg?style=flat-square
[forks-url]: https://github.com/dzvid/aqs-api/network/members
[stars-shield]: https://img.shields.io/github/stars/dzvid/aqs-api.svg?style=flat-square
[stars-url]: https://github.com/dzvid/aqs-api/stargazers
[issues-shield]: https://img.shields.io/github/issues/dzvid/aqs-api.svg?style=flat-square
[issues-url]: https://github.com/dzvid/aqs-api/issues
[license-shield]: https://img.shields.io/github/license/dzvid/aqs-api.svg?style=flat-square
[license-url]: https://github.com/dzvid/aqs-api/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/dzvid
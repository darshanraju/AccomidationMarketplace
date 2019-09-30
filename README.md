# capstone-project-enter-a-group-name
capstone-project-enter-a-group-name created by GitHub Classroom

## Setup

Create a pipenv environment with Python 3.7.4

`pipenv shell`

Install python dependencies into virtual environment

`pipenv sync`

Install NVM
`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash`

Download Node v12.10.0 using NVM

`nvm install 12.10.0`

`nvm use 12.10.0`

Install javascript dependencies

`npm install`

## Adding Dependencies

When you need to add a new python library. Use "pipenv install" so that it gets added to the pipfile and pipfile.lock.

Similarly, use "npm install" for any javascript libraries that you need.

## Usage

Compile react, you need to do this whenever you make a change
`npm run build`
This command is similar but will continuously watch your files for changes - Saves some time
`npm run dev`

Serve django web applicatoin
`python manage.py runserver`

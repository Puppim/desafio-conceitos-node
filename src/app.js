const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4")

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


function getId(id){
 return repositories.findIndex(repository=> repository.id === id)
} 

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = { id:uuid(), title, url, techs, likes: 0};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;
  
  // const repositoryId = repositories.findIndex(repository=> repository.id === id);
  const repositoryId = getId(id);
  if (repositoryId < 0){
    return response.status(400).json({error:"This repository don't exist"})
  }
  
  repositories[repositoryId].title = title;
  repositories[repositoryId].url = url;
  repositories[repositoryId].techs = techs;
  
  return response.json(repositories[repositoryId])
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
 
  const repositoryId = getId(id);

  if (repositoryId < 0){
    return response.status(400).json({error:"This repository don't exist"})
  }

  repositories.splice(repositoryId,1);

  response.status(204).json(repositories);

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
 
  const repositoryId = getId(id);

  if (repositoryId < 0){
    return response.status(400).json({error:"This repository don't exist"})
  }

  const plusOneLike = repositories[repositoryId].likes + 1;

  repositories[repositoryId].likes = plusOneLike;

  response.json(repositories[repositoryId])
});

module.exports = app;

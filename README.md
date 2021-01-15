# *Personalized Projects API*
## Purpose:
I created this API to use on my portfolio website and to have the ability to update my projects as I continue through my journey.

## Technologies used:
- Express
- Typescript
- MongoDB
- Mongoose

## Usage:
1. **GET** `/api/projects` *OR* `/` : (Does not require a key) Receive an array of JSON objects that holds all projects
Example:
```
[
    {   
    "name": "Example",
    "project_level": 1,
    "init_mvp": 1610645656397,
    "team_count": 1,
    "img_url": "www.example.com",
    "techs_used": ["MongoDB", "Express"],
    "main_language": "TypeScript",
    
    }...
]

```

2. **POST** `/api/project` : Post a project to the database. Requires an API key in the query parameters as `api_key=EXAMPLE_KEY`. Project Name must also be unique. All key-value pairs in the `GET /api/project` are required

Example: 

*ENDPOINT*: `api/project?api_key=EXAMPLE_KEY`



3. **POST** `/api/generate-key` : Generates a new API key. Requires generation password in the query parameters as `gen_key=GENERATION_KEY`. Requires `key_holder` in the request body as JSON

Example:

*ENDPOINT*: `/api/generate-key?gen_key=GENERATION_KEY`

*BODY*: `{"key_holder": "Yaseen"}` 


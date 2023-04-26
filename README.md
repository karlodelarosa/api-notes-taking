# Notes Taking API

### Requirements
```
Node: 16.16.0
```

### API
```
https://github.com/karlodelarosa/api-notes-taking.git
```

### App Project
```
https://github.com/karlodelarosa/app-notes-taking.git
```

---
### Steps:
- Install Docker to access local database
- run `docker compose up`
- Access adminer `http://localhost:50000/`
- Or install your own MySql server then copy the schema from [here](https://github.com/karlodelarosa/api-notes-taking/blob/main/mysql/init.sql)

Create `.env` file and copy this variables
```
VITE_API_URL = "http://localhost:7000"
NODE_ENV=development
VITE_TOKEN_SECRET=f2416e3f534fde4ed947df6674df5a7b71a84ec9e786f19c2bd3718bb9b6144ca2a40e291da2da7492c30b7aaf082434c6220b8b749c7ca7b05e5f02f6185640
```

### MYSQL Credentials
|   |  |
| ------------- | ------------- |
| Host  | notes-db  |
| User  | root  |
| Password  | root  |
| Database  | notes-db  |

### Default Credentials:
|  |  |
| ------------- | ------------- |
| user  | admin  |
| password  | password  |

---
### Run project

```
npm install
```

```
npm run dev
```

Local Access:
```
http://localhost:5173/
```

### Demo
[Scribblenote](https://app-notes-taking.pages.dev/sign-in)
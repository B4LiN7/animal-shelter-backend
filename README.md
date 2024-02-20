# ✨✨✨✨✨✨✨✨✨✨✨✨✨
![image](https://github.com/B4LiN7/animal-shelter-backend/assets/145648111/d5b89595-ea94-4f8b-bd8d-658d84770895)
# ✨✨✨✨✨✨✨✨✨✨✨✨✨
# Animal Shelter Backend
NestJS backend az Állatmenhely projekt számára.

## Telepítés
```bash
# Ha még nincs telepítve a pnpm, akkor telepítsd
$ npm install -g pnpm

$ pnpm install

$ pnpm run start:dev
```

### vagy, ha Dockerrel szeretnéd futtatni
```bash
$ docker compose up --build
```

## API dokumentáció
### Auth (/auth)
```
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```
- POST /login
- POST /register
- GET /logout
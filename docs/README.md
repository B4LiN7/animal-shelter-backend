animal-shelter-backend / [Exports](modules.md)

![image](https://github.com/B4LiN7/animal-shelter-backend/assets/145648111/d5b89595-ea94-4f8b-bd8d-658d84770895)

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
  username: string,
  password: string,
  email: string,
  name: string
}
```
- POST /login
- POST /register
- GET /logout

### User (/user)
```
{
  userId: string,
  username: string,
  email: string,
  name: string,
  role: Role enum in string,
  createdAt: Date in string,
  updatedAt: Date in string
}
```
- GET / (összes felhasználó (id + felhasználónév) listázása, csak admin fér hozzá)
- GET /me (bejelentkezet felhasználó adatait irja ki)
- GET /:id (egy specifikus felhasználó adatait irja ki, csak saját vagy admin)
- POST / (felhasználó létrehozása, lehet Role-t is adni, csak admin fér hozzá)
- PUT /:id (egy specifikus felhasználó adatait módositja ki, csak saját vagy admin)
- DELETE /:id (egy specifikus felhasználót töröl, csak saját vagy admin)

### Media (/media)
- POST / (fájl(ok) feltöltése, mezőnév legyen: file)
- GET /* (public mappa gyökér) (Pl. /media/uploads/lt2wqej2_dog1.jpg)

### Breed (/breed)
```
{
  breedId: number
  name: string,
  description: string,
  speciesId: number
}
```
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id (Minden pet-ben null-ra állítja a breedId-t)

### Species (/species)
```
{
  spesciesId: number
  name: string,
  description: string,
}
```
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id (Minden breed-ben null-ra állítja a speciesId-t)

### Pet (/pet)
```
{
  petId: number,
  name: string,
  description: string,
  imageUrl: string,
  breedId: number,
  sex: Sex enum in string,
  status: Status enum in string,
  birthDate: string
}
```
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id
- GET status/:id (Elözmények lekérdezése a pet-hez)

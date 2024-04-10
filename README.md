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
- POST /login
  - ```
    username: string,
    password: string
    ```
  - ```
    message: string,
    access_token: string,
    refresh_token: string
    ```
- POST /register
  - ```
    username: string,
    password: string,
    email: string (username helyett is használható),
    name: string (opcionális)
    ```
  - ```
    message: string,
    access_token: string,
    refresh_token: string
    ```
- POST /refresh 
  - (Újitja a jwt access és refresh tokent)
- GET /logout 
  - (Törli a refresh tokent az adatbázisból)

### User (/user)
```
userId: string,
username: string,
email: string,
name: string,
profileImageUrl: string,
roles: String[],
createdAt: Date,
updatedAt: Date
```
- GET / 
  - (összes felhasználó (id + felhasználónév) listázása, csak admin fér hozzá)
- GET /me 
  - (bejelentkezet felhasználó adatait irja ki)
- GET /:id 
  - (egy specifikus felhasználó adatait irja ki, csak saját vagy admin)
- POST / 
  - (felhasználó létrehozása, lehet Role-t is adni, csak admin fér hozzá)
- PUT /:id 
  - (egy specifikus felhasználó adatait módositja ki, csak saját vagy admin)
- DELETE /:id 
  - (egy specifikus felhasználót töröl, csak saját vagy admin)

### Media (/media)
- POST / 
  - (fájl(ok) feltöltése, mezőnév legyen: file)
  - ```
    status: 'success' | 'failed',
    file: string,
    size: string,
    
    # Success
    url: string,
    newFile: string
    
    # Failed
    message: string
      ```
- GET /* 
  - (public mappa gyökér) (Pl. /media/uploads/lt2wqej2_dog1.jpg)

### Breed (/breed)
```
breedId: string
name: string,
description: string,
speciesId: string
```
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id
  - (Minden pet-ben null-ra állítja a breedId-t)

### Species (/species)
```
spesciesId: string
name: string,
description: string,
```
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id 
  - (Minden breed-ben null-ra állítja a speciesId-t)

### Pet (/pet)
```
petId: string,
name: string,
description: string,
imageUrls: string[],
birthDate: Date
breedId: string,
sex: Sex enum in string,
status: Status enum in string,
```
- GET /
- GET /:id
- POST /
- PUT /:id
- DELETE /:id
- GET status/:id 
  - (Elözmények lekérdezése a pet-hez)

### Adoption (/adoption)
```
adoptionId: string,
petId: string,
userId: string,
status: string,
reason: string
```
- GET /
  - Összes adoptálási folyamat 
- GET /:id
  - Egy adoptálási folyamat adatai 
- POST /pet/:id
  - Felhasználó elinditja az adoptálási folyamatot
- DELETE /pet/:id
  - Felhasználó megszakítja az adoptálási folyamatot
- PUT /:id
  - SET_ADOPTION engedéllyek rendelkező felhasználó módosithatja az adoptálási folyamatot
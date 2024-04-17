import { PrismaClient, PermissionEnum as Perm } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

// Adding roles and their permissions
async function addRoles() {
  const rolePermMap = [
    { name: 'ADMIN', permissions: Object.values(Perm) },
    {
      name: 'USER',
      permissions: [Perm.START_ADOPTION, Perm.UPLOAD_IMAGE],
    },
    {
      name: 'VET',
      permissions: [
        Perm.SET_ADOPTION,
        Perm.CREATE_BREED,
        Perm.CREATE_PET,
        Perm.CREATE_SPECIES,
        Perm.UPDATE_BREED,
        Perm.UPDATE_PET,
        Perm.UPDATE_SPECIES,
        Perm.DELETE_BREED,
        Perm.DELETE_PET,
        Perm.DELETE_SPECIES,
      ],
    },
  ];
  for (const role of rolePermMap) {
    const existingRole = await prisma.role.findFirst({
      where: {
        roleName: role.name,
      },
    });
    if (existingRole) {
      console.log(`Role '${role.name}' already exists, skip.`);
      continue;
    }
    const addedRole = await prisma.role.create({
      data: {
        roleName: role.name,
        permissions: {
          set: role.permissions,
        },
      },
    });
    console.log(
      `Role '${addedRole.roleName}' created with permissions: ${addedRole.permissions}.`,
    );
  }
}

// Admin user (always needed)
async function addAdminUser() {
  console.log('Checking admin user...');
  const admin = await prisma.user.findFirst({
    where: {
      username: 'admin',
    },
  });
  const userAdminConnection = await prisma.userRole.findFirst({
    where: {
      userId: admin?.userId,
    },
  });
  if (admin && userAdminConnection) {
    console.log('Admin user with ADMIN role already exists, skip.');
    return;
  }

  const newAdmin = await prisma.user.create({
    data: {
      username: 'admin',
      name: 'Admin User',
      hashedPassword: await hashPassword('password'),
    },
  });

  const userRole = await prisma.role.findFirst({
    where: {
      roleName: 'USER',
    },
  });
  if (!userRole) {
    throw new Error('User role not found, try to recreate roles...');
  }
  await prisma.userRole.create({
    data: {
      userId: newAdmin.userId,
      roleId: userRole.roleId,
    },
  });

  const adminRole = await prisma.role.findFirst({
    where: {
      roleName: 'ADMIN',
    },
  });
  if (!adminRole) {
    throw new Error('Admin role not found, try to recreate roles...');
  }
  await prisma.userRole.create({
    data: {
      userId: newAdmin.userId,
      roleId: adminRole.roleId,
    },
  });

  console.log(`Admin user created with user ID ${newAdmin.userId}.`);
}

// Random users and locations
async function addUsers(addUserCount: number, addIfFound: boolean = false) {
  console.log('Adding users...');

  if (!addIfFound) {
    const userCount = await prisma.user.findMany();
    if (userCount.length > 1) {
      console.log('Users already exist, skip.');
      return;
    }
  }

  const userRole = await prisma.role.findFirst({
    where: {
      roleName: 'USER',
    },
  });
  if (!userRole) {
    console.error('User role not found, try to recreate roles...');
    await addRoles();
  }

  for (let i = 0; i < addUserCount; i++) {
    const newUser = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        hashedPassword: await hashPassword('password'),
        name: faker.person.fullName(),
      },
    });
    await prisma.userRole.create({
      data: {
        userId: newUser.userId,
        roleId: userRole.roleId,
      },
    });
    console.log(
      `User with username '${newUser.username}' created with user ID ${newUser.userId}.`,
    );
  }
}
async function addLocations(
  maxLocationForUser: number = 5,
  addIfFound: boolean = false,
) {
  console.log('Adding locations...');

  if (!addIfFound) {
    const locationCount = await prisma.location.count();
    if (locationCount > 0) {
      console.log('Locations already exist, skip.');
      return;
    }
  }

  const users = await prisma.user.findMany();
  if (users.length === 0) {
    console.log('No users found, skip.');
    return;
  }

  for (const user of users) {
    const numberOfLocations =
      Math.floor(Math.random() * Math.abs(maxLocationForUser)) + 1;

    for (let i = 0; i < numberOfLocations; i++) {
      const newLocation = await prisma.location.create({
        data: {
          userId: user.userId,
          name: `${user.username}'s location`,
          country: faker.location.country(),
          city: faker.location.city(),
          zipCode: Number(faker.location.zipCode('####')),
          state: faker.location.state(),
          address: faker.location.streetAddress(),
          addressExtra: faker.location.secondaryAddress(),
        },
      });

      console.log(
        `Location '${newLocation.name}' created (for user with ID ${user.userId}) with ID ${newLocation.locationId}.`,
      );
    }
  }
}

// Animal breeds and species
async function addSpecies(addIfFound: boolean = false) {
  console.log('Adding species...');

  if (!addIfFound) {
    const speciesCount = await prisma.species.count();
    if (speciesCount > 0) {
      console.log('Species already exist, skip.');
      return;
    }
  }

  const species = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Bear'];
  for (const name of species) {
    const addedSpecies = await prisma.species.create({
      data: {
        name,
      },
    });
    console.log(
      `Species '${addedSpecies.name}' created with ID ${addedSpecies.speciesId}.`,
    );
  }
}

function getBreedName(speciesName: string): string {
  switch (speciesName) {
    case 'Dog':
      return faker.animal.dog();
    case 'Cat':
      return faker.animal.cat();
    case 'Rabbit':
      return faker.animal.rabbit();
    case 'Bird':
      return faker.animal.bird();
    case 'Fish':
      return faker.animal.fish();
    case 'Bear':
      return faker.animal.bear();
    default:
      return faker.animal.dog();
  }
}
async function addBreeds(addBreedCount: number, addIfFound: boolean = false) {
  console.log('Adding breeds... ');

  if (!addIfFound) {
    const breeds = await prisma.breed.findMany();
    if (breeds.length > 0) {
      console.log('Breeds already exist, skip.');
      return;
    }
  }
  const species = await prisma.species.findMany();
  if (species.length === 0) {
    console.log('No species found, skip.');
    return;
  }

  for (let i = 0; i < addBreedCount; i++) {
    const randomSpeciesIndex = Math.floor(Math.random() * species.length);
    const selectedSpecies = species[randomSpeciesIndex];

    try {
      const addedBreed = await prisma.breed.create({
        data: {
          name: getBreedName(selectedSpecies.name),
          description: faker.lorem.sentence(),
          speciesId: selectedSpecies.speciesId,
        },
      });

      console.log(
        `Breed '${addedBreed.name}' for species ${addedBreed.speciesId} created with ID ${addedBreed.breedId}.`,
      );
    } catch (error) {
      console.error('Error adding breed: ' + error);
    }
  }
}

async function addPets(addPetCount: number, addIfFound: boolean = false) {
  console.log('Adding pets...');

  if (!addIfFound) {
    const petCount = await prisma.pet.count();
    if (petCount > 0) {
      console.log('Pets already exist, skip.');
      return;
    }
  }
  const breedCount = await prisma.breed.count();
  if (breedCount <= 0) {
    console.log('No breeds found, skip.');
    return;
  }

  const breeds = await prisma.breed.findMany();
  for (let i = 0; i < addPetCount; i++) {
    const randomBreedIndex = Math.floor(Math.random() * breedCount);
    const randomBreed = breeds[randomBreedIndex];
    const addedPet = await prisma.pet.create({
      data: {
        name: faker.person.firstName(),
        breedId: randomBreed.breedId,
        birthDate: faker.date.past({ years: 10 }),
        description: 'A friendly pet looking for a loving home.',
      },
    });
    await prisma.petStatus.create({
      data: {
        petId: addedPet.petId,
        status: 'INSHELTER',
      },
    });
    console.log(
      `Pet '${addedPet.name}' created (with breed ID ${addedPet.breedId} and) with ID ${addedPet.petId}.`,
    );
  }
}

async function addAdoptions(
  possibility: number = 1.0,
  addIfFound: boolean = false,
) {
  console.log('Adding adoptions...');

  if (!addIfFound) {
    const adoptionCount = await prisma.adoption.count();
    if (adoptionCount > 0) {
      console.log('Adoptions already exist, skip.');
      return;
    }
  }
  const pets = await prisma.pet.findMany();
  const users = await prisma.user.findMany();
  if (pets.length === 0 || users.length === 0) {
    console.log('No pets or users found, skip.');
    return;
  }

  for (const pet of pets) {
    if (Math.random() > possibility) {
      continue;
    }

    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUser = users[randomUserIndex];

    const existingAdoption = await prisma.adoption.findFirst({
      where: {
        petId: pet.petId,
        userId: randomUser.userId,
      },
    });
    if (existingAdoption) {
      console.log(
        `Adoption for pet ID ${pet.petId} and user ID ${randomUser.userId} already exists, skip.`,
      );
      continue;
    }

    await prisma.adoption.create({
      data: {
        petId: pet.petId,
        userId: randomUser.userId,
        status: 'PENDING',
      },
    });
    await prisma.petStatus.create({
      data: {
        petId: pet.petId,
        status: 'ADOPTING',
      },
    });
    console.log(
      `Adoption created for pet ID ${pet.petId} and user ID ${randomUser.userId}.`,
    );
  }
}

export async function main() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    throw error;
  }

  const environment = process.env.NODE_ENV;
  switch (environment) {
    case 'dev':
      console.log('Development environment specified, executing...');
      await addRoles();
      await addAdminUser();
      await addUsers(15);
      await addLocations();
      await addSpecies();
      await addBreeds(20);
      await addPets(20);
      await addAdoptions(0.5);
      break;
    case 'test':
      console.log('Testing environment specified, executing...');
      await addRoles();
      await addAdminUser();
      break;
    case 'prod':
      console.log('Production environment specified, executing...');
      await addRoles();
      await addAdminUser();
      await addSpecies();
      await addBreeds(20);
      break;
    default:
      console.log('No environment specified, exit.');
      break;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error in seeding: ' + e);
    await prisma.$disconnect();
    process.exit(1);
  });

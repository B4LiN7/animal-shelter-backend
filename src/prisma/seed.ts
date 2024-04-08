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

  const species = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish'];
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
async function addBreeds(addIfFound: boolean = false) {
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

  const dogBreeds: { name: string; description: string }[] = [
    {
      name: 'Labrador Retriever',
      description:
        'Gentle, intelligent, and eager to please, making them excellent family companions and working dogs.',
    },
    {
      name: 'German Shepherd',
      description:
        'Loyal, protective, and highly trainable, often used for herding, police work, and military service.',
    },
    {
      name: 'Golden Retriever',
      description:
        'Friendly, playful, and adaptable, known for their sweet temperament and eagerness to learn.',
    },
    {
      name: 'Poodle',
      description:
        'Intelligent, athletic, and hypoallergenic, coming in three sizes (Standard, Miniature, and Toy) with a distinctive curly coat.',
    },
    {
      name: 'French Bulldog',
      description:
        'Playful, affectionate, and compact, known for their bat ears, wrinkled face, and laid-back personality.',
    },
    {
      name: 'Beagle',
      description:
        'Friendly, curious, and vocal, with a strong sense of smell often used for hunting and tracking.',
    },
    {
      name: 'Bulldog',
      description:
        'Loyal, easygoing, and low-maintenance, known for their wrinkled face, short snout, and stocky build.',
    },
    {
      name: 'Yorkshire Terrier',
      description:
        'Energetic, confident, and longhaired, with a silky coat requiring regular grooming.',
    },
    {
      name: 'Dachshund',
      description:
        'Playful, courageous, and independent, with short legs and a long, distinctive body.',
    },
    {
      name: 'Siberian Husky',
      description:
        'Friendly, loyal, and hardworking, bred for sled pulling and known for their thick double coat, striking blue eyes, and high energy levels. Requires proper exercise and a cool climate.',
    },
    {
      name: 'Pomeranian',
      description:
        'Playful, alert, and lively, with a fluffy coat and a foxy appearance. Despite their small size, they have a big personality and require consistent training.',
    },
    {
      name: 'Cavalier King Charles Spaniel',
      description:
        'Gentle, affectionate, and adaptable, known for their long, silky ears and friendly disposition. They are well-suited for apartment living and enjoy spending time with their families.',
    },
    {
      name: 'Border Collie',
      description:
        'Energetic, intelligent, and hardworking, often used for herding sheep. They are highly trainable and require mental and physical stimulation to prevent boredom and destructive behaviors.',
    },
    {
      name: 'Boxer',
      description:
        'Energetic, playful, and loyal, with a short, sleek coat and a distinctive black mask. They are known for their enthusiasm and need regular exercise to channel their energy.',
    },
    {
      name: 'Schnauzer (Giant, Standard, or Miniature)',
      description:
        'Intelligent, loyal, and active, with a distinctive wiry coat and a proud, alert expression. They come in three sizes: Giant, Standard, and Miniature, each with slightly different temperaments and exercise needs.',
    },
    {
      name: 'Pug',
      description:
        'Playful, affectionate, and low-maintenance, known for their wrinkled face, flat face, and curly tail. They require special attention in hot weather due to their breathing difficulties.',
    },
    {
      name: 'Pembroke Welsh Corgi',
      description:
        'Loyal, intelligent, and energetic, with a short, foxy coat and short legs. They are herding dogs known for their independent streak and need firm but gentle training.',
    },
    {
      name: 'Australian Shepherd',
      description:
        'Energetic, intelligent, and eager to please, known for their herding instincts and loyalty. They excel in agility training, dog sports, and other activities that challenge their mind and body.',
    },
    {
      name: 'Rottweiler',
      description:
        'Powerful, intelligent, and loyal, often used for guard work and herding livestock. They require experienced owners who can provide proper socialization and training due to their protective nature.',
    },
    {
      name: 'Doberman Pinscher',
      description:
        'Energetic, intelligent, and fearless, known for their loyalty and athleticism. They require confident owners who can provide consistent training and socialization.',
    },
    {
      name: 'Bichon Frise',
      description:
        'Playful, cheerful, and hypoallergenic, known for their white, fluffy coat and gentle personality. They require regular grooming and are well-suited for apartment living.',
    },
  ];

  for (const breed of dogBreeds) {
    const randomSpeciesIndex = Math.floor(Math.random() * species.length);
    const selectedSpecies = species[randomSpeciesIndex];
    const breedName = (selectedSpeciesName: string): string => {
      switch (selectedSpeciesName) {
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
        default:
          return faker.animal.dog();
      }
    };

    try {
      const addedBreed = await prisma.breed.create({
        data: {
          name: breedName(selectedSpecies.name),
          description: breed.description,
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
    console.error('Unable to connect to the database');
    throw error;
  }

  const environment = process.env.NODE_ENV;
  switch (environment) {
    case 'dev':
      console.log('Development environment specified, executing...');
      await addRoles();
      await addAdminUser();
      await addUsers(20);
      await addLocations();
      await addSpecies();
      await addBreeds();
      await addPets(100);
      await addAdoptions(0.1);
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

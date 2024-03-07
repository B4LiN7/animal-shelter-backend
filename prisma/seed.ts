import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Unable to connect to the database');
    throw error;
  }
}

async function addAdminUser() {
  const admin = await prisma.user.findFirst({
    where: {
      username: 'admin',
    },
  });
  if (admin && admin.role === Role.ADMIN) {
    console.log('Admin user already exists');
    return;
  }
  if (admin) {
    console.log('Deleting non ADMIN role user with username:', admin.username);
    await prisma.user.delete({ where: { userId: admin.userId } });
  }

  const user = await prisma.user.create({
    data: {
      username: 'admin',
      hashedPassword: await hashPassword('password'),
      role: Role.ADMIN,
    },
  });
  console.log('Admin user created with id:', user.userId);
}

async function addSpecies() {
  const species = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile', 'Fish'];
  const speciesCount = await prisma.species.count();
  if (speciesCount > 0) {
    console.log('Species already exist');
    return;
  }
  for (const name of species) {
    const addedSpecies = await prisma.species.create({
      data: {
        name,
      },
    });
    console.log(
      `Species '${addedSpecies.name}' created with ID ${addedSpecies.speciesId}`,
    );
  }
}

async function addBreeds() {
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

  const breedCount = await prisma.breed.count();
  if (breedCount > 0) {
    console.log('Breeds already exist');
    return;
  }

  const species = await prisma.species.count();
  for (const breed of dogBreeds) {
    const randomSpeciesIndex = Math.floor(Math.random() * species);
    const addedBreed = await prisma.breed.create({
      data: {
        name: breed.name,
        description: breed.description,
        speciesId: randomSpeciesIndex,
      },
    });
    console.log(
      `Breed '${addedBreed.name}' created with ID ${addedBreed.breedId}`,
    );
  }
}

async function addPets() {
  const dogNames = ['Buddy', 'Daisy', 'Max', 'Lucy', 'Charlie', 'Molly'];
  const dogBreeds = await prisma.breed.findMany();

  const breedCount = await prisma.breed.count();
  if (breedCount <= 0) {
    console.log('No breeds found');
    return;
  }

  const petCount = await prisma.pet.count();
  if (petCount > 0) {
    console.log('Pets already exist');
    return;
  }

  for (let i = 0; i < 10; i++) {
    const randomBreedIndex = Math.floor(Math.random() * breedCount);
    const randomBreed = dogBreeds[randomBreedIndex];
    const randomNameIndex = Math.floor(Math.random() * dogNames.length);
    const randomName = dogNames[randomNameIndex];
    const addedPet = await prisma.pet.create({
      data: {
        name: randomName,
        breedId: randomBreed.breedId,
        birthDate: new Date(),
        description: 'A friendly dog looking for a loving home',
      },
    });
    await prisma.petStatus.create({
      data: {
        petId: addedPet.petId,
        status: 'INSHELTER',
      },
    });
    console.log(
      `Pet '${addedPet.name}' created with ID ${addedPet.petId} and breed ID ${addedPet.breedId}`,
    );
  }
}

export async function main() {
  await checkDatabaseConnection();
  await addAdminUser();
  await addSpecies();
  await addBreeds();
  await addPets();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

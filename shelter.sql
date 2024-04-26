-- Adminer 4.8.1 PostgreSQL 16.1 (Debian 16.1-1.pgdg120+1) dump

DROP TABLE IF EXISTS "Adoption";
CREATE TABLE "public"."Adoption" (
    "adoptionId" text NOT NULL,
    "status" "AdoptionStatusEnum" NOT NULL,
    "reason" text,
    "userId" text NOT NULL,
    "petId" text NOT NULL,
    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("adoptionId")
) WITH (oids = false);

INSERT INTO "Adoption" ("adoptionId", "status", "reason", "userId", "petId") VALUES
('dca8d010-1afb-46e7-9871-3776938978d6',	'PENDING',	NULL,	'466b7bbf-5748-42a0-a8b8-2a007adea424',	'b08a59a8-855f-416b-b2dc-2386f0fd2007'),
('c8f22f4f-0f1b-497d-bad8-2d2b523eb2d4',	'PENDING',	NULL,	'dc73b06d-1d91-4ca9-b49d-52a572c04a1a',	'600b479c-b81f-4070-8676-21f5a3ebde5d'),
('ddd16454-981e-4152-84a0-be86d781fd22',	'PENDING',	NULL,	'9ef12a8e-a1c5-4573-b29b-e0abf04838b3',	'f83683d1-f541-47c3-ba89-977d5d0e8fb8'),
('316558ec-4876-4c9f-b6b3-52a96483cf3f',	'PENDING',	NULL,	'8e1d62aa-7256-4d82-bc22-d6a2cfeca143',	'e19a3f7a-76b1-4c29-a559-fdeea197c785'),
('7135242a-8e8e-435a-84d3-d7d991b8b102',	'PENDING',	NULL,	'8c787c01-afe6-4302-a369-7a5822c289b5',	'face9cb0-8043-413f-ae79-1c9b229700b0'),
('77d5401a-212e-49d3-bc96-a464d28f31d7',	'PENDING',	NULL,	'257d613c-6122-458d-b677-633d11f08200',	'c2174e28-db28-4991-8992-7a2846c7ca4c'),
('67510351-1ac2-4be6-ba00-fc4d24eedffa',	'PENDING',	NULL,	'd7c0ad48-c44f-4e45-b0f1-58d2c0d0352e',	'4da38e1c-8993-4eea-89c9-4a856c71588d'),
('5473bc0f-8373-4929-b430-f8f8ed336ccc',	'PENDING',	NULL,	'8e1d62aa-7256-4d82-bc22-d6a2cfeca143',	'4e04151b-368d-4d1f-9e37-fbb55f7e08ab'),
('3aee1d21-c6bb-4bd4-b2e5-e3129f1bfe19',	'PENDING',	NULL,	'ebede24e-415f-4b09-80c8-65a562a350a0',	'a5fa89ea-114b-4e13-948f-0f4c5233e5d4'),
('cc4b4ec8-668c-4fdb-81d7-d97202e9a059',	'PENDING',	NULL,	'211d3781-8370-4930-a2ca-8bff609808e7',	'ee46d48c-b254-4f8d-9a66-6d9e09c6ba2a'),
('b4fb1aac-9306-4d5a-9f45-ccd84ba3b40f',	'PENDING',	NULL,	'd99ae208-440f-44dc-887c-093f9b0a241b',	'7a30d27c-0355-46aa-b5f1-dc344e710592'),
('42a89fc1-1122-49e8-b7ff-09c0d9da4a11',	'PENDING',	NULL,	'd99ae208-440f-44dc-887c-093f9b0a241b',	'cf34cee0-8619-4332-8498-cce3649150e6'),
('4078da1f-e284-411c-8268-ec7c9cafbb29',	'PENDING',	NULL,	'9ef12a8e-a1c5-4573-b29b-e0abf04838b3',	'da3c992f-5bf2-4d5d-b08f-3155081a53ae'),
('75f16e59-520e-4570-a18a-2271ace7dd50',	'APPROVED',	NULL,	'8e1d62aa-7256-4d82-bc22-d6a2cfeca143',	'6366333b-21a2-4ffa-a7bc-af5b72a18bee');

DROP TABLE IF EXISTS "Breed";
CREATE TABLE "public"."Breed" (
    "breedId" text NOT NULL,
    "name" text NOT NULL,
    "description" text,
    "speciesId" text,
    CONSTRAINT "Breed_name_key" UNIQUE ("name"),
    CONSTRAINT "Breed_pkey" PRIMARY KEY ("breedId")
) WITH (oids = false);

INSERT INTO "Breed" ("breedId", "name", "description", "speciesId") VALUES
('7b8dad09-cb9d-457b-83bc-43c5c46cc487',	'Sloth bear',	'Adhuc turba torqueo calculus denego quasi hic.',	'159d2fdf-adcc-46d4-ac07-e96a2315f91d'),
('0a4e09dd-729c-4ed3-9d71-81d4a1ebf702',	'Jumbo flying squid',	'Sursum bellum surgo.',	'c632934d-094f-4c96-9972-4fa19568d461'),
('3583f8f1-42cc-4078-8a73-a4db08ba95b7',	'Polar bear',	'Uterque coruscus cimentarius.',	'159d2fdf-adcc-46d4-ac07-e96a2315f91d'),
('a05ebe42-cf06-4513-85bd-ebcc155963db',	'Oriental',	'Quae deludo cupiditas veritatis pauper succedo delibero aut defessus altus.',	'9471b86c-3514-4282-a577-ae67434a6537'),
('c151a924-6e0b-47da-bb90-397033aa354c',	'Blue-headed Vireo',	'Tabula cognomen dolorum decipio harum.',	'90241c12-bfac-4345-a413-8b562ad05ae5'),
('69eea63b-c860-4dd7-afb1-10060449a83e',	'Rough Collie',	'Comptus cetera damno testimonium altus turba vulgo aeternus cui.',	'0990337d-3607-434f-ba1b-8a541813b024'),
('c52ea424-a497-4de2-ab4d-b4ac658f0d31',	'Holland Lop',	'Vito subiungo quidem amissio accusator sit cilicium urbanus vetus.',	'7a38f26f-670f-477a-a02e-d717cb5542a7'),
('044e638d-8707-40d5-9448-5273c6c301c6',	'Pyrenean Sheepdog',	'Spectaculum quisquam sollicito capitulus laborum ultra stella veritatis vesco.',	'0990337d-3607-434f-ba1b-8a541813b024'),
('2673ddb1-3817-4195-9229-303448e3b146',	'White-crowned Sparrow',	'Tempora tamdiu labore solitudo comburo advoco substantia vociferor doloremque.',	'90241c12-bfac-4345-a413-8b562ad05ae5'),
('879ae99d-7030-4f7b-ab41-c4f55326ae8e',	'Silver cyprinid',	'Currus coniuratio adversus.',	'c632934d-094f-4c96-9972-4fa19568d461'),
('63098a34-9d33-4529-bedc-6b75dfbe0301',	'Ratonero Murciano de Huerta',	'Voluptates creta abeo alter averto.',	'0990337d-3607-434f-ba1b-8a541813b024'),
('fe9d216a-389b-4c1d-b52f-d92bd8d02226',	'Polish',	'Asporto appositus aegre cursus dolores.',	'7a38f26f-670f-477a-a02e-d717cb5542a7'),
('2077e796-8cbd-41d0-99ee-ec3519a42b3a',	'Brown bear',	'Veritatis spectaculum clarus utrum subvenio comprehendo.',	'159d2fdf-adcc-46d4-ac07-e96a2315f91d'),
('fe12c792-8ac1-4bbc-8bf1-c298e7a7b2c1',	'Atlantic herring',	'Advenio sublime amplus vero vespillo tergiversatio ullus votum conforto.',	'c632934d-094f-4c96-9972-4fa19568d461'),
('45022aa1-8df9-481e-900c-6fc12623477d',	'Albacore',	'Apostolus correptius tondeo vulgus articulus amaritudo summisse porro.',	'c632934d-094f-4c96-9972-4fa19568d461'),
('e8dc49d3-d4a2-44a1-8df3-44133f7c1826',	'Blue whiting',	'Bibo argumentum addo pariatur textor copia iusto solio provident.',	'c632934d-094f-4c96-9972-4fa19568d461'),
('f652598c-ee4b-497b-b9e2-ec3a716a6058',	'Mini Satin',	'Strenuus cultura magni virga bos illum.',	'7a38f26f-670f-477a-a02e-d717cb5542a7'),
('1b10afa1-5942-419b-ae67-67976bdbd831',	'Great Egret',	'Auctor credo crux cui amplexus.',	'90241c12-bfac-4345-a413-8b562ad05ae5'),
('64a7c25f-e7a3-4fae-abdc-6cd182a6559c',	'Pharaoh Hound',	'Via curiositas cerno.',	'0990337d-3607-434f-ba1b-8a541813b024'),
('3c1e75b1-bd88-4035-be85-81275250a1f9',	'New Zealand Heading Dog',	'Sordeo totidem cibus aspicio delicate umerus arguo umquam video.',	'0990337d-3607-434f-ba1b-8a541813b024');

DROP TABLE IF EXISTS "Location";
CREATE TABLE "public"."Location" (
    "locationId" text NOT NULL,
    "name" text,
    "country" text NOT NULL,
    "state" text,
    "city" text NOT NULL,
    "zipCode" integer NOT NULL,
    "address" text NOT NULL,
    "addressExtra" text,
    "userId" text NOT NULL,
    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
) WITH (oids = false);

INSERT INTO "Location" ("locationId", "name", "country", "state", "city", "zipCode", "address", "addressExtra", "userId") VALUES
('f3510374-9bf8-420a-b243-31b3b644909a',	'admin''s location',	'French Southern Territories',	'Arkansas',	'Earlenestad',	8723,	'45368 Bergstrom Roads',	'Apt. 407',	'e69f961a-64e6-49b0-9d04-3ff0b1ad25c3'),
('9dac141e-dabe-46b0-bcda-5fdd8581cec1',	'admin''s location',	'Iran',	'South Dakota',	'New Sincere',	2897,	'962 Bluebell Close',	'Suite 215',	'e69f961a-64e6-49b0-9d04-3ff0b1ad25c3'),
('1cd47b9d-f00a-4021-b93c-1c54c0cb669b',	'admin''s location',	'Togo',	'Arkansas',	'Fort Patricia',	5807,	'48397 Freddie Ville',	'Suite 213',	'e69f961a-64e6-49b0-9d04-3ff0b1ad25c3'),
('0fb10d90-7c06-41c8-aa5c-6d7a34e02b49',	'admin''s location',	'Liechtenstein',	'Florida',	'North Drewburgh',	9721,	'654 Homenick Spur',	'Apt. 934',	'e69f961a-64e6-49b0-9d04-3ff0b1ad25c3'),
('f0c5143e-8c90-4078-a691-1d32a19b5107',	'Garrett.Wintheiser45''s location',	'Costa Rica',	'Colorado',	'Terrystad',	7842,	'698 E Front Street',	'Suite 832',	'214e49ad-086c-42a6-84ef-ddb67055da4f'),
('cafbc730-9a54-4be4-ab3e-5581b4b58a47',	'Garrett.Wintheiser45''s location',	'Morocco',	'Oklahoma',	'West Georgiana',	1745,	'4533 School Close',	'Suite 154',	'214e49ad-086c-42a6-84ef-ddb67055da4f'),
('c701773a-ae75-4748-b2a0-a1a20e60793e',	'Garrett.Wintheiser45''s location',	'Antarctica',	'Missouri',	'East Aniya',	5519,	'458 D''Amore Stravenue',	'Suite 717',	'214e49ad-086c-42a6-84ef-ddb67055da4f'),
('04d76f12-0e4b-48b6-b72a-9b5ad1f629e5',	'Garrett.Wintheiser45''s location',	'Mali',	'California',	'Cooperfurt',	9630,	'734 Ash Road',	'Suite 498',	'214e49ad-086c-42a6-84ef-ddb67055da4f'),
('f7b5f5ab-1922-40e7-98a0-2d600225efe3',	'Joy_Block''s location',	'Anguilla',	'Georgia',	'Georgeborough',	9287,	'20600 Abbey Isle',	'Suite 378',	'd99ae208-440f-44dc-887c-093f9b0a241b'),
('b5f473ff-2a38-472a-9666-ca2d8bdf890a',	'Joy_Block''s location',	'Costa Rica',	'Idaho',	'Madgeshire',	1647,	'627 The Chase',	'Apt. 801',	'd99ae208-440f-44dc-887c-093f9b0a241b'),
('a9bf4389-6cd5-4bd0-8074-ec37e701d3fd',	'Joy_Block''s location',	'Cuba',	'New Jersey',	'Gideonworth',	967,	'49591 Turcotte Land',	'Suite 795',	'd99ae208-440f-44dc-887c-093f9b0a241b'),
('83f04ef0-f481-4dab-b65d-0edd58c6e862',	'Johnathan.Kozey85''s location',	'Belarus',	'New Jersey',	'Brakusbury',	5148,	'5963 Garden Street',	'Suite 489',	'a7ad0695-9516-4d2a-9c04-d8d8845f028b'),
('98aa4f8d-1bf6-4e7d-9ac6-d1a6b61f2bfe',	'Johnathan.Kozey85''s location',	'Jamaica',	'Arizona',	'West Wilmercester',	4167,	'434 Kub Underpass',	'Apt. 757',	'a7ad0695-9516-4d2a-9c04-d8d8845f028b'),
('b95775fe-61b6-407c-9061-43272a32e08c',	'Johnathan.Kozey85''s location',	'Kazakhstan',	'Indiana',	'South Gate',	6292,	'494 Carroll Villages',	'Apt. 778',	'a7ad0695-9516-4d2a-9c04-d8d8845f028b'),
('d69891c6-ebf8-4fc6-bb82-98a6b0e49db9',	'Johnathan.Kozey85''s location',	'Gambia',	'Maine',	'Clovis',	7736,	'37499 Deja Glen',	'Suite 641',	'a7ad0695-9516-4d2a-9c04-d8d8845f028b'),
('23ebb24e-cb14-48f2-b4b4-0bd8bcccd84e',	'Johnathan.Kozey85''s location',	'Isle of Man',	'Delaware',	'Boylemouth',	8982,	'86712 Clark Crossing',	'Suite 542',	'a7ad0695-9516-4d2a-9c04-d8d8845f028b'),
('d9a28b16-713e-49cf-9599-49d14add5b91',	'Buddy.Kemmer19''s location',	'Pakistan',	'Delaware',	'Eliasborough',	6375,	'657 Mraz Village',	'Apt. 636',	'dc73b06d-1d91-4ca9-b49d-52a572c04a1a'),
('0fa42680-7dfb-4516-9695-d2674288b4c7',	'Buddy.Kemmer19''s location',	'Estonia',	'Idaho',	'Metzland',	4419,	'56520 Second Avenue',	'Apt. 680',	'dc73b06d-1d91-4ca9-b49d-52a572c04a1a'),
('76df6c19-101e-426a-8101-828f275495ff',	'Otis_Erdman33''s location',	'Romania',	'Illinois',	'Nikobury',	4420,	'1434 Kaitlyn Rue',	'Apt. 159',	'9685ee90-3b28-4c94-a411-9d8195440bc9'),
('6a810a03-a2e6-483d-8d35-dbec0a26f3c8',	'Otis_Erdman33''s location',	'Democratic People''s Republic of Korea',	'Wyoming',	'New Odell',	1742,	'898 Walton Locks',	'Suite 842',	'9685ee90-3b28-4c94-a411-9d8195440bc9'),
('0bc6dba5-6a46-4796-81b5-4851a129cc25',	'Otis_Erdman33''s location',	'Saint Barthelemy',	'South Carolina',	'Lake Rachelshire',	42,	'289 Myron Field',	'Apt. 384',	'9685ee90-3b28-4c94-a411-9d8195440bc9'),
('61542fbc-d2c8-496d-be3d-aed096d782b6',	'Otis_Erdman33''s location',	'Cayman Islands',	'Washington',	'Lake Margueritemouth',	3552,	'47819 Aufderhar Land',	'Suite 873',	'9685ee90-3b28-4c94-a411-9d8195440bc9'),
('e1afebca-6997-43f0-b42e-4dd96e3d5b4e',	'Hailee_Brown21''s location',	'Bouvet Island',	'North Dakota',	'Wauwatosa',	7839,	'178 Church Walk',	'Suite 928',	'8c787c01-afe6-4302-a369-7a5822c289b5'),
('5e848ace-4547-476d-adbd-eb6e9bde3dd5',	'Hailee_Brown21''s location',	'Niue',	'New York',	'Port St. Lucie',	8459,	'79646 Spencer Well',	'Apt. 256',	'8c787c01-afe6-4302-a369-7a5822c289b5'),
('939a8d01-a033-49d1-b94e-784fb8d4ba1b',	'Hailee_Brown21''s location',	'Liechtenstein',	'California',	'Hoffman Estates',	6917,	'438 Balmoral Road',	'Suite 972',	'8c787c01-afe6-4302-a369-7a5822c289b5'),
('959aed86-313a-4969-bc0b-3d9c5f617f5d',	'Hailee_Brown21''s location',	'Panama',	'Louisiana',	'South Edwin',	8804,	'7794 Stamm Glen',	'Apt. 950',	'8c787c01-afe6-4302-a369-7a5822c289b5'),
('65e02be5-6167-47a4-807e-0246c2c8473e',	'Amelie.Rogahn''s location',	'Saudi Arabia',	'Delaware',	'Lake Coleman',	3082,	'574 Ankunding Overpass',	'Suite 696',	'0851d52b-4543-4fa2-a66b-d74def6be7a7'),
('87e40c14-98ed-4222-aafb-6148ddb67d5d',	'Amelie.Rogahn''s location',	'Eswatini',	'New Jersey',	'Cormierview',	1313,	'807 Denis Hills',	'Apt. 443',	'0851d52b-4543-4fa2-a66b-d74def6be7a7'),
('587fd42d-85f4-4cb6-be1d-6ceea1e9ed35',	'Amelie.Rogahn''s location',	'Guatemala',	'West Virginia',	'New Antonette',	6456,	'1433 A Street',	'Apt. 463',	'0851d52b-4543-4fa2-a66b-d74def6be7a7'),
('674315d4-ccbd-440a-a6c1-dc076118ca0c',	'Amelie.Rogahn''s location',	'Bouvet Island',	'Virginia',	'New Marcelinofield',	146,	'30669 Schmidt Meadows',	'Apt. 513',	'0851d52b-4543-4fa2-a66b-d74def6be7a7'),
('6cccdf18-f510-44c5-a384-148d413f7406',	'Amelie.Rogahn''s location',	'Romania',	'Kentucky',	'Vernport',	4803,	'91946 Waterside',	'Apt. 817',	'0851d52b-4543-4fa2-a66b-d74def6be7a7'),
('d8dbaa6d-5f6b-45df-9bfd-fcf2cf4740e3',	'Adah_Gleason''s location',	'Democratic Republic of the Congo',	'Florida',	'East Sidworth',	7822,	'82958 Ryan Land',	'Suite 664',	'466b7bbf-5748-42a0-a8b8-2a007adea424'),
('88eba1dd-ff38-4b38-81a5-971d4ade37d0',	'Adah_Gleason''s location',	'Saint Helena',	'Washington',	'East Osbornehaven',	4027,	'40510 Raoul Trafficway',	'Suite 578',	'466b7bbf-5748-42a0-a8b8-2a007adea424'),
('6203823c-c2ce-479d-86b3-c44960021ba2',	'Adah_Gleason''s location',	'Seychelles',	'Ohio',	'Feestside',	9096,	'9224 Petra Ranch',	'Apt. 764',	'466b7bbf-5748-42a0-a8b8-2a007adea424'),
('905831e0-7ad4-451e-bb77-d18502da67a0',	'Deontae13''s location',	'Reunion',	'Minnesota',	'Abbeyhaven',	8657,	'216 Castle Close',	'Suite 618',	'9ef12a8e-a1c5-4573-b29b-e0abf04838b3'),
('7ef40fc8-a8fd-4531-a5fb-4ba71c0705fa',	'Deontae13''s location',	'Tonga',	'Texas',	'Sengerbury',	950,	'9501 Jaskolski Forks',	'Suite 241',	'9ef12a8e-a1c5-4573-b29b-e0abf04838b3'),
('5daf6495-cfdd-484c-8d4a-5f1c58214a6c',	'Deontae13''s location',	'Sudan',	'Connecticut',	'Aracelifort',	874,	'70436 Fourth Avenue',	'Suite 220',	'9ef12a8e-a1c5-4573-b29b-e0abf04838b3'),
('b841bc94-0394-4d98-9c9b-070b0999f9a1',	'Deontae13''s location',	'Micronesia',	'New Mexico',	'Hayleefurt',	3244,	'202 Alexa Ridge',	'Apt. 330',	'9ef12a8e-a1c5-4573-b29b-e0abf04838b3'),
('ab184652-8434-47af-b73a-ed9d6de2431b',	'Eliseo_Pfannerstill17''s location',	'Nauru',	'Illinois',	'West Karine',	5137,	'31290 A Street',	'Suite 791',	'257d613c-6122-458d-b677-633d11f08200'),
('7f612910-8400-4414-ae94-154883e32bba',	'Johnny69''s location',	'Tuvalu',	'Arkansas',	'Haleighville',	2379,	'56082 Altenwerth Gardens',	'Apt. 157',	'ce6017aa-5459-482f-a454-d417c308f85a'),
('b055d00c-57da-49db-aadd-d7589e30d7b6',	'Johnny69''s location',	'Jamaica',	'South Carolina',	'Southfield',	8062,	'875 N Lincoln Street',	'Suite 171',	'ce6017aa-5459-482f-a454-d417c308f85a'),
('530c9d72-93ab-4ab1-a3e4-233184b038cf',	'Johnny69''s location',	'Libyan Arab Jamahiriya',	'Texas',	'McAllen',	4270,	'7609 Salisbury Road',	'Apt. 384',	'ce6017aa-5459-482f-a454-d417c308f85a'),
('c3f5406f-8c16-4eb2-a237-2f52fb7cc713',	'Johnny69''s location',	'Germany',	'California',	'Springfield',	2958,	'8597 Isobel Brooks',	'Apt. 351',	'ce6017aa-5459-482f-a454-d417c308f85a'),
('95359901-8d81-4c11-bae6-ad9b6c42b741',	'Rafaela.Schmitt''s location',	'Malawi',	'Kansas',	'Macejkovictown',	2242,	'5957 Vada Stravenue',	'Apt. 979',	'8e1d62aa-7256-4d82-bc22-d6a2cfeca143'),
('f30ebcc2-29a8-40e7-9f9f-7d260ea5abd4',	'Rafaela.Schmitt''s location',	'Venezuela',	'Ohio',	'Lake Jaidaview',	3285,	'81969 Marvin Place',	'Apt. 869',	'8e1d62aa-7256-4d82-bc22-d6a2cfeca143'),
('e4c8e92c-c98a-46ab-9886-46901ebb743b',	'Rafaela.Schmitt''s location',	'Antarctica',	'Michigan',	'Alexandrashire',	1116,	'5925 Brandon Mills',	'Apt. 463',	'8e1d62aa-7256-4d82-bc22-d6a2cfeca143'),
('4f6d5946-7d48-4092-bfa3-18c8a98b8073',	'Christina.Bechtelar''s location',	'Colombia',	'Louisiana',	'East Antoniabury',	3154,	'876 Skyla Bridge',	'Apt. 834',	'211d3781-8370-4930-a2ca-8bff609808e7'),
('e31aa5b9-72a7-4244-8d80-81e29a618a39',	'Eleanora_Osinski48''s location',	'Afghanistan',	'Louisiana',	'Redondo Beach',	7064,	'879 Carter Fork',	'Suite 279',	'ebede24e-415f-4b09-80c8-65a562a350a0'),
('a703537f-710f-4c1d-9665-400684f449cd',	'Eleanora_Osinski48''s location',	'Senegal',	'Delaware',	'Fort Charles',	5101,	'471 Paucek Greens',	'Apt. 101',	'ebede24e-415f-4b09-80c8-65a562a350a0'),
('3cfdba4c-5717-471d-8cf0-7de8a8be9434',	'Eleanora_Osinski48''s location',	'Kenya',	'California',	'Texas City',	9931,	'88796 Duke Street',	'Apt. 273',	'ebede24e-415f-4b09-80c8-65a562a350a0'),
('198e408b-5d15-4598-8117-d16a51d30fed',	'Eleanora_Osinski48''s location',	'Belize',	'Massachusetts',	'Karsonberg',	8805,	'18626 Adriana Islands',	'Apt. 839',	'ebede24e-415f-4b09-80c8-65a562a350a0'),
('bb01f60b-060b-4870-97ee-abf112e83ac4',	'Eleanora_Osinski48''s location',	'Papua New Guinea',	'Oklahoma',	'Fort Elijahside',	3736,	'98809 Duncan Route',	'Suite 612',	'ebede24e-415f-4b09-80c8-65a562a350a0'),
('1e8ee419-c21e-40dd-9c3e-8684bf657d41',	'Keyshawn_Bartoletti71''s location',	'Saint Kitts and Nevis',	'Iowa',	'Garretthaven',	9996,	'17321 Itzel Shoals',	'Suite 791',	'd7c0ad48-c44f-4e45-b0f1-58d2c0d0352e'),
('ace4ce14-2b3c-412f-98fd-3e8dfaf6ee18',	'Keyshawn_Bartoletti71''s location',	'Montserrat',	'Wyoming',	'Grand Prairie',	161,	'726 Tillman Burg',	'Suite 674',	'd7c0ad48-c44f-4e45-b0f1-58d2c0d0352e'),
('af7ed56b-cb64-4de7-8981-349f4f030dcc',	'Keyshawn_Bartoletti71''s location',	'Czechia',	'Texas',	'Adelaside',	1057,	'4323 King Flats',	'Apt. 686',	'd7c0ad48-c44f-4e45-b0f1-58d2c0d0352e'),
('afb77ce2-b535-48ac-a39c-c6cf91c7e17f',	'Keyshawn_Bartoletti71''s location',	'Mauritania',	'South Dakota',	'Lake Lavern',	3987,	'212 Western Road',	'Apt. 295',	'd7c0ad48-c44f-4e45-b0f1-58d2c0d0352e');

DROP TABLE IF EXISTS "Pet";
CREATE TABLE "public"."Pet" (
    "petId" text NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3),
    "name" text,
    "sex" "PetSexEnum" DEFAULT OTHER NOT NULL,
    "birthDate" timestamp(3),
    "description" text,
    "imageUrls" text[],
    "breedId" text,
    CONSTRAINT "Pet_pkey" PRIMARY KEY ("petId")
) WITH (oids = false);

INSERT INTO "Pet" ("petId", "createdAt", "updatedAt", "name", "sex", "birthDate", "description", "imageUrls", "breedId") VALUES
('bb379fd1-a19e-4a7d-9407-04e84fb2a159',	'2024-04-18 09:12:03.255',	'2024-04-18 09:12:03.255',	'Gillian',	'OTHER',	'2021-11-09 01:33:42.352',	'Cinis versus tergeo denique condico cogo.',	'{https://picsum.photos/seed/2ZYR159S/300/300,https://picsum.photos/seed/b19qSFkmE/300/300,https://picsum.photos/seed/d7OrRdT5/300/300}',	'3583f8f1-42cc-4078-8a73-a4db08ba95b7'),
('b08a59a8-855f-416b-b2dc-2386f0fd2007',	'2024-04-18 09:12:03.265',	'2024-04-18 09:12:03.265',	'Kaela',	'OTHER',	'2021-07-02 08:17:41.609',	'Utor curis blandior tepidus avaritia torqueo depulso.',	'{https://loremflickr.com/300/300?lock=8442111149998080,https://picsum.photos/seed/umbqJ6/300/300,https://picsum.photos/seed/NrV33093/300/300}',	'1b10afa1-5942-419b-ae67-67976bdbd831'),
('600b479c-b81f-4070-8676-21f5a3ebde5d',	'2024-04-18 09:12:03.275',	'2024-04-18 09:12:03.275',	'Keshaun',	'OTHER',	'2021-05-15 12:25:08.314',	'Virtus acerbitas pax aiunt carus alo coepi claudeo creptio.',	'{https://loremflickr.com/300/300?lock=7050441795829760,https://loremflickr.com/300/300?lock=5806567538556928,https://loremflickr.com/300/300?lock=5215945259745280}',	'fe12c792-8ac1-4bbc-8bf1-c298e7a7b2c1'),
('f83683d1-f541-47c3-ba89-977d5d0e8fb8',	'2024-04-18 09:12:03.285',	'2024-04-18 09:12:03.285',	'Briana',	'OTHER',	'2015-02-05 10:44:44.821',	'Solium vulpes vita uter cenaculum summa placeat.',	'{https://picsum.photos/seed/ZzeMF/300/300,https://loremflickr.com/300/300?lock=8387791406759936,https://loremflickr.com/300/300?lock=7604301935411200}',	'fe12c792-8ac1-4bbc-8bf1-c298e7a7b2c1'),
('9dd70ecf-68bb-4a1a-bb78-aecd586106a3',	'2024-04-18 09:12:03.297',	'2024-04-18 09:12:03.297',	'Scotty',	'OTHER',	'2014-06-21 18:05:54.737',	'Baiulus comedo volubilis.',	'{https://loremflickr.com/300/300?lock=2921819248001024,https://picsum.photos/seed/oOnFyi0LP/300/300,https://loremflickr.com/300/300?lock=5864381642440704}',	'69eea63b-c860-4dd7-afb1-10060449a83e'),
('e19a3f7a-76b1-4c29-a559-fdeea197c785',	'2024-04-18 09:12:03.308',	'2024-04-18 09:12:03.308',	'Asha',	'OTHER',	'2018-11-04 14:24:52.355',	'Sopor sophismata amitto strenuus cado.',	'{https://loremflickr.com/300/300?lock=100243909640192,https://picsum.photos/seed/sRMwpidK/300/300,https://loremflickr.com/300/300?lock=5344234785734656}',	'fe9d216a-389b-4c1d-b52f-d92bd8d02226'),
('face9cb0-8043-413f-ae79-1c9b229700b0',	'2024-04-18 09:12:03.318',	'2024-04-18 09:12:03.318',	'Roslyn',	'OTHER',	'2017-02-09 00:10:23.822',	'Tonsor cometes exercitationem vicinus desipio absens ab certe credo arceo.',	'{https://loremflickr.com/300/300?lock=1491003842232320,https://loremflickr.com/300/300?lock=8733820966666240,https://loremflickr.com/300/300?lock=6380790168420352}',	'63098a34-9d33-4529-bedc-6b75dfbe0301'),
('c2174e28-db28-4991-8992-7a2846c7ca4c',	'2024-04-18 09:12:03.328',	'2024-04-18 09:12:03.328',	'Katherine',	'OTHER',	'2018-12-30 05:29:08.329',	'Alter triumphus vociferor socius tibi tempus.',	'{https://picsum.photos/seed/e23qsLUM/300/300,https://picsum.photos/seed/pZNH0fH/300/300,https://picsum.photos/seed/v3CLx/300/300}',	'f652598c-ee4b-497b-b9e2-ec3a716a6058'),
('4da38e1c-8993-4eea-89c9-4a856c71588d',	'2024-04-18 09:12:03.338',	'2024-04-18 09:12:03.338',	'Theodore',	'OTHER',	'2015-05-27 07:13:51.29',	'Vulnus agnitio bene itaque umerus turbo cunctatio coniuratio animi.',	'{https://picsum.photos/seed/TY6FXX3XGo/300/300,https://picsum.photos/seed/wF8Haya1EB/300/300,https://picsum.photos/seed/nGt9aYZ/300/300}',	'69eea63b-c860-4dd7-afb1-10060449a83e'),
('4e04151b-368d-4d1f-9e37-fbb55f7e08ab',	'2024-04-18 09:12:03.348',	'2024-04-18 09:12:03.348',	'Freddie',	'OTHER',	'2019-02-10 09:14:55.816',	'Adficio voluptatem barba adulatio accendo.',	'{https://picsum.photos/seed/iE9ZA0TGJ/300/300,https://loremflickr.com/300/300?lock=2745577917906944,https://loremflickr.com/300/300?lock=3850727204061184}',	'fe9d216a-389b-4c1d-b52f-d92bd8d02226'),
('e0d8b602-314f-41a2-ab87-cd9c7c19962b',	'2024-04-18 09:12:03.359',	'2024-04-18 09:12:03.359',	'Damon',	'OTHER',	'2018-05-01 11:44:20.134',	'Sordeo vinco agnosco trepide canis aer ventus volva.',	'{https://loremflickr.com/300/300?lock=666685256237056,https://picsum.photos/seed/rXvW6wNMR/300/300,https://loremflickr.com/300/300?lock=8271506800902144}',	'45022aa1-8df9-481e-900c-6fc12623477d'),
('a5fa89ea-114b-4e13-948f-0f4c5233e5d4',	'2024-04-18 09:12:03.37',	'2024-04-18 09:12:03.37',	'Karley',	'OTHER',	'2020-12-09 18:31:15.584',	'Perspiciatis defetiscor civitas dedico benevolentia cunae peccatus cattus.',	'{https://picsum.photos/seed/c4qUdP0qd4/300/300,https://loremflickr.com/300/300?lock=902378198925312,https://picsum.photos/seed/CcHMQcBa6u/300/300}',	'3583f8f1-42cc-4078-8a73-a4db08ba95b7'),
('2335c14f-d8d4-48cf-97cc-7b228bb6092b',	'2024-04-18 09:12:03.379',	'2024-04-18 09:12:03.379',	'Immanuel',	'OTHER',	'2015-05-02 21:14:09.174',	'Defessus viridis universe.',	'{https://picsum.photos/seed/pW7f7j2Jh6/300/300,https://picsum.photos/seed/xUUmI/300/300,https://picsum.photos/seed/mteV6Xd/300/300}',	'c151a924-6e0b-47da-bb90-397033aa354c'),
('ee46d48c-b254-4f8d-9a66-6d9e09c6ba2a',	'2024-04-18 09:12:03.389',	'2024-04-18 09:12:03.389',	'Ruthe',	'OTHER',	'2017-03-17 18:35:53.864',	'Fuga dicta socius fuga sublime demoror balbus.',	'{https://loremflickr.com/300/300?lock=3009731945824256,https://loremflickr.com/300/300?lock=8661975559045120,https://loremflickr.com/300/300?lock=4417143768612864}',	'044e638d-8707-40d5-9448-5273c6c301c6'),
('566c9976-db24-445f-8154-e754d24b6db4',	'2024-04-18 09:12:03.4',	'2024-04-18 09:12:03.4',	'Lonnie',	'OTHER',	'2018-09-20 03:51:10.957',	'Caveo arbor surgo quisquam.',	'{https://loremflickr.com/300/300?lock=860331557519360,https://picsum.photos/seed/Dr9zEd/300/300,https://picsum.photos/seed/mJ2xpeJ2sy/300/300}',	'a05ebe42-cf06-4513-85bd-ebcc155963db'),
('7a30d27c-0355-46aa-b5f1-dc344e710592',	'2024-04-18 09:12:03.41',	'2024-04-18 09:12:03.41',	'Jeremy',	'OTHER',	'2019-08-30 07:45:48.75',	'Copia numquam temporibus aegre.',	'{https://loremflickr.com/300/300?lock=2431831066542080,https://picsum.photos/seed/hsjXSMnh/300/300,https://picsum.photos/seed/xJOhOdrq7/300/300}',	'2077e796-8cbd-41d0-99ee-ec3519a42b3a'),
('cf34cee0-8619-4332-8498-cce3649150e6',	'2024-04-18 09:12:03.42',	'2024-04-18 09:12:03.42',	'Brady',	'OTHER',	'2021-06-21 17:15:04.658',	'Uxor abeo confido coerceo vindico arguo adaugeo ipsum speculum.',	'{https://picsum.photos/seed/fFahvuDa7a/300/300,https://loremflickr.com/300/300?lock=3910376565506048,https://loremflickr.com/300/300?lock=4963951878078464}',	'2673ddb1-3817-4195-9229-303448e3b146'),
('da3c992f-5bf2-4d5d-b08f-3155081a53ae',	'2024-04-18 09:12:03.43',	'2024-04-18 09:12:03.43',	'Rahul',	'OTHER',	'2021-04-24 00:12:48.892',	'Odio surculus volutabrum tenus.',	'{https://loremflickr.com/300/300?lock=2525316266328064,https://loremflickr.com/300/300?lock=8323199831900160,https://loremflickr.com/300/300?lock=7430419922288640}',	'fe12c792-8ac1-4bbc-8bf1-c298e7a7b2c1'),
('a5bcd544-7315-409c-8e94-71890e8205e6',	'2024-04-18 09:12:03.24',	'2024-04-26 09:14:47.193',	'Olin',	'OTHER',	'2021-03-18 00:00:00',	'Socius accommodo comparo varietas aegrotatio cunctatio.',	'{https://picsum.photos/seed/DFr6uv9a/300/300,https://loremflickr.com/300/300?lock=1894110424203264,https://picsum.photos/seed/icav7jg/300/300,/media/uploads/lvggibgj_Olin.jpg}',	'64a7c25f-e7a3-4fae-abdc-6cd182a6559c'),
('6366333b-21a2-4ffa-a7bc-af5b72a18bee',	'2024-04-18 09:12:03.44',	'2024-04-26 09:16:12.442',	'Estell',	'OTHER',	'1910-04-26 00:00:00',	'Delibero appello defluo turbo tum.',	'{/media/uploads/lvggim3j_Estell.jpg}',	'7b8dad09-cb9d-457b-83bc-43c5c46cc487');

DROP TABLE IF EXISTS "PetStatus";
CREATE TABLE "public"."PetStatus" (
    "petStatusId" text NOT NULL,
    "status" "PetStatusEnum" DEFAULT UNKNOWN NOT NULL,
    "from" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "petId" text NOT NULL,
    CONSTRAINT "PetStatus_pkey" PRIMARY KEY ("petStatusId")
) WITH (oids = false);

INSERT INTO "PetStatus" ("petStatusId", "status", "from", "petId") VALUES
('5537a843-0668-4220-8778-0d68fb136264',	'INSHELTER',	'2024-04-18 09:12:03.248',	'a5bcd544-7315-409c-8e94-71890e8205e6'),
('3eb20bd3-4e27-4a92-a448-26b96650935d',	'INSHELTER',	'2024-04-18 09:12:03.26',	'bb379fd1-a19e-4a7d-9407-04e84fb2a159'),
('4eb76db7-1c83-4b46-ad35-2275d8dc413a',	'INSHELTER',	'2024-04-18 09:12:03.269',	'b08a59a8-855f-416b-b2dc-2386f0fd2007'),
('a437f2d7-f796-49e7-b94d-7550e88f9254',	'INSHELTER',	'2024-04-18 09:12:03.28',	'600b479c-b81f-4070-8676-21f5a3ebde5d'),
('a4bea473-329f-4061-9ba7-33b400a27224',	'INSHELTER',	'2024-04-18 09:12:03.291',	'f83683d1-f541-47c3-ba89-977d5d0e8fb8'),
('c0d52485-9286-4357-83c8-7b90a4106e5f',	'INSHELTER',	'2024-04-18 09:12:03.302',	'9dd70ecf-68bb-4a1a-bb78-aecd586106a3'),
('cdfe53c1-b515-4d1b-830f-d2ab9bb6e79f',	'INSHELTER',	'2024-04-18 09:12:03.313',	'e19a3f7a-76b1-4c29-a559-fdeea197c785'),
('715c3b39-5a64-4d7a-a7a9-868a6dec3b4e',	'INSHELTER',	'2024-04-18 09:12:03.323',	'face9cb0-8043-413f-ae79-1c9b229700b0'),
('1df61027-9735-4f6a-90f2-a8bddd43b6fb',	'INSHELTER',	'2024-04-18 09:12:03.333',	'c2174e28-db28-4991-8992-7a2846c7ca4c'),
('7accd084-1f4b-4f81-be2e-ec0913e77c14',	'INSHELTER',	'2024-04-18 09:12:03.343',	'4da38e1c-8993-4eea-89c9-4a856c71588d'),
('d2b18679-4365-4236-b3a1-290045216fc2',	'INSHELTER',	'2024-04-18 09:12:03.353',	'4e04151b-368d-4d1f-9e37-fbb55f7e08ab'),
('c8ddcb98-aeb3-4b52-880b-10e79f804682',	'INSHELTER',	'2024-04-18 09:12:03.364',	'e0d8b602-314f-41a2-ab87-cd9c7c19962b'),
('f369f236-3c43-441b-9ec6-265b6576fea5',	'INSHELTER',	'2024-04-18 09:12:03.374',	'a5fa89ea-114b-4e13-948f-0f4c5233e5d4'),
('65a4a554-cc7f-4da4-ac65-ea7283fae3e0',	'INSHELTER',	'2024-04-18 09:12:03.384',	'2335c14f-d8d4-48cf-97cc-7b228bb6092b'),
('acff4bba-3a09-4ba4-8626-a953381bec1d',	'INSHELTER',	'2024-04-18 09:12:03.394',	'ee46d48c-b254-4f8d-9a66-6d9e09c6ba2a'),
('e9d627d8-1511-425b-904d-a40a1452ac46',	'INSHELTER',	'2024-04-18 09:12:03.404',	'566c9976-db24-445f-8154-e754d24b6db4'),
('fd3aef2c-1599-485b-b287-02b4e43197cf',	'INSHELTER',	'2024-04-18 09:12:03.414',	'7a30d27c-0355-46aa-b5f1-dc344e710592'),
('d6c15018-1898-4837-876c-7878a5181523',	'INSHELTER',	'2024-04-18 09:12:03.425',	'cf34cee0-8619-4332-8498-cce3649150e6'),
('f339427c-0a5b-406b-acdf-b98441e8da68',	'INSHELTER',	'2024-04-18 09:12:03.435',	'da3c992f-5bf2-4d5d-b08f-3155081a53ae'),
('7b475ecc-ac0d-4e3c-9707-2086c40baf40',	'INSHELTER',	'2024-04-18 09:12:03.445',	'6366333b-21a2-4ffa-a7bc-af5b72a18bee'),
('ac0c250e-efbc-4b7d-8f26-de3bb47b53b6',	'ADOPTING',	'2024-04-18 09:12:03.473',	'b08a59a8-855f-416b-b2dc-2386f0fd2007'),
('4457ecee-d307-41c4-9307-7b0a4ed3c8b8',	'ADOPTING',	'2024-04-18 09:12:03.486',	'600b479c-b81f-4070-8676-21f5a3ebde5d'),
('c1e4e69c-9aaf-4d07-95f3-ab4cef3af969',	'ADOPTING',	'2024-04-18 09:12:03.498',	'f83683d1-f541-47c3-ba89-977d5d0e8fb8'),
('8d456572-bfe8-43a6-a57f-f6ee70dd2d7b',	'ADOPTING',	'2024-04-18 09:12:03.51',	'e19a3f7a-76b1-4c29-a559-fdeea197c785'),
('a6e0bf7e-60c1-4089-a9a0-c1766f4176c8',	'ADOPTING',	'2024-04-18 09:12:03.523',	'face9cb0-8043-413f-ae79-1c9b229700b0'),
('8714384c-4ba4-4b4a-a6ca-3294a0854421',	'ADOPTING',	'2024-04-18 09:12:03.535',	'c2174e28-db28-4991-8992-7a2846c7ca4c'),
('84e2698f-5e0b-435d-9a11-af3880ff438f',	'ADOPTING',	'2024-04-18 09:12:03.547',	'4da38e1c-8993-4eea-89c9-4a856c71588d'),
('ce8bef3f-9281-4a4d-b51c-1d052e673e5b',	'ADOPTING',	'2024-04-18 09:12:03.559',	'4e04151b-368d-4d1f-9e37-fbb55f7e08ab'),
('c05e8c21-d6f2-4c84-9638-1f850a9ba4fa',	'ADOPTING',	'2024-04-18 09:12:03.571',	'a5fa89ea-114b-4e13-948f-0f4c5233e5d4'),
('3dbb255f-26f4-434d-9917-aaec8732be44',	'ADOPTING',	'2024-04-18 09:12:03.583',	'ee46d48c-b254-4f8d-9a66-6d9e09c6ba2a'),
('98df7a9c-9718-4e24-a40d-f8d0159947df',	'ADOPTING',	'2024-04-18 09:12:03.596',	'7a30d27c-0355-46aa-b5f1-dc344e710592'),
('75c1ae29-2aee-4f94-b265-dcd44dfe94be',	'ADOPTING',	'2024-04-18 09:12:03.607',	'cf34cee0-8619-4332-8498-cce3649150e6'),
('f839bb98-24a5-4916-9a18-f6d8513ceaf9',	'ADOPTING',	'2024-04-18 09:12:03.619',	'da3c992f-5bf2-4d5d-b08f-3155081a53ae'),
('80b6c1b1-1a14-4734-a0d0-52f1eb7cef19',	'ADOPTING',	'2024-04-18 09:12:03.63',	'6366333b-21a2-4ffa-a7bc-af5b72a18bee'),
('c0c90334-c5fa-4997-86be-37545454eab7',	'ADOPTED',	'2024-04-26 09:15:32.818',	'6366333b-21a2-4ffa-a7bc-af5b72a18bee');

DROP TABLE IF EXISTS "Role";
CREATE TABLE "public"."Role" (
    "roleId" text NOT NULL,
    "roleName" text NOT NULL,
    "description" text,
    "permissions" "PermissionEnum"[],
    CONSTRAINT "Role_pkey" PRIMARY KEY ("roleId"),
    CONSTRAINT "Role_roleName_key" UNIQUE ("roleName")
) WITH (oids = false);

INSERT INTO "Role" ("roleId", "roleName", "description", "permissions") VALUES
('b4a58ecd-d49a-4dba-b6e0-ff6722ceb0ee',	'ADMIN',	NULL,	'{ACCESS_ANY_LOCATION,ACCESS_ANY_USER,UPDATE_USER_ROLES,GET_USER,GET_USERNAME,CREATE_USER,UPDATE_USER,DELETE_USER,UPLOAD_IMAGE,GET_LOCATION,CREATE_LOCATION,UPDATE_LOCATION,DELETE_LOCATION,START_ADOPTION,GET_ADOPTION,SET_ADOPTION,CREATE_PET,UPDATE_PET,DELETE_PET,CREATE_BREED,UPDATE_BREED,DELETE_BREED,CREATE_SPECIES,UPDATE_SPECIES,DELETE_SPECIES}'),
('c99de32b-ac00-43d6-9de6-51d2585117e9',	'USER',	NULL,	'{START_ADOPTION,UPLOAD_IMAGE}'),
('1a7bd4bf-c500-4ddb-8deb-bbe25db53ad4',	'VET',	NULL,	'{SET_ADOPTION,CREATE_BREED,CREATE_PET,CREATE_SPECIES,UPDATE_BREED,UPDATE_PET,UPDATE_SPECIES,DELETE_BREED,DELETE_PET,DELETE_SPECIES}');

DROP TABLE IF EXISTS "Species";
CREATE TABLE "public"."Species" (
    "speciesId" text NOT NULL,
    "name" text NOT NULL,
    "description" text,
    CONSTRAINT "Species_name_key" UNIQUE ("name"),
    CONSTRAINT "Species_pkey" PRIMARY KEY ("speciesId")
) WITH (oids = false);

INSERT INTO "Species" ("speciesId", "name", "description") VALUES
('0990337d-3607-434f-ba1b-8a541813b024',	'Dog',	NULL),
('9471b86c-3514-4282-a577-ae67434a6537',	'Cat',	NULL),
('7a38f26f-670f-477a-a02e-d717cb5542a7',	'Rabbit',	NULL),
('90241c12-bfac-4345-a413-8b562ad05ae5',	'Bird',	NULL),
('c632934d-094f-4c96-9972-4fa19568d461',	'Fish',	NULL),
('159d2fdf-adcc-46d4-ac07-e96a2315f91d',	'Bear',	NULL);

DROP TABLE IF EXISTS "User";
CREATE TABLE "public"."User" (
    "userId" text NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3),
    "username" text NOT NULL,
    "hashedPassword" text NOT NULL,
    "name" text,
    "email" text,
    "profileImageUrl" text,
    CONSTRAINT "User_pkey" PRIMARY KEY ("userId"),
    CONSTRAINT "User_username_key" UNIQUE ("username")
) WITH (oids = false);

INSERT INTO "User" ("userId", "createdAt", "updatedAt", "username", "hashedPassword", "name", "email", "profileImageUrl") VALUES
('e69f961a-64e6-49b0-9d04-3ff0b1ad25c3',	'2024-04-18 09:12:01.821',	'2024-04-18 09:12:01.821',	'admin',	'$2b$10$oGBg8IdvkPNOVOBCbLT3MO/kBtLeUYf.RDo79ctTRqE/Yc6OgnpEm',	'Admin User',	NULL,	NULL),
('214e49ad-086c-42a6-84ef-ddb67055da4f',	'2024-04-18 09:12:01.931',	'2024-04-18 09:12:01.931',	'Garrett.Wintheiser45',	'$2b$10$p6yrSHZZywAvgWYRDuhhfu2ZHx/wIS/doZ6wUxgFQyd3rGwSaU0oa',	'Matthew Goyette',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/241.jpg'),
('d99ae208-440f-44dc-887c-093f9b0a241b',	'2024-04-18 09:12:01.991',	'2024-04-18 09:12:01.991',	'Joy_Block',	'$2b$10$uXnyR3J9OClu4kw5bmfhIe3mtu1LNHDUvi3BW4NEkMIX2eoKeGk4G',	'Melba Monahan-Ratke',	NULL,	'https://avatars.githubusercontent.com/u/61772162'),
('a7ad0695-9516-4d2a-9c04-d8d8845f028b',	'2024-04-18 09:12:02.049',	'2024-04-18 09:12:02.049',	'Johnathan.Kozey85',	'$2b$10$cmny1Tw0KiZEiqyirlhg8OrNxeOPzE9iY4K68Fq1pF66UQGGEtPsG',	'Randolph Wintheiser',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/588.jpg'),
('dc73b06d-1d91-4ca9-b49d-52a572c04a1a',	'2024-04-18 09:12:02.11',	'2024-04-18 09:12:02.11',	'Buddy.Kemmer19',	'$2b$10$jmjv7yoFWp5.1jUIwNDsuu0cFmkyKfb20MLfqYAxn1uUTL8kXKtzK',	'Mr. Lonnie Sipes',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/283.jpg'),
('9685ee90-3b28-4c94-a411-9d8195440bc9',	'2024-04-18 09:12:02.168',	'2024-04-18 09:12:02.168',	'Otis_Erdman33',	'$2b$10$lLvNVHomEjXUZTpXtzyn8uglQOAxB3wk0wTIP8QRaiCDXjMiMI5um',	'Grace Wiegand-Satterfield',	NULL,	'https://avatars.githubusercontent.com/u/18211101'),
('8c787c01-afe6-4302-a369-7a5822c289b5',	'2024-04-18 09:12:02.226',	'2024-04-18 09:12:02.226',	'Hailee_Brown21',	'$2b$10$1gXjcOllVg8xgFnR0O9cMOmGWJbkYW.ui8.dRJJVmmkgpKq8c2S4.',	'Jesus Morissette',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/639.jpg'),
('0851d52b-4543-4fa2-a66b-d74def6be7a7',	'2024-04-18 09:12:02.283',	'2024-04-18 09:12:02.283',	'Amelie.Rogahn',	'$2b$10$L2X6va6lKbDOKDjtzmR4suQ0CNUJRwykLgQ.np/RWvfU66I7ATW9m',	'Caroline Lubowitz',	NULL,	'https://avatars.githubusercontent.com/u/50775453'),
('466b7bbf-5748-42a0-a8b8-2a007adea424',	'2024-04-18 09:12:02.343',	'2024-04-18 09:12:02.343',	'Adah_Gleason',	'$2b$10$DRGGFXdXRLA0XRL1iDuddOIobKTc6hn1WYa9DBbWQSg3fC9q8kPKa',	'Ebony Parisian',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1245.jpg'),
('9ef12a8e-a1c5-4573-b29b-e0abf04838b3',	'2024-04-18 09:12:02.401',	'2024-04-18 09:12:02.401',	'Deontae13',	'$2b$10$PHIAfOMjmtnlYdaM79kX3uaIAI8b6.tLflrEIuSRZYX6cwWLSSPjW',	'Mattie Fay',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1180.jpg'),
('257d613c-6122-458d-b677-633d11f08200',	'2024-04-18 09:12:02.458',	'2024-04-18 09:12:02.458',	'Eliseo_Pfannerstill17',	'$2b$10$DwGGWhNlP7qS6i98mpDmHutbhjLohK9rKziNM4.LLcgNhUbRFr.aS',	'Gayle Botsford Jr.',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1036.jpg'),
('ce6017aa-5459-482f-a454-d417c308f85a',	'2024-04-18 09:12:02.515',	'2024-04-18 09:12:02.515',	'Johnny69',	'$2b$10$fpyTmeE05CL0lKRW4j38Xeie2XaoFmR85OjMusbBXYAhh5UseQgOm',	'Miss Jeanette King',	NULL,	'https://avatars.githubusercontent.com/u/5292218'),
('8e1d62aa-7256-4d82-bc22-d6a2cfeca143',	'2024-04-18 09:12:02.591',	'2024-04-18 09:12:02.591',	'Rafaela.Schmitt',	'$2b$10$4XxHgXcEVHI4DUPd.pbgkeXLPPzURudvdok1/WXqUBpnL7VoU/NAW',	'Faith McGlynn-Wiegand',	NULL,	'https://avatars.githubusercontent.com/u/57427157'),
('211d3781-8370-4930-a2ca-8bff609808e7',	'2024-04-18 09:12:02.648',	'2024-04-18 09:12:02.648',	'Christina.Bechtelar',	'$2b$10$3DjLPIGYDm3RqxsqI1dsfevZXvIPV5mpgjXJ2hsZwnH0gmTU0IxLq',	'Renee Prosacco',	NULL,	'https://avatars.githubusercontent.com/u/66297876'),
('ebede24e-415f-4b09-80c8-65a562a350a0',	'2024-04-18 09:12:02.706',	'2024-04-18 09:12:02.706',	'Eleanora_Osinski48',	'$2b$10$C4IDp28JnEJZEjL6KmtQwungEzQpYRg0tqqZVM27cf5wRvlad/kFm',	'Pauline Hudson',	NULL,	'https://avatars.githubusercontent.com/u/26999088'),
('d7c0ad48-c44f-4e45-b0f1-58d2c0d0352e',	'2024-04-18 09:12:02.766',	'2024-04-18 09:12:02.766',	'Keyshawn_Bartoletti71',	'$2b$10$/pvKB1aSybiwmqnNSN8Ude.w4WdgE/zPTBIWm9Yntl19yaFPpR9bG',	'Brett Kling',	NULL,	'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/991.jpg');

DROP TABLE IF EXISTS "UserLogin";
CREATE TABLE "public"."UserLogin" (
    "userLoginId" text NOT NULL,
    "createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "refreshedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "refreshToken" text,
    "expireAt" timestamp(3),
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL,
    CONSTRAINT "UserLogin_pkey" PRIMARY KEY ("userLoginId")
) WITH (oids = false);

INSERT INTO "UserLogin" ("userLoginId", "createdAt", "refreshedAt", "refreshToken", "expireAt", "ipAddress", "userAgent", "userId") VALUES
('7a20b572-fb4c-4ba5-a091-d071364af5a4',	'2024-04-18 09:17:39.368',	'2024-04-18 09:17:39.368',	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlNjlmOTYxYS02NGU2LTQ5YjAtOWQwNC0zZmYwYjFhZDI1YzMiLCJpYXQiOjE3MTM0MzE4NTksImV4cCI6MTcxNDAzNjY1OX0.xBotv1VQ2HYHUnW1Dl3tBgNh2dRo8DsyG_ofk70afLQ',	'2024-04-25 09:17:39',	'::ffff:172.18.0.1',	'okhttp/5.0.0-alpha.2',	'e69f961a-64e6-49b0-9d04-3ff0b1ad25c3');

DROP TABLE IF EXISTS "UserRole";
CREATE TABLE "public"."UserRole" (
    "userId" text NOT NULL,
    "roleId" text NOT NULL,
    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId", "roleId")
) WITH (oids = false);

INSERT INTO "UserRole" ("userId", "roleId") VALUES
('e69f961a-64e6-49b0-9d04-3ff0b1ad25c3',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('e69f961a-64e6-49b0-9d04-3ff0b1ad25c3',	'b4a58ecd-d49a-4dba-b6e0-ff6722ceb0ee'),
('214e49ad-086c-42a6-84ef-ddb67055da4f',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('d99ae208-440f-44dc-887c-093f9b0a241b',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('a7ad0695-9516-4d2a-9c04-d8d8845f028b',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('dc73b06d-1d91-4ca9-b49d-52a572c04a1a',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('9685ee90-3b28-4c94-a411-9d8195440bc9',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('8c787c01-afe6-4302-a369-7a5822c289b5',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('0851d52b-4543-4fa2-a66b-d74def6be7a7',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('466b7bbf-5748-42a0-a8b8-2a007adea424',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('9ef12a8e-a1c5-4573-b29b-e0abf04838b3',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('257d613c-6122-458d-b677-633d11f08200',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('ce6017aa-5459-482f-a454-d417c308f85a',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('8e1d62aa-7256-4d82-bc22-d6a2cfeca143',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('211d3781-8370-4930-a2ca-8bff609808e7',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('ebede24e-415f-4b09-80c8-65a562a350a0',	'c99de32b-ac00-43d6-9de6-51d2585117e9'),
('d7c0ad48-c44f-4e45-b0f1-58d2c0d0352e',	'c99de32b-ac00-43d6-9de6-51d2585117e9');

ALTER TABLE ONLY "public"."Adoption" ADD CONSTRAINT "Adoption_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Breed" ADD CONSTRAINT "Breed_speciesId_fkey" FOREIGN KEY ("speciesId") REFERENCES "Species"("speciesId") ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."Pet" ADD CONSTRAINT "Pet_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("breedId") ON UPDATE CASCADE ON DELETE SET NULL NOT DEFERRABLE;

ALTER TABLE ONLY "public"."PetStatus" ADD CONSTRAINT "PetStatus_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("petId") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."UserLogin" ADD CONSTRAINT "UserLogin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("roleId") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON UPDATE CASCADE ON DELETE CASCADE NOT DEFERRABLE;

-- 2024-04-26 10:43:54.397816+00

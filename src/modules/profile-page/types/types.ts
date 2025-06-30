// "id": 1,
// "first_name": "Oleh",
// "last_name": "Somebody",
// "email": "oleh@gmail.com",
// "username": "oleh",
// "password": "$2b$10$zW7GFihiQSxop5N1iZ.vUO2.L.63O4Td.3FTKYASXRjR5WA7MUhT.",
// "profile": {
//     "date_of_birth": "2025-06-27T00:00:00.000Z",
//     "avatars": []
// }

export interface IUserForProfile {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	profile: {
		date_of_birth: string;
		avatars: {
			image: string;
		}[];
	};
	chatId: number;
	postsAmount: number;
	friendAmount: number;
}

export interface IMeForProfile {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
	profile: {
		date_of_birth: string;
		avatars: {
			image: string;
		}[];
	};
	postsAmount: number;
	friendAmount: number;
}



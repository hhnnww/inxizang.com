import fakerAddress from "#/lib/faker/faker-address.json";
import fakerName from "#/lib/faker/faker-name.json";

function randomItem<T>(list: readonly T[]): T {
	const index = Math.floor(Math.random() * list.length);
	return list[index] as T;
}

export function randomName(): string {
	return randomItem(fakerName);
}

export function randomAddress(): string {
	return randomItem(fakerAddress);
}

export const faker = {
	name: randomName,
	address: randomAddress,
};

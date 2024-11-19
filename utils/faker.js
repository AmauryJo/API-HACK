import { fakerFR as faker } from '@faker-js/faker';

export async function fakerJS(sex){
    const firstName = faker.person.firstName((sex === 'homme' ? 'male' : null));
    const lastName = faker.person.lastName((sex === 'homme' ? 'male' : null));
    const fakeMail = faker.internet.email();
    const job = faker.person.jobTitle();
    const phone = faker.phone.number();
    const location = faker.location.city();
    const birthDate = faker.date.birthdate();
    
    return { firstName, lastName, fakeMail, job, phone, location, birthDate };
}


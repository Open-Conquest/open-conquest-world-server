
export function Transactional(
  target: Object,
  propertyName: string,
  propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
// target === Employee.prototype
// propertyName === "greet"
// propertyDesciptor === Object.getOwnPropertyDescriptor(Employee.prototype, "greet")
const method = propertyDesciptor.value;

propertyDesciptor.value = async function(...args: any[]) {
  // convert list of greet arguments to string
  const params = args.map((a) => JSON.stringify(a)).join();

  const transaction = await connection.transaction();
  args.push(transaction);

  // invoke greet() and get its return value
  const result = method.apply(this, args);

  // convert result to string
  const r = JSON.stringify(result);

  // display in console the function call details
  console.log(`Call: ${propertyName}(${params}) => ${r}`);

  // return the result of invoking the method
  return result;
};
return propertyDesciptor;
};

class SimpService {
private simpRepository: SimpRepository;

constructor() {
  this.simpRepository = new SimpRepository();
}
}

// eslint-disable-next-line require-jsdoc
class SimpRepository {
constructor() {}

async saveSimp(user: User, transaction: any) {
  console.log('saving');
  const dbUser = await connection.models.user.create({
    username: user.$username.$value,
    password: user.$hashedPassword.$value,
  }, {transaction: transaction});
}
}

const username = 'test_username';
const password = 'hashed_password32f14edfq';
const user = userFactory.createUserWithHashedPassword(
  null,
  username,
  password,
);

const simpService = new SimpService();
simpService.addSimp(user);
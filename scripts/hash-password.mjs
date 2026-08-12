import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const password = process.argv[2];

async function main() {
  let secret = password;

  if (!secret) {
    const readline = createInterface({ input, output });
    secret = await readline.question("Password to hash: ");
    readline.close();
  }

  if (!secret || secret.length < 12) {
    throw new Error("Use a password of at least 12 characters.");
  }

  console.log(await bcrypt.hash(secret, 12));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});

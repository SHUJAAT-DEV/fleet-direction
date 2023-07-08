## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# Test coverage
$ pnpm run test:cov
```

## Brainstroming

- I have created a simple structure according to the document at https://docs.nestjs.com/. We will refine it after our discussion.

- I have created different folders according to functionality:

- Utils (will include enums, constants, etc.) This may be moved into the common folder.

- Common folder (includes helpers, environments, exceptions, etc.).

- Shared folder (this includes common API exceptions and response services).
  For example, if we need to throw an exception, we will use the exceptionService and return
  this.exceptionService.sendBadRequestException(RESPONSE_MESSAGES.USER_NOT_FOUND).

- API folder: This contains all the controllers, services, DTOs, and modules.

## License

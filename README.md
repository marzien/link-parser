## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

## Limitations

Valid URL format:

```
http://mariusdev.tech
https://mariusdev.tech
```

Not valid URL format:

```
mariusdev.tech
www.mariusdev.tech
```

Link type detector working only with mariusdev.tech domain.

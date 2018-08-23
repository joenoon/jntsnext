# Base

- Next.js (TBD)
- Server-side rendering
- Typescript (WIP)
- GraphQL Server (Relay Spec)
- Relay
- MobX
- React Native Web

Running:

```
yarn install
docker-compose up -d
PGPASSWORD=postgres psql -h 127.0.0.1 -U postgres -f deltas/initial.sql dev
yarn run gulp dev
```

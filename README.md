# Sano-KPI-Application
Collective repository for all components of the Sano KPI analysis application: the frontend dashboard, the main backend platform (SanoPublicationDB), and documentation for deploying the entire system.

## Deployment

To deploy the application, first clone this repository. Then, navigate to its parent directory and run:

```
git submodule update --init
```

This command pulls the code of the submodule repositories.

Next, set up your environment by assigning values to required environment variables. This can be done either by exporting them manually or (recommended) by creating a .env file with the following entries:

```
POSTGRES_PASSWORD=*your postgres password*
RAILS_MASTER_KEY=*your rails master key*
```

Postgres password may be any random character sequence, you can generate it with a secure random password generator.

Rails master key can be generated using `rails credentials:edit` in the application root folder `../SanoPublicationDB`.

After setting up the environment, run:

```
docker compose up --build
```

This will build the necessary containers and start the database, frontend dashboard, and backend platform.
You can check the addresses of the running services using:    

```
docker compose ps
```

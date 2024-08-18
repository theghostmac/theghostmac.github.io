---
title: "Docker + Rust + Solana: Building a Scalable Blockchain Backend"
meta_title: "Comprehensive Guide to Docker, Rust, and Solana Development"
description: "Learn how to build a scalable Solana wallet tracking service using Rust, PostgreSQL, and Docker. This comprehensive guide covers everything from project setup to containerization."
date: 2024-08-18
image: "/images/docker-rust-solana.png"
categories: ["Blockchain", "DevOps"]
author: "MacBobby Chibuzor"
tags: ["Docker", "Rust", "Solana", "PostgreSQL", "Backend", "Containerization", "DApps"]
draft: false
---

## Introduction
When prototyping a Rust application, you may need to provide a backend service to handle requests from your frontend.
Sometimes this might be for a dApp or a bot, but whichever, chances are that you might need a database to store data or state.

In this article, we'll walk through the process of creating a Rust-based backend service for a Solana wallet tracking
application, containerized with Docker.

We'll be creating a simple Solana wallet tracking service. This service will allow users to register wallets, track their balances, and record transactions. We'll use Rust for our backend, PostgreSQL for our database, and Docker to containerize everything, ensuring a consistent development and deployment environment.

## Prerequisites

Before we begin, make sure you have the following installed on your system:

- Docker
- Docker Compose
- Rust (latest stable version)
- A code editor of your choice

## Project Structure

Let's start by setting up our project structure:

```shell
solana-wallet-tracker/
├── src/
│   ├── main.rs
│   ├── db.rs
│   └── models.rs
├── Cargo.toml
├── Dockerfile
├── docker-compose.yml
└── .env
```

## Setting Up the Rust Project

First, let's create our Rust project:

```bash
cargo new solana-wallet-tracker
cd solana-wallet-tracker
```

Now, let's update our `Cargo.toml` file with the necessary dependencies:

```toml
[package]
name = "solana-wallet-tracker"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4.0"
actix-rt = "2.2"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
diesel = { version = "1.4.4", features = ["postgres", "r2d2"] }
dotenv = "0.15.0"
env_logger = "0.9"
log = "0.4"
solana-sdk = "1.9"
solana-client = "1.9"
```

## Creating the Rust Application

Let's create our main application file. In `src/main.rs`:

```rust
use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use serde::{Deserialize, Serialize};
use solana_sdk::pubkey::Pubkey;
use solana_client::rpc_client::RpcClient;

mod db;
mod models;

#[derive(Debug, Serialize, Deserialize)]
struct Wallet {
    address: String,
    balance: u64,
}

async fn register_wallet(wallet: web::Json<Wallet>, db: web::Data<db::Pool>) -> impl Responder {
    // Implementation for registering a wallet
    HttpResponse::Ok().json("Wallet registered")
}

async fn get_balance(wallet: web::Path<String>, db: web::Data<db::Pool>) -> impl Responder {
    // Implementation for getting wallet balance
    HttpResponse::Ok().json("Balance retrieved")
}

async fn record_transaction(transaction: web::Json<models::Transaction>, db: web::Data<db::Pool>) -> impl Responder {
    // Implementation for recording a transaction
    HttpResponse::Ok().json("Transaction recorded")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init();

    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = db::establish_connection(&database_url);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .route("/register", web::post().to(register_wallet))
            .route("/balance/{address}", web::get().to(get_balance))
            .route("/transaction", web::post().to(record_transaction))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
```

Now, let's create our database module. In `src/db.rs`:

```rust
use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn establish_connection(database_url: &str) -> Pool {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool")
}
```

And our models in `src/models.rs`:

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Transaction {
    pub from: String,
    pub to: String,
    pub amount: u64,
}
```

## Setting Up Docker

Now that we have our Rust application, let's containerize it using Docker. First, create a `Dockerfile` in the root of your project:

```dockerfile
# Use the official Rust image as a parent image
FROM rust:latest as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY . .

# Build the application
RUN cargo build --release

# Use a smaller base image for the final image
FROM debian:buster-slim

# Install necessary libraries
RUN apt-get update && apt-get install -y libpq-dev && rm -rf /var/lib/apt/lists/*

# Copy the binary from the builder stage
COPY --from=builder /usr/src/app/target/release/solana-wallet-tracker /usr/local/bin/solana-wallet-tracker

# Set the startup command to run your binary
CMD ["solana-wallet-tracker"]
```

Next, let's create our `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://user:password@db/solana_wallet_tracker
      - RUST_LOG=info

  db:
    image: postgres:13
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=solana_wallet_tracker

volumes:
  postgres_data:
```

## Setting Up the Database

We'll use Diesel, a popular ORM for Rust, to manage our database schema and migrations. First, install the Diesel CLI:

```bash
cargo install diesel_cli --no-default-features --features postgres
```

Now, let's set up our database schema. Create a new file `migrations/2023-05-01-create_wallets/up.sql`:

```sql
CREATE TABLE wallets (
    id SERIAL PRIMARY KEY,
    address VARCHAR NOT NULL UNIQUE,
    balance BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    from_address VARCHAR NOT NULL,
    to_address VARCHAR NOT NULL,
    amount BIGINT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

And the corresponding down migration in `migrations/2023-05-01-create_wallets/down.sql`:

```sql
DROP TABLE transactions;
DROP TABLE wallets;
```

## Running the Application

Now that we have everything set up, let's run our application using Docker Compose:

```bash
docker-compose up --build
```

This command will build your Rust application, start the PostgreSQL database, and run your application, all in separate containers.

## Testing the Application

You can test your application using curl or any API testing tool. Here are some example requests:

1. Register a wallet:
   ```bash
   curl -X POST http://localhost:8080/register -H "Content-Type: application/json" -d '{"address": "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK", "balance": 1000000000}'
   ```

2. Get a wallet balance:
   ```bash
   curl http://localhost:8080/balance/DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK
   ```

3. Record a transaction:
   ```bash
   curl -X POST http://localhost:8080/transaction -H "Content-Type: application/json" -d '{"from": "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK", "to": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", "amount": 50000000}'
   ```

## Conclusion

In this article, we've walked through the process of creating a Rust-based backend service for a Solana wallet tracking application, containerized with Docker. We've covered:

1. Setting up a Rust project with necessary dependencies
2. Creating a simple API with Actix-web
3. Setting up a PostgreSQL database and using Diesel for ORM
4. Containerizing the application with Docker
5. Using Docker Compose to manage our multi-container application

Remember, this is just a starting point. In a production environment, you'd want to add more robust error handling, implement proper logging, add authentication and authorization, and perhaps use a reverse proxy like Nginx in front of your Rust application.

As you continue to develop your Solana application, you might want to explore more advanced topics like implementing WebSocket connections for real-time updates, using Solana's Program Derived Addresses (PDAs) for more complex on-chain interactions, or implementing a caching layer with Redis for improved performance.

Docker and Rust provide a powerful combination for building blockchain applications. They offer the performance, safety, and scalability needed to handle the demands of modern decentralized systems. As you continue your journey in blockchain development, these tools will serve you well in creating robust, efficient applications on Solana and beyond.

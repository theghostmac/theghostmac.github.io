---
title: "Understanding MEV on Solana"
meta_title: "Understanding MEV on Solana"
description: "Understanding MEV: how they work on Solana, their types, mechanics"
date: "2024-09-15T05:00:00Z"
image: "/images/blockchain-foundations-header.png"
categories: ["Blockchain"]
author: "MacBobby Chibuzor"
tags: ["blockchain", "rust", "research", "solana"]
draft: true
---

## Introduction

MEV, originally known as "Miner Extractable Value", but now more commonly referred to as "Maximal Extractable Value," is a measure of
the profit of a miner (in Proof-of-Work systems) or validator (in Proof-of-Stake systems) can make through their ability to arbitrarily include, exclude,
or re-order transactions within the blocks they produce.

## Types of MEV

There are different types of MEVs, and their possibility and implementation on different blockchains. Lets discuss the popular types:

**1. Arbitrage**

This involves profiting from price differences across different exchanges or markets.

**2. Liquidations**

In DeFi protocols, MEV extractors can profit by liquidating undercollaterized positions.

**3. Sandwich Attacks**

This involves placing one order before a large trade and another after it, to profit from the price movements.

**4. Front-running**

Observing pending transactions and placing a similar transaction with a higher gas price to be executed first.

**5. Back-running**

Placing a transaction immediately after a known future transaction.

## How MEV Works

MEV opportunities arise due to the nature of blockchain systems, where transactions are broadcast to a public
mempool before being included in a block. Miners (PoW) or validators (PoS) can observe these pending transactions
and optimize their block construction to maximize their profits.

In Solana's case, the process is somewhat different due to its unique architecture:

1. Solana uses a PoS consensus mechanism with a leader schedule.
2. Transactions are processed much faster (sub-second finality) compared to Ethereum.
3. Solana uses a mempool-less architecture, which changes how MEV can be extracted.

## Possible MEV Strategies on Solana

Due to Solana's speed, traditional front-running might be less effective. Hence, it's more sensible to focus on
strategies that can be executed withing Solana's fast block times: Solana-specific DeFi protocols for liquidation and arbitrage opportunities.

## DeFi Liquidations on Solana

Liquidations are an important aspect of DeFi protocols, especially in lending platforms, and they present significant MEV opportunities.
Let's explore how DeFi liquidations work on Solana.

### Understanding DeFi Liquidations

Liquidations occur when a borrower's collateral value falls below a certain threshold, typically due to market volatility.
At this point, the loan becomes uncollaterized and the protocol allows liquidators to repay part of the loan in exchange
for a portion of the collateral, usually at a discount.

### Liquidations on Solana

Solana's high speed, low-cost transactions make it an attractive platform for DeFi protocols and liquidators. The process
is similar to other blockchains, but with some Solana-specific considerations:
    - **Faster execution:** Liquidations can happen much quicker due to Solana's sub-second finality.
    - **Lower costs:** Transaction fees on Solana are significantly lower, allowing for more frequent and smaller liquidations.
    - **Unique architecture:** Solana's account model and programming paradigm influence how liquidations are implemented and executed.

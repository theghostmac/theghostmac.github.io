---
title: "Hey, I am MacBobby Chibuzor!"
meta_title: "About"
description: "Software engineer specializing in FinTech and blockchain solutions, with a passion for mathematics and robotics."
image: "/images/avatar.png"
draft: false
---

### 🧮 Mathematics & Computation

I thrive at the intersection of mathematics, computation, and philosophy. My work combines rigorous mathematical concepts with practical software solutions, particularly in blockchain and financial systems.

Here's a recent example where I applied the Sum of Series formula for a Solana wallet distribution system:

```rust
/// Calculate distributions for each wallet based on the target amount.
fn calculate_wallet_distributions(total_wallet_balance: f64, wallet_count: usize) -> Vec<f64> {
    println!("Calculating distributions for wallets...");
    let total_parts: usize = (wallet_count * (wallet_count + 1)) / 2; // Using Sum of Series formula n(n+1)/2
    let part_value = total_wallet_balance / total_parts as f64;
    let mut distributions = Vec::new();

    for i in 1..=wallet_count {
        let wallet_share = part_value * i as f64;
        distributions.push(wallet_share);
    }
    println!("Distributions calculated: {:?}", distributions);
    distributions
}
```

### 🎓 Engineering Background

My journey began in Mechatronics Engineering, inspired by a vision of advancing robotics technology. Working with Arduino and Raspberry Pi sparked my interest in the possibilities of domestic robotics, leading to my current pursuit of founding a company in this space.

### 💡 Philosophy & Approach

To me, software engineering is more than writing code—it's about:
- Creating tangible solutions to complex problems
- Building systems that enhance financial accessibility
- Contributing to the evolution of blockchain technology
- Sharing knowledge and fostering community growth

### 🛠 Current Focus

I'm actively working on:
- Quantitative financial models for crypto markets
- Trading algorithms for synthetic assets
- Blockchain infrastructure development
- Open source contributions as Lead of OSCA Abeokuta

### 📚 Literary Influences

Books that have shaped my perspective:

| Book | Author | Key Takeaway |
|------|---------|-------------|
| The Almanack of Naval Ravikant | Eric Jorgenssen | Wealth creation through leverage and specific knowledge |
| The Rudest Book Ever | Shwetabh Gangwar | Clear thinking and decision-making |
| Elon Musk: A Biography | Ashlee Vance | Ambitious goal-setting and execution |

### 🔗 Connect & Collaborate

I'm always interested in discussing:
- Innovative blockchain solutions
- Quantitative trading strategies
- Robotics and automation
- Open source collaboration

Feel free to reach out through:
- GitHub: [@theghostmac](https://github.com/theghostmac)
- LinkedIn: [MacBobby Chibuzor](https://linkedin.com/in/chibuzor-oghenekaro)
- Email: [theghostmac@gmail.com](mailto:theghostmac@gmail.com)

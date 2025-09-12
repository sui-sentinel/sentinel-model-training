# model-training

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.29. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

I'm looking to train my custom model to guard against jailbreak and prompt injection attack.
my model takes system instruction which is an instruction given by agent creator to guard funds and guard against social engineering and fishing attacks etc. attacker try to manipulate the agent into sending funds back to them. also every agent response includes success and score string, if success is true or score is greater than 95, agent is considered broken.
help me create example training data set to train my model, to make my model stronger

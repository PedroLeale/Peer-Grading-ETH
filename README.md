# **Peer Grading: an Ethereum solution**

This project presents a proposed solution to the peer grading problem, combining it with the powerful technology of the Ethereum. The authors of the project are listed below and all are students of the Computer Science course at the [Federal University of Uberlândia](https://ufu.br/).

- Pedro Henrique Bufulin de Almeida (pedro.almeida@ufu.br)
- Pedro Henrique Resende Ribeiro (ribeiro.hr.pedro@ufu.br)
- Pedro Leale (pedro.leale@ufu.br)

## **Index**

- [The problem](#the-problem)
- [Protocol](#protocol)
- [Example](#example)
- [Technical solutions](#technical-solutions)
- [Proof of concept](#proof-of-concept)
- [Objectives](#objectives)
- [Contact us](#contact-us)

## **The problem**

A group of $n$ people needs to grade $n$ works produced by them considering some common, but imprecise/subjective quality criterion. Contemplating this scenario, we can imagine $n$ students who produced $n$ reports and must establish an order taking into account the quality of the reports for grading purposes.

## **Protocol**

Here we present an overview of a Smart Contract that implements a trustless/Game Theoric protocol where it is not necessary to expect participants to
behave honestly, but act in such a way as to maximize their gains. The protocol is described below:

1. Each participant contributes to an entropy pool using regular commit protocol. This pool will be used to produce several random numbers.

2. Each participant uploads their report (URL, link, hash, IPFS,...). In this way the report is associated with an Ethereum address.

3. Each participant is randomly assigned $k$ reports using the entropy pool. The $k$ parameter is defined in the system initialization and defines the
workload for each participant (he/she will need to study and review $k$ reports) and the average number of evaluations that each report will receive.

4. The participants evaluate the reports and establish an order for the reports they have evaluated and send this order to the contract. This phase is also
done with commit/reveal scheme.

5. A global ordering is defined using partial ordering from each participant. This step requires an optimization process, that is, producing a global ranking that minimizes the error of the partial rankings produced by the participants. Once one scoring system has been defined - sum of the squared error, for example - the optimization can be done off chain at a low cost by several participants and sent to the contract, which maintains only the best proposed ordering.

6. Once the ordering of the report has been established, participants are graded based on (a) the quality of the order produced and (b) for the quality of the report itself.

## **Example**

Let's assume a scenario where a professor is responsible for a course in which 5 students participate. Each student must produce a report to be evaluated and help correct 3 reports, also as an assessment process.

In this example, each student is randomly assigned to 3 reports, exemplified in Table 1, first column. Note that some reports will be evaluated more times than others, we believe this will not be an issue as $n$ and $k$ grow.

Following the execution of the protocol, each participant sends their corrections to the contract (in two stages of commit and revelation) (see column **Grading** in Table 1).

|Participant|Assigned|Grading|Penalty|
|:---------:|:------:|-------|-------|
|1          |2 3 4   |4 3 2  |0      |
|2          |1 3 5   |5 3 1  |0      |
|3          |1 2 4   |4 1 2  |1      |
|4          |2 3 5   |5 2 3  |1      |
|5          |1 3 4   |4 3 1  |0      |

**Table 1:** Proposed example

In the next step, any participant can submit a consensus vector candidate. For example, a user might initially send the array $<1,2,3,4,5>$. Later another user can send $<5,4,3,2,1>$ which the participants must accept as it is clearly better according to the corrections sent (more on this in [technical solutions](#technical-solutions) section). This process can be repeated until participants are satisfied or a time limit is reached.

Once a consensus vector is established the student assessment is done:

- **Using report quality**: which can be obtained directly from the consensus vector;
- **Using the reviewer work**: this can be obtained by the distance between the sent correction and the consensus vector (exemplified by column **Penalty** in Table 1).

## **Technical solutions**

In this section, we present some technical details for implementing the protocol in a Smart Contract ecosystem. We think about these details with tools that can be used in other contexts and also be exchanged for others that may eventually be more appropriate in a specific context.

### Sealed values

It is a standard solution, and for simplicity, we are assuming that this process is done with values and $nonces$ large enough to prevent attacks.

### Random numbers

Generating random numbers is a problem in Smart Contracts. In Peer Grading scenarios, it is possible to set up an $entropy pool$: each participant is invited to deposit a seed for the random number generator, committing to a value and revealing it later.

Then a value that will be used as $seed$ for a PRN function can be calculated as follows:

$$Seed_{global} = \mathcal{H}(E_{a_1}|E_{a_2}\dots E_{a_n}),$$

where $E_{a_n}$ is the entropy provided by $a_n$ participant.

Finally, each $a_n$ participant gets its seed using:

$$Seed_{a_n} = \mathcal{H}(Seed_{global}|a_n).$$

It is possible to observe that an honest participant, supplying an initial entropy using commit/reveal is enough to reach the security purposes.

### Assigning tasks

In order to assign  $k$ tasks to each participant the following algorithm can be used:

***
**Algorithm:** Selecting $k$ different tasks from $1 ... n$, excluding $id$, using $seed$ as the initial random value.
***
1) tasks $\leftarrow$ $\emptyset$ <br>
2) h $\leftarrow$ seed <br>
3) **while** |tasks| < k **do**: <br>
4) $\quad$ h $\leftarrow$ $\mathcal{H}(h)$ <br>
5) $\quad$ newtask = (h mod n) + 1 <br>
6) $\quad$ **if** newtask $\neq$ id **then**: <br>
7) $\quad$ $\quad$ tasks = tasks $\cup$ {newtask} <br>
8) $\quad$ **end if** <br>
9) **end while** <br>
10) **return** tasks
***

This process can be executed off-chain by each participant e verified by anyone.

### Consensus vector

The consensus vector that combines all partial solutions can be defined with a permutation over $n$ elements that minimizes the sum of inversions of each correction:


$$\sum_{s \in S} inv(V,s)$$

The inversion count can be done in $\mathcal{O}(n \lg n)$  time and it is important to highlight that the optimization itself can be computed off chain and only the consensus vector is sent to Smart Contract. Each participant can generate a consensus vector using their own computational power, the Smart Contract receives the proposals and accepts them if they are better than the previous one.

## Proof of concept

A proof of concept for the proposed protocol has already been implemented and used ([GSI075-Smart Contract](https://github.com/ivansendin/GSI075---Smart-Contract)), however, this preliminary version does not cover all scenarios of a real-world application (e.g. not revealing the commit or cheat in off-chain computation); lacks a proper client-side interface and its architecture is composed of a set of independent contracts ( for example, one contract to  [random numbers assignment](https://ropsten.etherscan.io/address/0x7f50FD8100F03588B41E6991565A4061D16BDcA3) and a different one to [commit the consensus vector](https://ropsten.etherscan.io/address/0xa7bea30e2bdFefe81f93517F01C52A51A3Aefe39)).

## Objectives

This proposal aims to develop a complete Peer-Grading System on the Ethereum platform, including the smart contract and its libraries to implement a trustless and self-executing solution, as also the client-side applications.

## Contact us

Pedro Henrique Bufulin de Almeida <br>
[![](./images/github.png)](https://github.com/pedrohba1) [![](./images/linkedin.png)](https://www.linkedin.com/in/pedro-henrique-bufulin-de-almeida-6a7375160) 

Pedro Henrique Resende Ribeiro <br>
[![](./images/github.png)](https://github.com/pedro-hr-resende) [![](./images/linkedin.png)](https://www.linkedin.com/in/pedro-hr-resende)

Pedro Leale <br>
[![](./images/github.png)](https://github.com/PedroLeale) [![](./images/linkedin.png)](https://www.linkedin.com/in/pedro-leale)

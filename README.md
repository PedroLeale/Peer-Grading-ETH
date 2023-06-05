# Authors from UFU (Federal University of Uberlândia)
Ivan da Silva Sendin <br />
Pedro Leale <br />
Pedro Henrique Resende Ribeiro <br />
Pedro Henrique Bufulin de Almeida <br />

# Peer Grading: an Ethereum Solution

## The problem

A group of n people needs to grade n works produced by them considering
some common, but imprecise/subjective quality criterion. Contemplating this
scenario, we can imagine n students who produced n reports and must establish
an order taking into account the quality of the reports for grading purposes.

## Protocol
Here we present an overview of a Smart Contract that implements a trust-
less/Game Theoric protocol where it is not necessary to expect participants to
behave honestly, but act in such a way as to maximize their gains. The protocol
is described below:

1. Each participant contributes to an entropy pool using regular commit
protocol. This pool will be used to produce several random numbers;

2. Each participant uploads their report (URL, link, hash, IPFS,...). In this
way the report is associated with an Ethereum address;

3. Each participant is randomly assigned k reports using the entropy pool.
The k parameter is defined in the system initialization and defines the
workload for each participant (he/she will need to study and review k re-
ports) and the average number of evaluations that each report will receive;

4. The participants evaluate the reports and establish an order for the reports
they have evaluated and send this order to the contract. This phase is also
done with commit/reveal scheme;

5. A global ordering is defined using partial ordering from each participant.
This step requires an optimization process, that is, producing a global
ranking that minimizes the error of the partial rankings produced by the
participants. Once one scoring system has been defined - sum of the squared error, for example - the optimization can be done off chain at a
low cost by several participants and sent to the contract, which maintains
only the best proposed ordering;

6. Once the ordering of the report has been established, participants are
graded based on a) the quality of the order produced; and b) for the
quality of the report itself;

## Feasibility

A protocol prototype was implemented in Solidity and tested in some courses.

## Contact with authors

Ivan da Silva Sendon: https://github.com/ivansendin <br />
Pedro Leale: https://github.com/PedroLeale <br />
Pedro Henrique Resende Ribeiro: https://www.linkedin.com/in/pedro-hr-resende <br />
Pedro Henrique Bufulin de Almeida: https://www.linkedin.com/in/pedro-henrique-bufulin-de-almeida-6a7375160 <br />
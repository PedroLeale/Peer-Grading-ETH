export const Explanation = () => {
  return (
    <div className="p-4 rounded bg-white w-1/2 m-auto">
      <h1 className="text-2xl font-bold mb-4">
        Peer Grading: An Ethereum Solution
      </h1>
      <p className="mb-2">
        <strong>Authors:</strong>
        Pedro Henrique Bufulin de Almeida, Pedro Henrique Resende Ribeiro, Pedro
        Leale
      </p>
      <p className="mb-2">
        <strong>University:</strong>
        Federal University of Uberlândia
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">The Problem</h2>
      <p className="mb-4">
        A group of individuals needs to grade various works produced by them,
        considering some common but imprecise or subjective quality criteria.
        For example, students need to grade each {`other's`} reports based on
        their quality.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Protocol</h2>
      <p className="mb-4">
        A Smart Contract implementing a trustless/Game Theoretic protocol is
        used. The protocol is designed such that participants do not need to act
        honestly but are incentivized to act in a manner that maximizes their
        gains.
      </p>

      <h2 className="text-xl font-semibold mt-4 mb-2">Objectives</h2>
      <ul className="list-disc list-inside mb-4">
        <li>To establish a fair grading system.</li>
        <li>
          To utilize {`Ethereum's`} blockchain technology for transparency.
        </li>
        <li>To reduce the subjectivity in grading through a smart contract.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4 mb-2">Contact Us</h2>
      <p className="mb-4">
        For more information, please reach out to the authors via{" "}
        <a href="https://github.com/PedroLeale/Peer-Grading-ETH">
          <span className="underline text-[#3366CC]">github</span>
        </a>
      </p>
    </div>
  );
};

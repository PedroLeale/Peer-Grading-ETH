export const Explanation = () => {
  return (
    <div className="md:flex flex-row">
      <div className="p-4  bg-white md:w-1/2 m-auto hover:bg-gray-200 transition-colors duration-200">
        <div className="p-4 rounded border-4 border-emerald-600">
          <h1 className="text-2xl font-bold mb-4">
            Peer Grading: An Ethereum Solution
          </h1>
          <p className="mb-2">
            <strong>Authors:</strong>
            Pedro Henrique Bufulin de Almeida, Pedro Henrique Resende Ribeiro,
            Pedro Leale
          </p>
          <p className="mb-2">
            <strong>University:</strong>
            Federal University of Uberlândia
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">The Problem</h2>
          <p className="mb-4">
            A group of individuals needs to grade various works produced by
            them, considering some common but imprecise or subjective quality
            criteria. For example, students need to grade each {`other's`}{" "}
            reports based on their quality.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Protocol</h2>
          <p className="mb-4">
            A Smart Contract implementing a trustless/Game Theoretic protocol is
            used. The protocol is designed such that participants do not need to
            act honestly but are incentivized to act in a manner that maximizes
            their gains.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">Objectives</h2>
          <ul className="list-disc list-inside mb-4">
            <li>To establish a fair grading system.</li>
            <li>
              To utilize {`Ethereum's`} blockchain technology for transparency.
            </li>
            <li>
              To reduce the subjectivity in grading through a smart contract.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-4 mb-2">Contact Us</h2>
          <p className="mb-4">
            For more information, please reach out to the authors via{" "}
            <a href="https://github.com/PedroLeale/Peer-Grading-ETH">
              <span className="underline text-[#3366CC]">github</span>
            </a>
          </p>
        </div>
      </div>

      <div className="p-4  md:w-1/2">
        <div className="p-4 rounded border border-4 border-emerald-600 hover:bg-gray-200 transition-colors duration-200">
          <h1 className="text-2xl font-bold mb-4">
            How to use this helper application
          </h1>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            Step 1: Have a dedicated RPC url (for mumbai)
          </h2>
          <p className="mb-4">
            This application requires reading events from the blockchain and{" "}
            {`it's`} more reliable to do that with a dedicated RPC. Just sue
            some dedicated RPC node service and it should be enough.
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            Step 2: Insert Contract Address
          </h2>
          <p className="mb-4">
            Navigate to{" "}
            <code className="text-sm bg-gray-200 p-1 rounded">
              /contract/[Your-Contract-Address]
            </code>{" "}
            in the URL to view the deployed peer grading contract.
            <br />
            Example:{" "}
            <code className="text-sm bg-gray-200 p-1 rounded">
              /contract/0x793591f2569B27208Df6ed3CEB396E1C89f4c630
            </code>
            You can also browse the contracts by clicking "go to contracts page"
            in the bottom of this page
          </p>

          <h2 className="text-xl font-semibold mt-4 mb-2">
            Step 2: All the participants interact with the contract in the
            following order
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              First, the participants publish their articles to IPFS. These{" "}
            </li>
            <li>
              then they generate a random value via a RandomnessSource contract
            </li>
            <li>
              Based on the randomness generated, the assignments can be
              distributed to each participant
            </li>
            <li>A participant can then propose a consensus</li>
            <li>
              Participants evaluate their penalties, and they can repeat sending
              consensus. This loop cycles continues until a final consensus is
              voted
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

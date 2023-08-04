// import Link from "next/link";
// import Image from "next/image";
// import { useAccount } from "wagmi";
// // import { Wallets } from "../Wallets";
// import { useDisclosure } from "@chakra-ui/react";
// import { SidedButton } from "../SidedButton";

// const Navbar = () => {
//   const { address, status } = useAccount();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       <nav className="bg-soft-pinky/80 flex flex-row justify-center">
//         <div className="items-center flex space-x-4 text-white w-full justify-between">
//           <div className="flex flex-row items-center">
//             <Link href="/home">
//               <div className="cursor-pointer">
//                 <Image
//                   src="/assets/logo1.png"
//                   alt="Hct logo"
//                   width={69}
//                   height={69}
//                   quality={100}
//                 />
//               </div>
//             </Link>
//             <SidedButton className="ml-6" />
//           </div>

//           <div className="flex flex-row">
//             <Link href="/places">
//               <div className="p-3 m-3 rounded bg-dark-blue text-white font-bold">
//                 places
//               </div>
//             </Link>
//             <Link href="/create-place">
//               <div className="p-3 m-3 rounded bg-dark-blue text-white font-bold">
//                 host your place
//               </div>
//             </Link>
//             <div
//               className="p-3 m-3 rounded bg-dark-blue text-white font-bold flex flex-row cursor-pointer"
//               onClick={() => {
//                 onOpen();
//               }}
//             >
//               <Image
//                 src="/assets/solid_wallet.svg"
//                 width={18}
//                 height={18}
//                 alt="wallet icon"
//               />

//               <span className="ml-3">
//                 {status === "connected" && address
//                   ? `${String(address).slice(0, 3)}...${String(address).slice(
//                       -3
//                     )}`
//                   : "connect wallet"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </nav>
//       {/* <CustomModal onClose={onClose} onOpen={onOpen} isOpen={isOpen}>
//         <Wallets />
//       </CustomModal> */}
//     </>
//   );
// };

// export default Navbar;

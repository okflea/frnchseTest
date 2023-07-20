export type referralType = {
  id: string
  firstname: string
  lastname: string
  email: string
  telephone?: number
  address?: string
  franchiseeID?: string
}

// export async function getData(): Promise<referralType[]> {
//   return [
//     {
//       id: "1",
//       firstname: "femto",
//       lastname: "last",
//       email: "example@email.com",
//       franchisee: {
//         id: "1",
//         branchTitle: "branch",
//         address: "address",
//         telephone: 1234567890
//       },
//       telephone: 1234567890,
//     },
//     {
//       id: "2",
//       firstname: "casca",
//       lastname: "last",
//       email: "ok@email.com",
//       franchisee: {
//         id: "1",
//         branchTitle: "branch",
//         address: "address",
//         telephone: 1234567890
//       },
//       telephone: 1234567890,
//       address: "address",
//     },
//     {
//       id: "3",
//       firstname: "firpo",
//       lastname: "last",
//       email: "email@email.com",
//       franchisee: {
//         id: "1",
//         branchTitle: "branch",
//         address: "address",
//         telephone: 1234567890
//       },
//       telephone: 1234567890,
//     },
//     {
//       id: "4",
//       firstname: "gantz",
//       lastname: "last",
//       email: "email@ok.in",
//       franchisee: {
//         id: "1",
//         branchTitle: "branch",
//         address: "address",
//         telephone: 1234567890
//       },
//       telephone: 1234567890,
//     },
//   ]
// }

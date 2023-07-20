export type User = {
  id: string
  email: string
  firstname: string
  lastname: string
  username: string
  role: Role | null
  franchisee: Franchisee
}
export type Role = {
  id: string
  name: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  permissions: Permission[]
}
export type Permission = {
  id: string
  title: string
  componentSign: string
}
export type Franchisee = {
  id: string
  branchTitle: string
  address: string
  telephone: number
}

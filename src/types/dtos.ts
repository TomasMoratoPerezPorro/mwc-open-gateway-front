export type IContact = {
  firstName: string
  lastName: string
  phone: string
}

export type UserElement = {
  id: number
  firstName: string
  lastName: string
}
export type GetUserElementResponse = {
  data: Array<UserElement>
}

export type DriverElement = {
  id: number
  contact: IContact
}

const driver: DriverElement = {contact: {firstName: 'John', lastName: 'Maverick', phone: '123456789'}, id: 1}

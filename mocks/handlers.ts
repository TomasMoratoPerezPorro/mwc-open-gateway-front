import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('https://api.example.com/users', () => {
    return HttpResponse.json([
      {
        id: 1,
        firstName: 'John',
        lastName: 'Maverick',
      },
      {
        id: 1,
        firstName: 'Arnau',
        lastName: 'Maverick',
      },
      {
        id: 1,
        firstName: 'Pep',
        lastName: 'Maverick',
      },
    ])
  }),
]

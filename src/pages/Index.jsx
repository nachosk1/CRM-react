import { useLoaderData } from 'react-router-dom'
import { getClients } from '../data/clients'
import Client from '../components/Client'

export function loader() {
  const clients = getClients()
  return clients;
}

const Index = () => {
  const clients = useLoaderData()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-700'>Clientes</h1>
      <p className='mt-3'>Administra tus Clientes</p>

      {clients.length ? (
        <table className='w-full bg-white shadow mt-5 table-auto'>
          <thead className='bg-blue-700 text-white'>
            <tr>
              <th className='p-2'>Cliente</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
              {
                clients.map(client => (
                  <Client client={client} key={client.id} />
                ))
              }
            </tbody>
        </table>
      ):(
        <p>fail</p>
      )

      }
    </>
  )
}

export default Index

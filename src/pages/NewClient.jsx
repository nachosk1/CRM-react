import { useNavigate, Form as FormDom } from 'react-router-dom'
import Form from '../components/Form'

export function action(){
  console.log("nice form")
  return {ok: true}
}

const NewClient = () => {

  const navigate = useNavigate()

  return (
    <>
      <h1 className='font-black text-4xl text-blue-700'>Nuevo Cliente</h1>
      <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>
      <div className='flex justify-end'>
        <button className='bg-blue-700 text-white px-3 py-1 font-bold uppercase' onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
        <FormDom method='post'>
          <Form />
          <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer' value="Registrar cliente" />
        </FormDom>

      </div>
    </>
  )
}

export default NewClient

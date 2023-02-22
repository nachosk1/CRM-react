import { useNavigate, Form as FormDom, useActionData, redirect } from 'react-router-dom'
import Error from '../components/Error'
import Form from '../components/Form'
import { addClient } from '../data/clients'

export async function action({request}){
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const email = formData.get("email")
  
  //Validaciones
  const errors = []
  if(Object.values(data).includes('')){
    errors.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)){
    errors.push("El E-mail no es válido")
  }

  //Retornar datos si hay errores
  if(Object.keys(errors).length){
    return errors
  }
  //se coloca await para que la siguiente linea no se ejecute hasta que termine de finalizar la funcion de addClient()
  await addClient(data)

  return redirect('/')

}

const NewClient = () => {

  const errors = useActionData()
  const navigate = useNavigate()

  console.log(errors)
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
        {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}
        <FormDom method='post' noValidate>
          <Form />
          <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer' value="Registrar cliente" />
        </FormDom>

      </div>
    </>
  )
}

export default NewClient

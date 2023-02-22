import Form from "../components/Form"
import { getClient, updateClient } from "../data/clients"
import { Form as FormDom, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import Error from "../components/Error"

// En caso de que alla errores 
export async function loader({ params }) {
    const client = await getClient(params.clientId)
    if (Object.values(client).length === 0) {
        throw new Response('', {
            status: 404,
            statusText: 'No hay Resultado'
        })
    }
    return client
}

// Accion para que el usuario pueda actualizar un cliente
export async function action({ request, params }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const email = formData.get("email")

    //Validaciones
    const errors = []
    if (Object.values(data).includes('')) {
        errors.push('Todos los campos son obligatorios')
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if (!regex.test(email)) {
        errors.push("El E-mail no es válido")
    }

    //Retornar datos si hay errores
    if (Object.keys(errors).length) {
        return errors
    }
    //se coloca await para que la siguiente linea no se ejecute hasta que termine de finalizar la funcion de addClient()
    await updateClient(params.clientId, data)
    return redirect('/')
}

const EditClient = () => {

    const navigate = useNavigate()
    const client = useLoaderData()
    const errors = useActionData()

    return (
        <>
            <h1 className='font-black text-4xl text-blue-700'>Editar </h1>
            <p className='mt-3'>A continuación podrás modificar los datos de un </p>
            <div className='flex justify-end'>
                <button className='bg-blue-700 text-white px-3 py-1 font-bold uppercase' onClick={() => navigate(-1)}>
                    Volver
                </button>
            </div>
            <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10'>
                {errors?.length && errors.map((error, i) => <Error key={i}>{error}</Error>)}
                <FormDom method='post' noValidate>
                    <Form client={client} />
                    <input type="submit" className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer' value="Guardar Cambios" />
                </FormDom>

            </div>
        </>
    )
}

export default EditClient

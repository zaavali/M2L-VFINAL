import { useEffect, useState } from 'react'
import axios from 'axios'


export default function User() {
    const [formdata, setFormData] = useState({ nom: '', email: '', mdp: ''})
    const [user, setUser] = useState([])
    const [affichage, setAffichage] = useState(false)

    const handleChangeData = (e) => {
        setFormData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

  

    const handleCreate = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            await axios.post('http://localhost:4000/api/user/user', formdata);
            console.log("Create request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

  
    const recup = async () => {
        await axios.get('http://localhost:4000/api/user/user').then((res) => {
            console.log(res)
            setUser(res.data)
            setAffichage(true)
        })
    }
 

    useEffect(() => {
        recup()
    }, [])

    return (
        <div>
            <h1>User Test</h1>
            {affichage ? (
                user.map((user) => (
                    <div key={user.uuid}>
                   
                            <p>id: {user.uuid}</p>
                            <p> nom: {user.nom}</p>
                            <p> email: {user.email}</p>
                    
                    </div>
                ))
            ) : (
                <p>Chargement...</p>
            )}
            <div>
             
                <form onSubmit={handleCreate}>
                
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='nom'
                        placeholder='choose a name'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='email'
                        placeholder='choose a mail'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='mdp'
                        placeholder='choose a password'
                    />
                 
                    <button type='submit'>Create an user</button>
                </form>
            </div>
        </div>
    )
}




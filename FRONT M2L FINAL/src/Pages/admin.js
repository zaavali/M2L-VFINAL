import { useEffect, useState } from 'react'
import axios from 'axios'
import Prodbdd from './produitsbdd'


export default function Admin() {
  
    const [user, setUser] = useState([])
    const [affichage, setAffichage] = useState(false)

   
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/user/user/${id}`);
            console.log("Delete request executed successfully!");
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
          <h1>Connecté en tant qu'admin</h1>
            <h1>User Test</h1>
            {affichage ? (
                user.map((user) => (
                    <div key={user.uuid}>
                        <fieldset>
                            <p>id: {user.uuid}</p>
                            <p> nom: {user.nom}</p>
                            <p> email: {user.email}</p>
                            <button onClick={() => handleDelete(user.uuid)}>Delete</button>
                        </fieldset>
                    </div>
                    
                ))
            ) : (
                <p>Chargement...</p>
            )}
            <div>
       
            <Prodbdd></Prodbdd>
            </div>
        </div>
        
    )
    
}





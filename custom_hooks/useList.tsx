import { collection, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"
import { Movie } from "../typings"

function useList(uid: string | undefined) {
// save Movie list in a piece of state and pass it to db
const [ list , setList ] = useState<Movie[] | DocumentData[]>()

// adding movie List for every single customer to database
useEffect(() => {
    if (!uid) return

    return onSnapshot(collection(db,"customers", uid , "myList" ), 
      (snapshot) => {
        setList(snapshot.docs.map((doc) => (
            {
                id: doc.id,
                ...doc.data(),
            }
        ))
      }
    )  
},[db, uid])

return list
}

export default useList
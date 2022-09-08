import { async } from '@firebase/util'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
  
  import { useRouter } from 'next/router'
  import { createContext, useContext, useEffect, useMemo, useState } from 'react'
  import { auth } from '../firebase'



  interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
  }
  interface AuthProviderProp {
    children: React.ReactNode
  }

//   we using create context cox it allows us to use what ever context we create accross all the
// components in our app, like theme, uthenticated user page access and more
// we just wrap our app with the contex.Provider and our app has acces to all the values in the context

  const AuthContext = createContext<IAuth>({
    user:null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
  })

export const AuthProvider = ({ children }: AuthProviderProp) => {
    const router = useRouter()
    const [ loading , setLoading ] = useState(false);
    const [user , setUser] = useState<User | null >(null)
    const [ error , setError ] = useState(null)

    // set InitialLoading to block the ui  and only render children if iniatial loading
    // state is false after authenticating User
    const [ initialLoading , setInitialLoading ] = useState(true)


    //   make auth persist so that app doesnt go to login page when user refresh
    useEffect (
        () => onAuthStateChanged(auth, (user) => {
            if (user) {
                // user Logged in 
                setUser(user)
                setLoading(false)
            } else {
                // usr not logged in yet
                setUser(null)
                setLoading(true)
                router.push('/login')
            }

            setInitialLoading(false)

        }), [ auth ]
    )

    const signUp = async (email: string , password: string) => {
        // set loading to true cux we are gonna signup the user
        setLoading(true)

        // upload user credentials to firebase
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            setUser(userCredential.user)
            if(user) {
                router.push('/')
                setLoading(false)
            }
            
        })
        // if any error happen, catch and alert
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))
    }

    const signIn = async (email: string , password: string) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then((useCredential) => {
            setUser(useCredential.user)
            // send the user Home
            router.push('/')
            setLoading(false)
        })
        // error handling
        .catch((error) => alert(error.message))
        .finally(() => setLoading(false))

    }

    const logout = async () => {
        setLoading(true)

            // call firebase signout function to logout the user
        signOut(auth).then(() => {
                setUser(null)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
        }
    

    // memoise our values before passing it ot authContext to make it more optimezed
    // and track and trigger changes will only recompute the memoized value when one of the deps has changed

    const memoisedValues = useMemo(() => ({
        user, signUp, signIn, logout, loading, error,

    }),[user, loading,error ]) 

  return (
     <AuthContext.Provider value={ memoisedValues }>
         { !initialLoading && children }
     </AuthContext.Provider>
    
  )

}


// use our useContext hook to reaturn the context we created createContext which is AuthContext
export default function useAuth () {
    return useContext(AuthContext)
}

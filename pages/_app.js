import React from 'react'
import { Layout } from '@/components'
import '../app/globals.css'
import { StateContext } from '@/context/StateContext'
import { Toaster } from 'react-hot-toast'

function myApp({Component, pageProps}){
    return(
        <StateContext>
            <Layout>
                <Toaster/>
                <Component {...pageProps}/>
            </Layout>
        </StateContext>
    )
}
export default myApp
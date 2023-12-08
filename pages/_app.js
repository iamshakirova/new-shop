import React from 'react'
import { Layout } from '@/components'
import '../app/globals.css'
import { StateContext } from '@/context/StateContext'

function myApp({Component, pageProps}){
    return(
        <StateContext>
            <Layout>
                <Component {...pageProps}/>
            </Layout>
        </StateContext>
    )
}
export default myApp
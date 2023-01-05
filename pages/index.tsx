import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import keyImg from '../public/key.png'
import { GetServerSideProps, NextPage } from 'next' 
import { Toaster, toast } from 'react-hot-toast'

type Props = {
  keyNumber: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    keyNumber: context.query?.keyNumber as (string | undefined) ?? ''
  }

  return {
    props: {
      ...props
    }
  }
}

const Form = () => {
  return 
}

const Home: NextPage<Props> = (props) => {
  
  const {keyNumber} = props
  const [who, setWho] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  React.useEffect(() => {
    setWho(localStorage.getItem('who') ?? '')
  }, [])

  const onSend = async () => {
    try {
      
      setLoading(true)

      const promise = fetch('/api/take', {
        method: 'POST',
        body: JSON.stringify({
          keyNumber,
          who
        })
      })
      
      await toast.promise(promise, {
        loading: 'Updating...',
        success: () => {
          setSuccess(true)
          localStorage.setItem('who', who)
          return 'Updated key value'
        },
        error: (error) => error,
      })

    } finally {
      setLoading(false)
    }
  }
  
  return (
    <>
      <Head>
        <title>oka key tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <Toaster position='top-center'/>

        <div className={styles.form}>

          <h1>okey trade</h1>
          
          <div className={styles.image}>
            <Image src={keyImg} alt="Picture of the key" />
            <span>{keyNumber}</span>
          </div>

          <fieldset>
            <input 
              type='text' 
              value={who} 
              onChange={(event) => setWho(event.target.value)} 
              placeholder='Your name'
              disabled={loading || success}
            />
          </fieldset>

          <footer>
            {
              success 
                ? <p>Updated!</p>
                : (
                  <button 
                    type='button' 
                    disabled={loading || success || who === '' || keyNumber === ''}
                    onClick={onSend}
                  >
                    Take it
                  </button>
                )
            }
          </footer>

        </div>
      </main>
    </>
  )
}

export default Home;

import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps, NextPage } from 'next'
import { Toaster, toast } from 'react-hot-toast'

type Props = {
	keyNumber: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const props: Props = {
		keyNumber: (context.query?.k as string | undefined) ?? '',
	}

	return {
		props: {
			...props,
		},
	}
}

const Home: NextPage<Props> = (props) => {
	const { keyNumber } = props
	const [who, setWho] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	React.useEffect(() => {
		const storageWho = localStorage.getItem('who') ?? ''
		setWho(storageWho)

		if (keyNumber !== '' && storageWho !== '') {
			onSend(storageWho, keyNumber)
		}
	}, [])

	const onSend = async (who: string, keyNumber: string) => {
		try {
			setLoading(true)

			const promise = fetch('/api/take', {
				method: 'POST',
				body: JSON.stringify({
					keyNumber,
					who,
				}),
			})

			await toast.promise(
				promise,
				{
					loading: 'Updating...',
					success: () => {
						localStorage.setItem('who', who)
						return `Update successful! Sääanks, ${who}!`
					},
					error: (error) => error,
				},
				{
					success: {
						duration: 10000,
					},
				}
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Head>
				<title>okey</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, '
				/>
				<meta
					name='description'
					content='Track key possession'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>
			</Head>

			<main className={styles.main}>
				<Toaster
					position='top-center'
					reverseOrder
					toastOptions={{
						iconTheme: {
							primary: 'black',
							secondary: 'white',
						},
					}}
				/>

				<div className={styles.container}>
					<h1>okey</h1>
					<label>
						<i className='ri-shield-keyhole-fill'></i>
					</label>
					<input
						type='text'
						value={keyNumber}
						readOnly
					/>

					<label>
						<i className='ri-emotion-fill'></i>
					</label>
					<input
						type='text'
						value={who}
						onChange={(event) => setWho(event.target.value)}
						placeholder='who are you...?'
					/>

					<button
						type='button'
						disabled={loading || who === '' || keyNumber === ''}
						onClick={() => onSend(who, keyNumber)}
					>
						<i className='ri-send-plane-2-fill'></i>
						sssend
					</button>
				</div>
			</main>
		</>
	)
}

export default Home

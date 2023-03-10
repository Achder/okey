import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link
					rel='preconnect'
					href='https://fonts.googleapis.com'
				/>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Pacifico&display=swap'
					rel='stylesheet'
				/>
				<link
					href='https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
					rel='stylesheet'
				></link>
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

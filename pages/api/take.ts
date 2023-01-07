import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_KEY })

type Data = {
	keyNumber: string
	who: string
}

const getPage = async (keyNumber: string) => {
	const response = await notion.databases.query({
		database_id: process.env.DATABASE_ID ?? '',
		filter: {
			property: 'Key',
			select: {
				equals: keyNumber,
			},
		},
	})

	return response.results?.[0]?.id ?? null
}

const updatePage = async (pageId: string, who: string) => {
	console.log(who)
	await notion.pages.update({
		page_id: pageId,
		properties: {
			Bearer: {
				rich_text: [
					{
						type: 'text',
						text: {
							content: who,
						},
					},
				],
			},
		},
	})
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { keyNumber, who } = JSON.parse(req.body) as Data
		const pageId = await getPage(keyNumber)

		if (!pageId) {
			res.status(404).send('Key not found!')
			return
		}

		await updatePage(pageId, who)
		res.status(200).send('Nice')
	} catch (error) {
		res.status(500).send(error)
	}
}

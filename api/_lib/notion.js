import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

const addProjectRequest = async (query, email, userId) => {
    const databaseId = '596801119ba945fcaa8f0635b1e26fd6'
    return await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            Search: {
                title: [
                    {
                        text: {
                            content: query,
                        },
                    },
                ],
            },
            Email: {
                rich_text: [
                    {
                        text: {
                            content: email,
                        },
                    },
                ],
            },
            UserID: {
                rich_text: [
                    {
                        text: {
                            content: userId,
                        },
                    },
                ],
            },
        },

    }).catch((err) => {
        throw new Error(err.body)
    })
};

export {
    addProjectRequest
}
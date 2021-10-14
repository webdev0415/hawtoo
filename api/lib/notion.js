import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_SECRET_KEY })

/**
 * Gets the project ID from Notion for the homepage and other featured spots.
 *
 * @param {number} adSpotID The ad spot ID from Notion.
 * @returns number Project ID that's being featured.
 */
const getAdSpot = async (adSpotID) => {
    const adSpot = parseInt(adSpotID)
    const databaseId = '365e80a8e1a144a2a5bf1db0d799a96e'
    let projectId = null;

    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Ad ID',
            number: {
                equals: adSpot
            },
        }
    });

    if (response.results && response.results.length > 0) {
        projectId = response.results[0].properties['Project ID'].number
    } else {
        throw new Error('Could not find advertisement spot in Notion')
    }

    return projectId
}

const addProjectRequest = async (url, email, userId, searchQuery) => {
    const databaseId = '596801119ba945fcaa8f0635b1e26fd6'
    return await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            Link: {
                title: [
                    {
                        text: {
                            content: url,
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
            SearchQuery: {
                rich_text: [
                    {
                        text: {
                            content: searchQuery,
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
    addProjectRequest,
    getAdSpot
}
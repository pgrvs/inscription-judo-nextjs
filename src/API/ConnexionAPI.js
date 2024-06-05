"use server"

const callAPI = async (method, path, data = null) => {
    const apiKey = process.env.API_KEY_Dolibarr
    const baseUrl = process.env.API_URL_Dolibarr

    let url = baseUrl + path

    const headers = {
        'DOLAPIKEY': apiKey
    }

    let options = {
        method: method,
        headers: headers
    }

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json'
        options.body = data ? JSON.stringify(data) : null
    } else if (method === 'DELETE') {
        options.method = 'DELETE'
    } else if (data) {
        url += '?' + new URLSearchParams(data).toString()
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}

export default callAPI
import { google, sheets_v4 } from 'googleapis'
import { NextResponse } from 'next/server'

const createGoogleAuth = (): any => {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(
        /\\n/g,
        '\n'
      ),
    },
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  })
}

const createGoogleSheetsClient = (auth: any): sheets_v4.Sheets => {
  return google.sheets({
    auth,
    version: 'v4',
  })
}

const appendValuesToGoogleSheet = async (
  sheets: sheets_v4.Sheets,
  values: any[]
) => {
  return sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'A1:C1',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [values],
    },
  })
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const {
      name,
      age,
      phoneNumber
    } = (await req.json())

    const auth = createGoogleAuth()
    const sheets = createGoogleSheetsClient(auth)

    const response = await appendValuesToGoogleSheet(sheets, [
      name, age, phoneNumber
    ])

    return NextResponse.json({
      status: 201,
      data: response.data,

    })
  } catch (e: any) {
    return NextResponse.json({
      status: e.code,
      message: e.message,
    })
  }
}          
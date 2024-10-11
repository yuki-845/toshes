import axios from 'axios'

// 音声合成APIエンドポイント
export default defineEventHandler(async (event) => {
  try {
    // リクエストからテキストとスピーカーを取得
    const { text, speaker } = await readBody(event)

    // 音声合成用クエリの作成
    console.log(process.env.VOICEVOX_URL)
    const responseQuery = await axios.post(
      `${process.env.VOICEVOX_URL}/audio_query?speaker=${speaker}&text=${text}`
    )

    // 音声クエリを取得
    const query = responseQuery.data

    // 音声合成
    const responseSynthesis = await axios.post(
      `${process.env.VOICEVOX_URL}/synthesis?speaker=${speaker}`,
      query,
      {
        responseType: 'arraybuffer',
      }
    )

    // Base64形式に変換
    const base64Data = Buffer.from(responseSynthesis.data, 'binary').toString('base64')

    // JSON形式でクライアントに返す
    return { response: base64Data }
  } catch (error) {
    console.error('音声合成エラー', error)
    throw createError({
      statusCode: 500,
      message: '音声合成に失敗しました',
    })
  }
})

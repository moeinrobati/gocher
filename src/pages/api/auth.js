import { supabaseServer } from '../../lib/supabaseServer';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const { user } = req.body

    const { error } = await supabaseServer
      .from('users')
      .upsert({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        is_premium: user.is_premium || false,
        allows_write_to_pm: user.allows_write_to_pm || false,
        updated_at: new Date().toISOString()
      })

    if (error) throw error

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

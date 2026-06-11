export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, msg, ip, isp, location, battery, device } = req.body;

    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    if (!botToken || !chatId) {
        return res.status(500).json({ error: 'Server configuration missing' });
    }

    const textMsg = `🚀 New Client Alert - Ashu Studio 47!\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${msg}\n\n📍 IP: ${ip || 'N/A'}\n🌐 ISP: ${isp || 'N/A'}\n📍 Location: ${location || 'N/A'}\n🔋 Battery: ${battery || 'N/A'}\n📱 Device: ${device || 'N/A'}`;

    try {
        const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: textMsg,
                parse_mode: 'HTML'
            })
        });

        if (tgRes.ok) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ error: 'Telegram error' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

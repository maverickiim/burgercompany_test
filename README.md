# Burger Company — Vercel Deployment

## File Structure
```
burger-company/
├── public/
│   └── index.html        # Your website
├── api/
│   └── order.js          # Serverless function → sends orders to Telegram
├── vercel.json           # Routing config
└── .env.example          # Environment variable template
```

## Deploy to Vercel

### 1. Install Vercel CLI (optional)
```bash
npm i -g vercel
```

### 2. Set Environment Variables
In the Vercel dashboard → Project → Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| `TELEGRAM_BOT_TOKEN` | Your bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Your chat ID from @userinfobot |

### 3. Deploy
**Via CLI:**
```bash
cd burger-company
vercel
```

**Via GitHub:**
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import the repo
3. Add the environment variables above
4. Click Deploy ✅

## Getting Telegram Credentials
1. Open Telegram → search **@BotFather** → `/newbot` → copy the token
2. Open Telegram → search **@userinfobot** → it replies with your chat ID

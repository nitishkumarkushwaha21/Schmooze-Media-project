# AI Startup Validator

Next.js full-stack app to validate startup ideas using OpenRouter and store reports in Supabase.

## Run Locally

1. Install dependencies

npm install

2. Add environment variables in .env.local

OPENROUTER_API_KEY=your_openrouter_key
OPENROUTER_MODEL=anthropic/claude-sonnet-4.6
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

3. Start app

npm run dev

## API Endpoints

- POST /api/validate
- GET /api/ideas
- GET /api/ideas/:id
- DELETE /api/ideas/:id

## Prompt Used for AI Validation (Updated)

Source: lib/claude.ts

The app sends this exact prompt template to OpenRouter:

You are a startup analyst. Analyze the following startup idea and return a JSON object only.
Return valid raw JSON only. Do not wrap it in markdown. Do not include any explanation text.
Use exactly these 8 keys and no others: problem, customer, market, competitors, tech_stack, risk_level, profit_score, profit_reasoning.
Be opinionated and decisive. Do not default to Medium risk or average scores unless the idea is genuinely mixed.

Scoring rubric:

- profit_score must be an integer from 0 to 100
- use 0-30 for weak ideas with low demand, poor differentiation, or difficult economics
- use 31-49 for below-average ideas with clear concerns
- use 50-69 for mixed ideas with meaningful upside and meaningful risk
- use 70-84 for strong ideas with good demand and execution potential
- use 85-100 only for unusually strong and clearly differentiated opportunities

Risk rubric:

- Low: clear demand, realistic execution, and manageable competition
- Medium: some upside but notable execution, market, or competition risk
- High: weak differentiation, unclear market demand, regulatory friction, or hard distribution

Important:

- Avoid clustering around 50-70 unless justified
- Choose Low or High risk when the case is clearly strong or clearly weak
- Make profit_reasoning explicitly justify the score and risk choice
- If the idea has proven demand, easy distribution, low regulatory friction, and a realistic MVP, give it a high score and Low risk
- If the idea is capital-heavy, regulatory-heavy, behavior-change-heavy, or weakly differentiated, score it aggressively lower and use High risk
- Do not avoid scores above 80 when the idea is genuinely strong
- Do not avoid scores below 35 when the idea is genuinely weak

Startup Idea: "{ideaText}"

Return this exact JSON structure:
{
"problem": "What core problem does this solve? (2-3 sentences)",
"customer": "Who is the target customer? Be specific about demographics and psychographics. (2-3 sentences)",
"market": "What is the estimated market size and growth opportunity? (2-3 sentences)",
"competitors": "List 3-4 main competitors and what makes this idea different.",
"tech_stack": "Suggested MVP tech stack. Keep it practical and concise.",
"risk_level": "Low | Medium | High",
"profit_score": 72,
"profit_reasoning": "Why did you give this profitability score and risk level? (1-2 sentences)"
}

## OpenRouter Configuration

- Endpoint: https://openrouter.ai/api/v1/chat/completions
- Model: OPENROUTER_MODEL (env based, easy to switch to paid/high-quality models)
- Temperature: 0.2
- Max tokens: 1024
- Response format: json_object

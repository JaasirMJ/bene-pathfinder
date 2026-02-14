Benefits GPS — AI-Powered Welfare Scheme Eligibility Navigator

Benefits GPS is a multi-language, AI-assisted, Aadhaar-integrated welfare navigation platform designed to help Indian citizens — especially students, rural families, women, farmers, and persons with disabilities — automatically discover the schemes they are eligible for.

This project demonstrates how AI, automation, location services, and structured eligibility rules can transform access to government benefits at a national scale.

🌟 Why “Benefits GPS”? — The Meaning Behind the Name

Just like GPS guides people to the right destination,
Benefits GPS guides citizens to the right government benefits.

BENEFITS → Thousands of schemes exist, but people don’t know about them.

GPS → Navigates and reroutes intelligently.

Benefits GPS → Navigates users through the complex welfare ecosystem.

Our metaphor:
“A digital welfare navigator that finds your path — automatically.”

🧩 Project Overview

Millions of citizens miss out on welfare schemes due to:

Lack of awareness

Missing or invalid documents

Complex eligibility rules

No digital literacy

Deadlines expiring silently

Benefits GPS solves this using:

AI document analysis

Rule-based eligibility engine

Multilingual chatbot

Real-time location-based scheme matching

Aadhaar/OTP authentication

Automated notifications

State-wise scheme catalog (including Tamil Nadu schemes)

🎬 User Story (Hackathon Pitch Narrative)

Our demo follows the story of Ravi, a bright student from a rural village:

❌ Before Benefits GPS

No awareness about scholarships

Parents unaware of documents

Teachers overwhelmed

Missed scheme deadlines

Family suffers financially

Relatives miss disability and farmer benefits

Opportunity lost due to lack of information

✔ With Benefits GPS

Aadhaar linked → automatic eligibility tracking

Documents uploaded via assisted centers

Alerts when schemes open/expire

AI identifies all relevant schemes

Eligibility displayed as YES / NO clearly

Village-level officers/NGOs can help update documents

Students never miss an opportunity

SDG goals supported (Education, Poverty Reduction, Reduced Inequalities)

Benefits GPS becomes a lifeline for rural citizens.

🏎️ Key Features
🔐 1. Login & Identity

Aadhaar-based verification (OTP simulation)

Email OTP login (Supabase Auth)

Google Login

Multilingual support (Tamil, Hindi, English, Malayalam)

🧑‍💼 2. User Profile

Stores:

Personal info

Age, gender, state

Caste, income

Disability

Occupation

Household members

Data stored securely in Supabase DB.

📄 3. Document Upload & AI Validation

AI analyzes:

Aadhaar

Income certificate

Caste certificate

Disability cards

Extracts:

Name

DOB

Address

Income

Validity dates

Checks consistency & flags mismatches.

🧠 4. AI Eligibility Engine

The core of Benefits GPS:

AI reads:

Government scheme text

User profile

Documents

Outputs:

ELIGIBLE: YES / NO

Explanation of why

Missing documents

Required steps

No percentages — clear binary results for the user.

📍 5. Location-Based Scheme Analysis

Using browser geolocation:

Match schemes for user’s locality

Find nearest government office/NGO

Provide directions link (Google Maps)

🎓 6. Tamil Nadu Schemes Included

For demo:

Pudhumai Penn Scheme

Free Laptop Scheme

Age-based pensions

Marriage assistance schemes

Farmer loan waiver

Disability financial assistance

And more from the Supabase schemes table.

🤖 7. AI Chatbot Assistant

Multilingual chatbot:

“What schemes am I eligible for?”

“How to apply?”

“What documents do I need?”

Tamil/Hindi/English/Malayalam support

AI acts as a 24/7 welfare counselor.

🧭 8. Saved Schemes & Recent Views

Save for later (localStorage)

Recent schemes visited

Frontend-only enhancements

Does not affect backend logic

📝 9. How It Works Page

Explains:

Login → Aadhaar/OTP

AI profile analysis

Document checking

Eligibility engine

Personalized scheme suggestions

Application steps

🧱 Tech Stack
🔹 Frontend

HTML / CSS / JavaScript

Tailwind-injected components

Multilingual UI

LocalStorage for preferences

🔹 Backend (Supabase)

Supabase Auth

Supabase PostgreSQL Database

Supabase Storage (documents)

Supabase Edge Functions (AI calls / OTP / eligibility)

Environment variables:

SUPABASE_URL = https://yourproject.supabase.co
SUPABASE_ANON_KEY = your-public-key


Client setup:

<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
<script>
  const supabase = supabase.createClient(
    window.env.SUPABASE_URL,
    window.env.SUPABASE_ANON_KEY
  );
</script>

🔹 AI Integration

OCR (Tesseract / Google Vision)

LLM reasoning (Gemini / GPT)

NLP summarization

Chatbot engine

Document fraud detection

Eligibility explanation generation

🗄️ Database Schema (Simplified)
users

id, email, phone, aadhaar_verified

profiles

name, age, state, caste, income, disability

schemes

name, category, state, required_documents

documents

user_id, type, file_url, verified

eligibility_logs

scheme_id, eligible_yes_no, reason

applications

user_id, scheme_id, status

🧭 Eligibility Flow

User logs in

Completes profile

Uploads documents

AI OCR extracts all data

Eligibility rules applied

AI explains YES / NO clearly

User views recommended schemes

Can apply or upload missing documents

Officer/NGO assists if needed

🌍 Impact

Benefits GPS aims to:

Increase scheme awareness

Reduce dropouts

Empower rural citizens

Help migrant families access schemes across states

Reduce inequalities in education & welfare

Support India’s SDG goals

Build the first AI-powered welfare navigation system

🧪 Future Enhancements

Auto-enrollment for 100% eligible cases

School dashboard for bulk management

NGO rural assistant mode

Officer verification portal

Voice assistant for illiterate users

🙌 Credits

Developed for a National-Level Hackathon
Team: Your Team Name
Project: Benefits GPS


What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


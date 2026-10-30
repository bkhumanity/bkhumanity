import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is available
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTION = `You are the friendly AI assistant for "BK Construction - Humanity For Habitat NGO". We work to help rural communities and families across Ghana.

Your Rules:
1. Speak in simple, clear, everyday English that anyone can easily read and understand. Avoid technical jargon or difficult words.
2. What we do in Ghana:
   - Clean Water Boreholes: We drill deep water wells powered by the sun (solar) so villages, schools, and clinics get clean, fresh drinking water from taps every day.
   - Youth Job Training: We train young men and women in building jobs like bricklaying (masonry), plumbing, electrical work, and carpentry, and give them toolboxes so they can earn money.
   - Girls' School Scholarships: We pay school fees and buy books and uniforms for young girls so they can stay in school and succeed.
   - Community Building: We help build and fix health clinics, school classrooms, and safe toilets.
3. Helping people take action:
   - Sponsoring a borehole or donating: Tell them about our simple options (₵350 / $25 helps 1 child with water for life, ₵2,100 / $150 buys a toolkit for an apprentice, or full borehole sponsorship) and give them the link: [Sponsor a Borehole / Donate](#donate).
   - WhatsApp: If someone wants to talk to our team, ask questions, or partner with us, give them our WhatsApp link: [Chat with our team on WhatsApp](https://wa.me/233241234567).
   - Recommending articles: If they want to read more about a topic, invite them to read our simple guides:
     * Clean water: [Read our Clean Water Guide](#blog/clean-water-scarcity-rural-ghana-solutions)
     * Solar water pumps: [Read our Solar Water Pumps Guide](#blog/solar-powered-boreholes-ghana-engineering)
     * Testing water safety: [Read our Water Safety Guide](#blog/water-quality-testing-protocols-rural-ghana)
     * Youth training: [Read our Youth Job Training Guide](#blog/tvet-vocational-skills-training-ghana-construction)
     * Girls' education: [Read our Girls' Education Guide](#blog/girl-child-education-rural-ghana-stem-scholarships)
4. Strict focus:
   - Only answer questions about our organization, our work in Ghana, water boreholes, job training, school scholarships, and donations.
   - If someone asks an unrelated question (like math homework, sports, or politics), politely say: "I am here specifically to help you with our clean water, job training, and school projects in Ghana. How can I help you with our work today?"
   - Keep answers friendly, short, and easy to read with bullet points.`;

// Fallback simple responder
function getFallbackResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('whatsapp') || query.includes('call') || query.includes('phone') || query.includes('talk') || query.includes('contact') || query.includes('reach out')) {
    return `You can chat directly with our team in Ghana on WhatsApp at **+233 24 123 4567** or click below:

👉 **[Chat with our team on WhatsApp](https://wa.me/233241234567)**

You can also send us a message through our **[Contact Page](#contact)** or email us at **ghana@bkhumanity.org**.`;
  }

  if (query.includes('cost') || query.includes('sponsor') || query.includes('donate') || query.includes('price') || query.includes('how much') || query.includes('money')) {
    return `Every gift directly helps a community in Ghana:

* **₵350 ($25):** Gives safe, clean drinking water to 1 child for life.
* **₵2,100 ($150):** Buys a full professional toolkit for a young person learning a building trade.
* **₵10,500 ($750):** Provides a solar water pump for a rural village clinic.
* **Full Village Borehole:** We drill deep underground, install solar panels, a large water storage tank, and community taps so an entire village gets water forever.

👉 **[Sponsor a Borehole / Make a Donation](#donate)**
👉 **[Chat with us on WhatsApp to discuss a village project](https://wa.me/233241234567)**`;
  }

  if (query.includes('solar') || query.includes('hand pump') || query.includes('pump') || query.includes('break')) {
    return `Many old hand pumps in Ghana break down within two years because people have to pump them by hand all day, which wears them out.

**Why we use Solar-Powered Water Systems:**
1. **Easy for everyone:** Solar panels power the pump using the sun. No hard physical pumping by women or children.
2. **Deep and Clean:** We drill deep into the ground (60 to 100 meters) to find pure, fresh water that never runs dry.
3. **Pipes to multiple taps:** Water flows smoothly to taps at schools, clinics, and village centers.

Want to learn more?
👉 **[Read our Solar Water Pumps Guide](#blog/solar-powered-boreholes-ghana-engineering)**`;
  }

  if (query.includes('tvet') || query.includes('job') || query.includes('vocational') || query.includes('training') || query.includes('skill') || query.includes('trade') || query.includes('masonry') || query.includes('carpenter')) {
    return `We train young people in practical building jobs so they can earn a good living and take care of their families:

* **Skills we teach:** Bricklaying (masonry), plumbing, electrical wiring, solar panel installation, and carpentry.
* **Free Toolboxes:** When students graduate, we give them their own professional toolboxes and safety gear so they can start work immediately.
* **Training Young Women:** We actively train young women in plumbing and electrical work to help them earn good incomes.

Want to read more?
👉 **[Read our Youth Job Training Guide](#blog/tvet-vocational-skills-training-ghana-construction)**
👉 **[Volunteer with us](#volunteer)**`;
  }

  if (query.includes('girl') || query.includes('education') || query.includes('scholarship') || query.includes('school')) {
    return `Our **Girls' Education Program** helps young girls stay in school and build bright futures:

1. **Clean Water Near Schools:** When we place a water tap inside or near a school, girls don't have to spend hours carrying heavy water buckets every morning. This helps them arrive on time and learn.
2. **Full School Scholarships:** We pay school fees, buy textbooks, uniforms, and school bags for girls whose families cannot afford them.

Want to read more?
👉 **[Read our Girls' Education Guide](#blog/girl-child-education-rural-ghana-stem-scholarships)**`;
  }

  if (query.includes('quality') || query.includes('test') || query.includes('safe') || query.includes('clean')) {
    return `Before any water tap is opened for a community, our team tests the water in certified laboratories to make sure it is 100% safe to drink.

We test for:
* Clearness and taste (no dirt or bad smell)
* Harmful germs and bacteria
* Safe mineral levels

Want to read more?
👉 **[Read our Water Safety Guide](#blog/water-quality-testing-protocols-rural-ghana)**`;
  }

  return `Welcome to **BK Construction & Humanity For Habitat NGO**! We work in Ghana to:

* 💧 **Provide Clean Water:** Drill solar water boreholes so families have clean water from taps.
* 👷 **Train Youth in Jobs:** Teach building skills like masonry and plumbing so young people can earn a living.
* 🎓 **Support Girls in School:** Give scholarships and books so girls can stay in school.

**How can I help you today?**
* [Sponsor a Clean Water Borehole](#donate)
* [See Our Active Projects](#projects)
* [Chat with our team on WhatsApp](https://wa.me/233241234567)`;
}

// API Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (ai) {
      // Build conversation messages if history was provided
      let contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        contents = history.map((h: { role: string; text: string }) => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }],
        }));
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const replyText = response.text || getFallbackResponse(message);
      return res.json({ reply: replyText });
    } else {
      // Fallback when GEMINI_API_KEY is not configured
      const fallback = getFallbackResponse(message);
      return res.json({ reply: fallback });
    }
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    // Graceful fallback to deterministic response
    const fallback = getFallbackResponse(message);
    return res.json({ reply: fallback });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Humanity For Habitat] Full-stack Server listening on port ${PORT}`);
  });
}

startServer();

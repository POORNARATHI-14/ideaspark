const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Structured idea generator tuned to the project problem statement
app.post('/api/idea', (req, res) => {
  const { name='Founder', skills='', interests='', industry='' } = req.body || {};
  // sanitize small
  const s = (skills || '').trim();
  const i = (interests || '').trim();
  const ind = (industry || '').trim() || 'Business Services';

  const title = `${ind} Ideation Assistant — Personalized Ideas for ${s ? s.split(',')[0].trim() : 'Founders'}`;

  const elevator = `${name}, combine your ${s || 'skills'} with real-time trends to discover validated, market-aligned startup ideas in ${ind}.`;

  const description = `IdeaSpark helps early-stage founders and aspiring entrepreneurs who struggle to find innovative, viable startup ideas. Using user inputs (skills: ${s || 'N/A'}, interests: ${i || 'N/A'}) and trend signals, the platform proposes tailored business concepts, feasibility guidance, and an execution checklist to move from idea to MVP quickly.`;

  const features = [
    {title: "Personalized Ideation", detail: "Generates idea variants based on user skills, interests and market signals."},
    {title: "Trend Analyzer", detail: "Summarizes relevant market trends and recent signals for the suggested idea."},
    {title: "Feasibility Score", detail: "Quick metrics to judge market fit, competition intensity and monetization potential."},
    {title: "Validation Roadmap", detail: "Step-by-step actions founders can take to validate the idea with minimal cost."}
  ];

  const steps = [
    "Validate the problem: interview at least 8–10 potential users in your target segment.",
    "Build a one-page prototype (landing page or clickable mock) and measure interest with 20 signups.",
    "Run a small paid pilot or concierge test to validate willingness to pay.",
    "Iterate product features based on feedback, then prepare a 3-month MVP roadmap."
  ];

  const impact = `Reduces time to find validated startup ideas for first-time founders; improves investor readiness and helps mentors identify practicable projects.`;

  // Estimate a simple feasibility score (mock)
  const score = Math.min(90, 40 + (s ? 10 : 0) + (i ? 10 : 0) + (ind ? 5 : 0));

  res.json({
    title, elevator, description, features, steps, impact, feasibilityScore: score
  });
});

app.get('/health', (req,res)=>res.send('OK'));

app.listen(PORT, ()=>console.log(`IdeaSpark final running at http://localhost:${PORT}`));
